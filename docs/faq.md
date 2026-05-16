# FAQ

## General

### Why is the diff file empty?

The two versions you selected are identical. Verify you selected different commits or that your working directory has actual changes.

### Can I compare files across branches?

The extension currently compares commits visible in the current branch's history. To compare across branches, check out the target branch first, or use the Git command line:

```bash
latexdiff <(git show branch1:file.tex) <(git show branch2:file.tex) > diff.tex
```

### Does it work with binary files or special formats?

No. `latexdiff` only works with plain-text `.tex` files. It does not support `.lyx`, `.odt`, or binary formats.

### Can I see a preview without compiling?

No; you must compile to PDF. VS Code's [LaTeX Workshop](https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop) extension can auto-preview on save if installed.

---

## Diff Output

### How do I ignore certain sections from the diff?

Edit the generated `.tex` manually, or use `latexdiff` command-line options (the extension uses basic defaults). See the [latexdiff documentation on CTAN](https://ctan.org/pkg/latexdiff).

### The diff marks too many (or too few) changes. Why?

`latexdiff` uses heuristics based on word-level or sentence-level comparison. For fine-grained control, generate the diff manually:

```bash
git show OLD_SHA:file.tex > /tmp/old.tex
git show NEW_SHA:file.tex > /tmp/new.tex
latexdiff --type=UNDERLINE /tmp/old.tex /tmp/new.tex > diff.tex
```

### Can I change the color scheme?

Yes. Open the generated diff `.tex` and find `\definecolor` or `\textcolor` commands. Adjust the RGB values or color names, then recompile.

---

## Setup & Requirements

### What if `latexdiff` is not found?

Ensure TeX Live or MacTeX is installed and `/Library/TeX/texbin` is in your `PATH`. Test with:

```bash
which latexdiff
latexdiff --version
```

On macOS, add to your shell profile:

```bash
export PATH="/Library/TeX/texbin:$PATH"
```

### The command "Track Changes in LaTeX" is not visible in the context menu.

- Reload the VS Code window (`Cmd+R` / `Ctrl+R`).
- Confirm you are right-clicking a `.tex` file (not a folder or non-TeX file).
- Check the Extensions panel to confirm the extension is enabled.

### No commits appear in the history list.

The file must have at least one commit. Stage and commit the file (`git add`, `git commit`) so a history exists. You can also compare a commit against the working directory once a single commit exists.

### Shell quoting errors on Windows.

The extension writes content to temporary files and invokes `latexdiff` on those files, which avoids most shell quoting issues. If problems persist, ensure your PATH does not contain spaces and that TeX Live's `bin/win32` (or `bin/windows`) directory is in your PATH.
