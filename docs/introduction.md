# Introduction

**LaTeX Diff from Git Timeline** is a VS Code extension that lets you visualize how your LaTeX documents evolve by building diffs straight from the git commit history.

This extension makes it easy to track LaTeX edits across commits without ever leaving VS Code. It generates diffs using `latexdiff` and your repository history, making it straightforward to review edits before merging or sharing PDFs.

## What It Does

- Shows a commit-by-commit view of your LaTeX files so you can track changes visually.
- Generates diffs using your repository history, making it easy to review edits before merging or sharing PDFs.
- Runs directly inside VS Code — no separate scripts or manual commands needed once configured.

## Why It Was Built

Keeping track of LaTeX edits across branches can be tedious. This extension keeps everything inside VS Code, so you can stay focused on writing while still having a clear audit trail of how a document changes over time.

## Key Features

- Right-click command in **Git Timeline / Source Control** and **Explorer** for `.tex` files
- Compare commit ↔ commit or commit ↔ working directory
- Generates a self-contained `diff_<old>_to_<new>_<file>.tex` ready to compile
- Zero runtime npm dependencies; uses VS Code API and `latexdiff`

## Use Cases

- **Send to collaborators or advisors:** Compile the generated diff file to PDF and share it so reviewers can see all edits in color. The PDF is fully standalone for quick comment rounds.
- **Submit to publishers with change markup:** When responding to reviewer comments, generate a diff between the last published commit and your revised draft. The resulting PDF clearly marks insertions/deletions, so you can upload it as the "tracked changes" version many journals request.
- **Pre-merge validation:** Before merging a branch, create a diff versus `main` to verify all manuscript edits are intentional. This also produces a ready-to-circulate tracked-changes PDF for sign-off.
- **Advisory revisions with context:** Pair the diff PDF with your advisor's comment IDs by generating diffs on specific branches (e.g., `advisor-notes` → `revision-v2`). Each colored change maps directly to a comment, speeding up approval.
- **Camera-ready confidence:** Before final submission, regenerate the diff against the camera-ready branch to ensure no late-stage formatting tweaks slipped in unnoticed.

## Source & License

- **Repository:** [github.com/MShirazAhmad/latex-diff-from-git-timeline](https://github.com/MShirazAhmad/latex-diff-from-git-timeline)
- **License:** MIT
