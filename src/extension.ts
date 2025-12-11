import * as vscode from 'vscode';
import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'latexDiff.generateFromTimeline',
    async (resource?: vscode.Uri) => {
      if (!resource) {
        vscode.window.showErrorMessage('No file selected');
        return;
      }

      const filePath = resource.fsPath;
      const fileName = path.basename(filePath);

      // Only process .tex files
      if (!fileName.endsWith('.tex')) {
        vscode.window.showErrorMessage('Only .tex files are supported');
        return;
      }

      try {
        // Get the git repository root
        const repoRoot = execSync('git rev-parse --show-toplevel', {
          cwd: path.dirname(filePath),
          encoding: 'utf-8'
        }).trim();

        // Get the relative file path from repo root
        const relativeFilePath = path.relative(repoRoot, filePath);

        // Get list of commits for this file
        const commits = execSync(`git log --pretty=format:%H --follow -- "${relativeFilePath}"`, {
          cwd: repoRoot,
          encoding: 'utf-8'
        }).split('\n').filter(c => c);

        if (commits.length < 1) {
          vscode.window.showErrorMessage('No commits found for this file');
          return;
        }

        // Show quick pick to select commits
        const commitLabels = await Promise.all(
          commits.slice(0, 10).map(async (commit) => {
            const message = execSync(`git log -1 --pretty=format:%s ${commit}`, {
              cwd: repoRoot,
              encoding: 'utf-8'
            });
            const date = execSync(`git log -1 --pretty=format:%ai ${commit}`, {
              cwd: repoRoot,
              encoding: 'utf-8'
            });
            return {
              label: `${commit.slice(0, 7)} - ${message}`,
              description: date,
              commit: commit
            };
          })
        );

        // Add option to compare with working directory
        const compareOptions = [
          { label: '$(file-text) Working Directory (Uncommitted Changes)', description: 'Compare with current file', commit: 'WORKING' },
          ...commitLabels
        ];

        const oldCommit = await vscode.window.showQuickPick(
          compareOptions,
          { placeHolder: 'Select OLD commit (earlier version)' }
        );

        if (!oldCommit) return;

        const newCommit = await vscode.window.showQuickPick(
          compareOptions,
          { placeHolder: 'Select NEW commit (later version)' }
        );

        if (!newCommit) return;

        // Generate latexdiff
        vscode.window.showInformationMessage('Generating LaTeX diff...');

        const outputDir = path.dirname(filePath);
        const oldLabel = oldCommit.commit === 'WORKING' ? 'working' : oldCommit.commit.slice(0, 7);
        const newLabel = newCommit.commit === 'WORKING' ? 'working' : newCommit.commit.slice(0, 7);
        const outputFile = path.join(
          outputDir,
          `diff_${oldLabel}_to_${newLabel}_${fileName}`
        );

        // Read old content
        let oldContent: string;
        if (oldCommit.commit === 'WORKING') {
          oldContent = fs.readFileSync(filePath, 'utf-8');
        } else {
          oldContent = execSync(`git show ${oldCommit.commit}:"${relativeFilePath}"`, {
            cwd: repoRoot,
            encoding: 'utf-8'
          });
        }

        // Read new content
        let newContent: string;
        if (newCommit.commit === 'WORKING') {
          newContent = fs.readFileSync(filePath, 'utf-8');
        } else {
          newContent = execSync(`git show ${newCommit.commit}:"${relativeFilePath}"`, {
            cwd: repoRoot,
            encoding: 'utf-8'
          });
        }

        // Use latexdiff via shell to compare the two versions
        const tempDir = require('os').tmpdir();
        const oldFile = path.join(tempDir, `old_${oldLabel}.tex`);
        const newFile = path.join(tempDir, `new_${newLabel}.tex`);

        fs.writeFileSync(oldFile, oldContent);
        fs.writeFileSync(newFile, newContent);

        const diffOutput = execSync(`latexdiff "${oldFile}" "${newFile}"`, {
          encoding: 'utf-8'
        });

        fs.writeFileSync(outputFile, diffOutput);
        fs.unlinkSync(oldFile);
        fs.unlinkSync(newFile);

        vscode.window.showInformationMessage(
          `LaTeX diff created: ${path.basename(outputFile)}`,
          'Open'
        ).then(choice => {
          if (choice === 'Open') {
            vscode.commands.executeCommand('vscode.open', vscode.Uri.file(outputFile));
          }
        });
      } catch (error) {
        vscode.window.showErrorMessage(`Error generating diff: ${error}`);
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
