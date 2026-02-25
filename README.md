# claude-ai-cognito-cli

[![AWS](https://img.shields.io/badge/AWS-Cognito-orange.svg)](https://aws.amazon.com/cognito/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-blueviolet.svg)](https://claude.ai/claude-code)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

> **AWS Cognito user management from your terminal — built with Claude Code.**

## 💡 What This Does

Stop clicking through the AWS console. This is a small set of Node.js scripts for creating and authenticating AWS Cognito users from your terminal — built to be extended with AI.

- 👤 **Create users** — Create a Cognito user with a permanent password in seconds
- 🔑 **Login & get tokens** — Authenticate and retrieve JWT tokens ready to paste into Swagger or Postman
- 🤖 **AI-first** — Built with Claude Code, designed to be extended by it
- 🚫 **No secrets in code** — Everything runs off environment variables

## 🤖 Recommended: Use Claude Code

The easiest way to use and extend this project is with **[Claude Code](https://claude.ai/claude-code)** — an AI assistant that runs in your terminal.

Instead of writing scripts manually, just tell Claude what you want:

> *"Create a new Cognito user with email test@example.com"*

> *"Log in as test@example.com and give me a JWT token"*

> *"Add a script to delete a Cognito user"*

> *"Add support for AWS S3 — I want to be able to upload a file from the terminal"*

Claude reads the existing code, follows the patterns already in place, and writes or runs the right scripts for you.

## ⚡ Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/madebypatrik/claude-ai-cognito-cli.git
cd claude-ai-cognito-cli
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Then fill in your values in `.env`:

```env
AWS_REGION=eu-north-1
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_COGNITO_USER_POOL_ID=eu-north-1_xxxxxxxxx
AWS_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
```

Find your Cognito values in: **AWS Console → Cognito → User Pools → your pool → App integration → App clients**

### 3. Configure AWS credentials

Either fill in `.env` as above, or use the AWS CLI:

```bash
aws configure
```

## 🚀 Usage

### Create a user

```bash
node cognito/create-user.js --email user@example.com --password MyPass123!
```

Create a user and immediately get a JWT token:

```bash
node cognito/create-user.js --email user@example.com --password MyPass123! --get-token
```

### Login & get a token for an existing user

```bash
node cognito/login.js --email user@example.com --password MyPass123! --get-token
```

### Or use npm scripts

```bash
npm run create-user -- --email user@example.com --password MyPass123! --get-token
npm run login -- --email user@example.com --password MyPass123! --get-token
```

### Interactive mode

Run without arguments to be prompted:

```bash
node cognito/create-user.js
node cognito/login.js
```

## 🛠️ Claude Code Skills

This project ships with built-in **Claude Code skills** — shortcuts you can trigger directly in Claude Code to handle common tasks without typing a single command yourself.

### Git skills

| Skill | What it does |
|---|---|
| `/git-branch` | Creates a new branch with the right naming format (`feature/`, `fix/`, `chore/`) |
| `/git-commit` | Stages files, drafts a commit message, and waits for your review before committing |
| `/git-push` | Pushes the current branch to remote, handles new branches automatically |
| `/git-ship` | Full flow: commit → push → open PR against `develop`, step by step |
| `/git-pr` | Drafts and creates a PR against `develop`, prints the URL and reminds you to review before merging |

All git skills **always show a review step** before executing — nothing is committed, pushed, or merged without your explicit approval.

### AWS skills

| Skill | What it does |
|---|---|
| `/add-aws-feature` | Guided flow to add a new AWS service integration — creates the script, updates `package.json`, adds IAM permissions to `CLAUDE.md`, writes non-technical docs, and asks security questions before finishing |

### Add a new AWS service

Open Claude Code in this project and run:

```
/add-aws-feature
```

Or just tell Claude what you want:

> *"Add a new script to send an email via AWS SES"*

> *"Add support for AWS SSM — I want to read a parameter from Parameter Store"*

> *"Add a script to list all users in my Cognito user pool"*

Claude will read the existing scripts, match the same patterns and style, create the new file, add it to `package.json`, update the permissions in `CLAUDE.md`, and write plain-English docs for it.

## 📋 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `AWS_REGION` | Yes | AWS region, e.g. `eu-north-1` |
| `AWS_ACCESS_KEY_ID` | Yes | IAM access key |
| `AWS_SECRET_ACCESS_KEY` | Yes | IAM secret key |
| `AWS_COGNITO_USER_POOL_ID` | Yes | Cognito User Pool ID |
| `AWS_COGNITO_CLIENT_ID` | For `--get-token` | App client ID (no secret required) |

## 🔐 Required IAM Permissions

The IAM user running these scripts only needs the following. If you add new services via Claude, it will update this list automatically.

| Action | Used by |
|---|---|
| `cognito-idp:AdminCreateUser` | `cognito/create-user.js` |
| `cognito-idp:AdminSetUserPassword` | `cognito/create-user.js` |
| `cognito-idp:InitiateAuth` | `cognito/create-user.js`, `cognito/login.js` |

## 🤝 Contributing

Got improvements or want to add support for more AWS services? Contributions welcome!

1. Fork the repository
2. Create your feature branch
3. Submit a pull request

---

*Built by [@madebypatrik](https://github.com/madebypatrik) · Built with [Claude Code](https://claude.ai/claude-code)*
