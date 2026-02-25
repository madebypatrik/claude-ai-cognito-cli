---
description: Stage, commit, push, and open a PR against develop — in one guided flow using the git-commit and git-pr skills.
argument-hint: [optional commit message or description of changes]
---

Ship the current changes end-to-end: commit, push, and open a PR against `develop`. This skill orchestrates the other git skills in order rather than duplicating their logic.

## Step 1 — Commit

Run the `git-commit` skill in full.

Follow every step defined in that skill:
- Check what's changed
- Determine what to stage
- Draft the commit message and show it for review
- Wait for explicit user approval before committing

Do not proceed to the next step until the commit is confirmed and complete.

## Step 2 — Push

Run the `git-push` skill in full.

Follow every step defined in that skill:
- Check for uncommitted changes
- Detect whether the branch has an upstream
- Push accordingly

Do not proceed to the next step until the push is confirmed successful.

## Step 3 — Open a PR

Run the `git-pr` skill in full.

Follow every step defined in that skill:
- Diff against `develop`
- Draft the PR title and body
- Show it for review
- Wait for explicit user approval before creating the PR
- Target `develop` as the base branch

Return the PR URL to the user when done.
