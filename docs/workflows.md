# Workflows

## Workflow 1: Compare Two Commits

Compare edits between any two historical versions of your LaTeX file.

1. Right-click the `.tex` file in **Source Control → History** (Timeline).
2. Select **Track Changes in LaTeX**.
3. Pick the **older commit** as OLD.
4. Pick the **newer commit** as NEW.
5. Compile the resulting diff `.tex` to review changes in PDF.

**Typical use:** Reviewing what changed between two submission drafts before sending to a co-author.

---

## Workflow 2: Review Uncommitted Changes

See what you've changed locally before staging or committing.

1. Make edits to your `.tex` file.
2. Right-click the file in **Source Control → Changes**.
3. Select **Track Changes in LaTeX**.
4. Pick a commit (e.g., `HEAD`) as OLD.
5. Pick **"Working Directory (Uncommitted Changes)"** as NEW.
6. Compile to review your pending edits in PDF.

**Typical use:** Checking your own edits before a commit.

---

## Workflow 3: Code Review Preparation

Create a diff to share with collaborators.

1. After committing, run the extension.
2. Select `HEAD~1` (previous commit) as OLD.
3. Select `HEAD` (your commit) as NEW.
4. Share the generated `diff_....tex` and compiled PDF.

**Typical use:** Circulating a "tracked changes" PDF to co-authors for sign-off.

---

## Workflow 4: Respond to Journal Reviewer Comments

Generate a diff between the last published commit and your revised draft.

1. Tag the last submitted version: `git tag v1-submitted`.
2. Apply revisions on a new branch or in `main`.
3. Run the extension; pick `v1-submitted` as OLD and `HEAD` as NEW.
4. Compile the diff PDF — it shows all insertions and deletions.
5. Upload the compiled PDF as the "tracked changes" version the journal requests.

**Typical use:** Submitting a revision to a peer-reviewed journal that requires a marked-up manuscript.

---

## Workflow 5: Pre-Merge Validation

Before merging a branch, create a diff versus `main` to verify all manuscript edits are intentional.

1. Checkout your feature/revision branch.
2. Run the extension on the `.tex` file.
3. Select the tip of `main` as OLD, your branch HEAD as NEW.
4. Review the compiled PDF — confirm every change is expected.
5. Merge with confidence, and share the diff PDF for final sign-off.

---

## Workflow 6: Advisory Revisions with Context

Pair the diff PDF with your advisor's comment IDs.

1. Create a branch per revision round (e.g., `advisor-notes`, `revision-v2`).
2. Generate diffs between branches: pick the `advisor-notes` commit as OLD, your `revision-v2` HEAD as NEW.
3. Each colored change maps directly to a comment, speeding up approval.

---

## Workflow 7: Camera-Ready Final Check

Before final submission, regenerate the diff against the camera-ready branch to ensure no late-stage formatting tweaks slipped in unnoticed.

1. Tag the camera-ready state: `git tag camera-ready`.
2. Apply any last corrections.
3. Diff `camera-ready` → `HEAD` to confirm only intentional changes are present.
