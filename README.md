# LaTeX Compilable Diff (Git Timeline)

Create a LaTeX‑compilable diff `.tex` using `latexdiff` directly from VS Code.
Compile the generated `.tex` to get a PDF that visually highlights all modifications:
- Additions shown in blue
- Deletions shown in red

Use it from the Git Timeline/Source Control or Explorer via right‑click.

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
- Open your LaTeX project in VS Code.
- Find your `.tex` file in Source Control (Changes/History) or in Explorer.
- Right‑click → `Generate LaTeX Diff`.
- Choose the OLD version, then the NEW version:
  - Select `Working Directory (Uncommitted Changes)` to compare against your current edits.
  - Or pick any two commits from the file history.
- The extension creates `diff_<old>_to_<new>_<file>.tex` next to your source and offers to open it.
- Compile the diff `.tex` (e.g., `pdflatex diff_...tex`) to get a PDF with changes highlighted.

## Context menus
- Source Control: appears on items in Changes and History
- Explorer: appears on `.tex` files

## Output
- A self‑contained `.tex` produced by `latexdiff` that compiles like any LaTeX file.
- The resulting PDF shows tracked changes (blue additions, red deletions) for quick review.

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
- No history: Stage/commit the file so history exists, or compare commit ↔ working directory.
- Shell quoting: The extension writes temp files and invokes `latexdiff` on those to avoid quoting issues.

## Notes
- Works with at least one commit; can compare commit↔commit or commit↔working.
- Diff files are created alongside the original `.tex` file.
