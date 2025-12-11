# LaTeX Compilable Diff from Git Timeline (VS Code Extension)

Create a LaTeX‑compilable diff `.tex` using `latexdiff` directly from VS Code. This is a VS Code extension that runs from Git Timeline/Source Control or Explorer.
Compile the generated `.tex` to get a PDF that visually highlights all modifications:
- Additions shown in blue
- Deletions shown in red

Use it from the Git Timeline/Source Control or Explorer via right‑click.

## Quick Start

1. Open your LaTeX project in VS Code
2. Right‑click a `.tex` file in **Source Control** (Changes/History) or **Explorer**
3. Select **"Generate LaTeX Diff"**
4. Choose OLD and NEW versions (can be commits or working directory)
5. A `diff_<old>_to_<new>_<file>.tex` is created
6. Compile it: `pdflatex diff_...tex` → open the PDF to see changes highlighted

## Detailed Workflows

### Workflow 1: Compare Two Commits
Compare edits between any two historical versions.
- Right‑click `.tex` file in Source Control (History tab)
- Select "Generate LaTeX Diff"
- Pick the older commit as OLD
- Pick the newer commit as NEW
- Compile the resulting diff `.tex` to review changes in PDF

### Workflow 2: Review Uncommitted Changes
See what you've changed locally before staging or committing.
- Make edits to your `.tex` file
- Right‑click the file in Source Control (Changes tab)
- Select "Generate LaTeX Diff"
- Pick a commit (e.g., HEAD) as OLD
- Pick **"Working Directory (Uncommitted Changes)"** as NEW
- Compile to review your pending edits in PDF

### Workflow 3: Code Review Preparation
Create a diff to share with collaborators.
- After committing, run the extension
- Select HEAD~1 (previous commit) as OLD
- Select HEAD (your commit) as NEW
- Share the generated `diff_....tex` and compiled PDF

## Usage
- Open your LaTeX project in VS Code.
- Find your `.tex` file in Source Control (Changes/History) or in Explorer.
- Right‑click → `Generate LaTeX Diff`.
- Choose the OLD version, then the NEW version:
  - Select `Working Directory (Uncommitted Changes)` to compare against your current edits.
  - Or pick any two commits from the file history.
- The extension creates `diff_<old>_to_<new>_<file>.tex` next to your source and offers to open it.
- Compile the diff `.tex` to get a PDF with changes highlighted (see Compilation Guide below).

## Output
- A self‑contained `.tex` produced by `latexdiff` that compiles like any LaTeX file.
- The resulting PDF shows tracked changes (blue additions, red deletions) for quick review.

### What's in the Diff File?
The generated `.tex` contains:
- Original content with deletions marked: `\textcolor{red}{\sout{deleted text}}`
- New content with additions marked: `\textcolor{blue}{added text}`
- All preamble, packages, and macros from the original files
- Compilable as‑is; no additional dependencies needed beyond TeX Live/MacTeX

### Customizing Diff Appearance
To change colors (e.g., red → orange for deletions):
- Open the generated diff `.tex`
- Find `\definecolor` or `\textcolor` commands
- Adjust the RGB values or color names
- Recompile

## Compilation Guide

### Using `pdflatex` (most common)
```zsh
cd /path/to/your/project
pdflatex diff_old_to_new_file.tex
open diff_old_to_new_file.pdf
```

### Using `xelatex` (Unicode support)
```zsh
xelatex diff_old_to_new_file.tex
```

### Using `lualatex` (modern alternative)
```zsh
lualatex diff_old_to_new_file.tex
```

### Resolving Compilation Errors
- **Missing packages**: The diff inherits packages from your original `.tex`. Install missing packages via `tlmgr` or your TeX distribution.
- **Encoding issues**: Try `xelatex` or add `\usepackage[utf8]{inputenc}` to the preamble.
- **Large files**: For very long diffs, increase TeX memory: `pdflatex -interaction=nonstopmode diff_....tex`

## Context Menus
- Source Control: appears on items in Changes and History
- Explorer: appears on `.tex` files

## Dependencies & Requirements
- **Extension**: Zero npm runtime dependencies; uses only Node.js builtins and VS Code API
- **System**: `latexdiff` command (comes with TeX Live/MacTeX)
- **TeX**: Any recent TeX distribution (TeX Live 2020+, MacTeX 2020+, MiKTeX)

## FAQ

### Q: Why is the diff file empty?
**A:** The two versions are identical. Verify you selected different commits or that your working directory has actual changes.

### Q: Can I compare files across branches?
**A:** The extension currently compares commits in the current branch. To compare across branches, check out the branch first or use Git command line: `latexdiff <(git show branch1:file.tex) <(git show branch2:file.tex) > diff.tex`

### Q: Does it work with binary files or special formats?
**A:** No; `latexdiff` only works with plain text `.tex` files. It does not support `.lyx`, `.odt`, or binary formats.

### Q: How do I ignore certain sections from the diff?
**A:** Edit the generated `.tex` manually, or use `latexdiff` command‑line options (the extension uses basic defaults). See [latexdiff documentation](https://ctan.org/pkg/latexdiff).

### Q: Can I see a preview without compiling?
**A:** No; you must compile to PDF. VS Code's LaTeX Workshop extension (if installed) can auto‑preview. Otherwise, compile manually and open the PDF.

### Q: What if `latexdiff` is not found?
**A:** Ensure TeX Live or MacTeX is installed and `/Library/TeX/texbin` is in your PATH. Test with:
```zsh
which latexdiff
latexdiff --version
```

## Development & Contributing

### Local Setup
```zsh
git clone https://github.com/MShirazAhmad/latex-diff-from-git-timeline.git
cd latex-diff-from-git-timeline
npm install
npm run compile
code .
```

### Test Locally
1. Open the extension folder in VS Code
2. Press `F5` to launch Extension Development Host
3. Open a LaTeX project with Git history
4. Test right‑click on a `.tex` file

### Build & Package
```zsh
npm run compile
npx vsce package
# Creates: latex-diff-from-timeline-1.0.0.vsix
```

### Code Structure
- `src/extension.ts` — main command handler
- `package.json` — VS Code manifest and metadata
- `tsconfig.json` — TypeScript config

### Extending
To add features (e.g., custom diff options, inline previews):
1. Edit `src/extension.ts`
2. Update `package.json` commands/menus if needed
3. Run `npm run compile`
4. Test with F5 launch
5. Commit and push

## Quick Commands
- Reinstall updated build:
```zsh
code --uninstall-extension mshirazahmad.latex-diff-from-timeline
code --install-extension /path/to/latex-diff-from-timeline-1.0.0.vsix
```
- Package VSIX (from extension folder):
```zsh
npm run compile
npx vsce package
```

## Troubleshooting
- Command not visible: Reload window (`Cmd+R`) and ensure you right‑click a `.tex` item.
- `latexdiff` not found: Verify with `which latexdiff`. On macOS, ensure `/Library/TeX/texbin` is in PATH.
- No history: Stage/commit the file so history exists, or compare commit ↔ working directory.
- Shell quoting: The extension writes temp files and invokes `latexdiff` on those to avoid quoting issues.

## Notes
- Works with at least one commit; can compare commit↔commit or commit↔working.
- Diff files are created alongside the original `.tex` file.

## License
MIT — see [LICENSE](LICENSE) for details.

## Feedback & Issues
Found a bug or have a feature request? Open an issue on [GitHub](https://github.com/MShirazAhmad/latex-diff-from-git-timeline/issues).
