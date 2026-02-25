---
description: Push the current branch to remote. Handles new branches with no upstream automatically.
---

Push the current branch to the remote.

## Step 1 — Check the current branch

Run `git status` to confirm there are no uncommitted changes. If there are, warn the user and suggest running the `git-commit` skill first.

## Step 2 — Push

Check if the current branch already has an upstream:

```bash
git rev-parse --abbrev-ref --symbolic-full-name @{u}
```

If it has an upstream, push normally:

```bash
git push
```

If no upstream exists, push and set it:

```bash
git push -u origin <current-branch>
```

Show the result and confirm the push was successful.
