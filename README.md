# LaTeX Diff from Timeline

Generate LaTeX diffs (`latexdiff`) directly from VS Code using right‑click in Source Control or Explorer.

## Requirements
- `latexdiff` available on PATH (TeX Live/MacTeX typically installs to `/Library/TeX/texbin`)
- A Git repo with your `.tex` file tracked

## Install (local VSIX)
```zsh
code --install-extension .vscode/latex-diff-extension/latex-diff-from-timeline-1.0.0.vsix
```
If `code` is not in PATH, add:
```zsh
export PATH="/Applications/Visual Studio Code.app/Contents/Resources/app/bin:$PATH"
```

## Usage
- Open your repo in VS Code.
- Locate a `.tex` file in Source Control (Changes or History) or in Explorer.
- Right‑click the file → `Generate LaTeX Diff`.
- Pick the OLD version, then the NEW version:
  - You can choose `Working Directory (Uncommitted Changes)` to compare against your current edits.
  - Or pick any two commits.
- The extension writes a diff file next to your source: `diff_<old>_to_<new>_<file>.tex` and offers to open it.

## Context menus
- Source Control: appears on items in Changes and History
- Explorer: appears on `.tex` files

## Output
- A self‑contained `.tex` produced by `latexdiff` with additions/deletions highlighted.
- Compile it as usual to get a PDF showing tracked changes.

## Quick Commands
- Reinstall updated build:
```zsh
code --uninstall-extension MShirazAhmad.latex-diff-from-timeline
code --install-extension .vscode/latex-diff-extension/latex-diff-from-timeline-1.0.0.vsix
```
- Package VSIX (from extension folder):
```zsh
npm run compile
vsce package
```

## Troubleshooting
- Command not visible: Reload window (`Cmd+R`) and ensure you right‑click a `.tex` item.
- `latexdiff` not found: Verify with `which latexdiff`. On macOS, ensure `/Library/TeX/texbin` is in PATH.
- File not in Git: Stage/commit the file so history exists.
- Unicode/shell issues: The extension writes temp files and calls `latexdiff` on those to avoid shell quoting bugs.

## Notes
- Works with at least one commit; can compare commit↔commit or commit↔working.
- Diff files are created alongside the original `.tex` file.
