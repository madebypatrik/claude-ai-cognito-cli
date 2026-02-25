---
description: Stage files and create a well-structured git commit. Always shows a review before committing.
argument-hint: [optional commit message or description of changes]
---

Stage and commit the current changes with a clean, descriptive commit message.

## Step 1 — Check what's changed

Run `git status` and `git diff` to understand what has changed. Also run `git log --oneline -5` to match the existing commit message style.

## Step 2 — Determine what to stage

If $ARGUMENTS includes specific file paths, stage only those files.

If no files are specified, look at the changed files and use your judgement:
- Identify all relevant changed files
- Never include `.env`, secrets, or credential files
- Warn the user if any sensitive-looking files appear in the diff

## Step 3 — Draft and show for review

Write a commit message that:
- Has a short subject line (under 70 characters) summarising the change
- Focuses on the "why", not just the "what"
- Uses the same style as recent commits in the log
- Adds a short body if the change needs more context

Show the user:
- The list of files that will be staged
- The full commit message

Then ask: "Does this look right? Reply yes to commit, or tell me what to change."

**Always wait for explicit approval. Never commit without the user confirming.**

## Step 4 — Stage and commit

Only after the user approves:

```bash
git add <files>
git commit -m "$(cat <<'EOF'
<message>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

Show the result and confirm the commit was successful.
