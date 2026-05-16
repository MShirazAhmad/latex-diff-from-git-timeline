# Development

## Local Setup

```bash
git clone https://github.com/MShirazAhmad/Track-Changes-in-LaTeX-VSCode.git
cd Track-Changes-in-LaTeX-VSCode
npm install
npm run compile
code .
```

## Package the Extension

```bash
npm run compile
npx vsce package
# Creates: track-changes-in-latex-vscode-1.0.2.vsix
```

## Test Locally in VS Code

1. Open the extension folder in VS Code.
2. Press `F5` to launch the **Extension Development Host**.
3. Open a LaTeX project with a Git history in the new window.
4. Right-click a `.tex` file to test **Track Changes in LaTeX**.

## Code Structure

| File | Purpose |
|---|---|
| `src/extension.ts` | Main command handler |
| `package.json` | VS Code manifest, commands, and menus |
| `tsconfig.json` | TypeScript configuration |

## Useful Commands

Reinstall an updated local build:

```bash
code --uninstall-extension mshirazahmad.track-changes-in-latex-vscode
code --install-extension /path/to/track-changes-in-latex-vscode-1.0.2.vsix
```

Package a new VSIX from the extension folder:

```bash
npm run compile
npx vsce package
```
