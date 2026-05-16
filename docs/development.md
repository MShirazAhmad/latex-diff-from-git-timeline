# Development

## Local Setup

```bash
git clone https://github.com/MShirazAhmad/latex-diff-from-git-timeline.git
cd latex-diff-from-git-timeline
npm install
npm run compile
code .
```

## Package the Extension

```bash
npm run compile
npx vsce package
# Creates: latex-diff-from-timeline-1.0.0.vsix
```

## Test Locally in VS Code

1. Open the extension folder in VS Code.
2. Press `F5` to launch the **Extension Development Host**.
3. Open a LaTeX project with a Git history in the new window.
4. Right-click a `.tex` file to test **Generate LaTeX Diff**.

## Code Structure

| File | Purpose |
|---|---|
| `src/extension.ts` | Main command handler |
| `package.json` | VS Code manifest, commands, and menus |
| `tsconfig.json` | TypeScript configuration |

## Useful Commands

Reinstall an updated local build:

```bash
code --uninstall-extension mshirazahmad.latex-diff-from-timeline
code --install-extension /path/to/latex-diff-from-timeline-1.0.0.vsix
```

Package a new VSIX from the extension folder:

```bash
npm run compile
npx vsce package
```
