# Installation

## Requirements

| Requirement | Details |
|---|---|
| VS Code | 1.85 or later |
| `latexdiff` | On your `PATH` (comes with TeX Live / MacTeX / MiKTeX) |
| TeX distribution | TeX Live 2020+, MacTeX 2020+, or MiKTeX |
| Git | Git-tracked `.tex` files |

## Quick Setup from VS Code Marketplace

If you install extensions directly from VS Code search:

1. Open **Extensions** (`Ctrl+Shift+X` / `Cmd+Shift+X`).
2. Search: `latex-diff-from-git-timeline` (or `LaTeX Compilable Diff`).
3. Open the extension page and click **Install**.

![VS Code Marketplace search result and extension details page showing the Install button.](https://github.com/user-attachments/assets/071fe8ba-0148-441f-94a7-0e1ae3f95d79)

*You can install directly from Marketplace after searching in VS Code.*

## Install from VSIX (Recommended)

1. Download the latest `.vsix` from [GitHub Releases](https://github.com/MShirazAhmad/latex-diff-from-git-timeline/releases/latest).
2. In VS Code, open the **Extensions** panel (`Ctrl+Shift+X` / `Cmd+Shift+X`).
3. Click the **`...`** menu (top-right of the panel) → **Install from VSIX…**
4. Select the downloaded `.vsix` file.

Or from a terminal:

```bash
code --install-extension /path/to/latex-diff-from-timeline-1.0.0.vsix
```

:::{note}
If `code` is not on PATH (macOS), add it first:

```bash
export PATH="/Applications/Visual Studio Code.app/Contents/Resources/app/bin:$PATH"
```
:::

## Install from Source

```bash
git clone https://github.com/MShirazAhmad/latex-diff-from-git-timeline.git
cd latex-diff-from-git-timeline
npm install
npm run compile
npx vsce package
# Creates: latex-diff-from-timeline-1.0.0.vsix
```

Then install the generated VSIX as described above.

## Verify `latexdiff` Is Available

```bash
which latexdiff
latexdiff --version
```

If `latexdiff` is not found, install the appropriate TeX distribution:

- **macOS:** Install [MacTeX](https://www.tug.org/mactex/) and ensure `/Library/TeX/texbin` is in your `PATH`.
- **Linux:** `sudo apt-get install texlive-extra-utils` (Debian/Ubuntu) or `sudo dnf install texlive-latexdiff` (Fedora).
- **Windows (MiKTeX):** Install MiKTeX and run `miktex packages install latexdiff` in the MiKTeX Console.

## Uninstalling

```bash
code --uninstall-extension mshirazahmad.latex-diff-from-timeline
```
