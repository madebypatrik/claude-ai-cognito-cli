---
description: Create and switch to a new git branch. Use when the user wants to start work on a new feature, bug fix, or chore.
argument-hint: [branch name or description of what you're working on]
---

Create a new git branch and switch to it.

## Step 1 — Determine the branch name

If $ARGUMENTS is provided, use it to derive the branch name.

If no argument is given, ask: "What are you working on? I'll create a branch for it."

Format the branch name:
- Use lowercase and hyphens only (no spaces or special characters)
- Prefix with the type of work: `feature/`, `fix/`, `chore/`
- Keep it short and descriptive, e.g. `feature/add-s3-upload`, `fix/login-token-expiry`

Show the proposed branch name and ask: "Does `<branch-name>` look right?"

Wait for confirmation before creating it.

## Step 2 — Check current state

Run `git status` to make sure there are no uncommitted changes that might cause issues. If there are, warn the user and ask if they want to stash them first.

## Step 3 — Create and switch to the branch

```bash
git checkout -b <branch-name>
```

Confirm the branch was created and the user is now on it.
