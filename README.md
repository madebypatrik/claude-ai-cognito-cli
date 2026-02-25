# AWS Cognito Dev Tools

[![AWS](https://img.shields.io/badge/AWS-Cognito-orange.svg)](https://aws.amazon.com/cognito/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

> **Create and authenticate AWS Cognito users from the command line — instantly**

## 💡 What This Does

A small set of Node.js scripts for managing AWS Cognito users during development and testing. No console clicking required.

- 👤 **Create users** — Instantly create a Cognito user with a permanent password
- 🔑 **Login & get tokens** — Authenticate and retrieve JWT tokens ready to paste into Swagger or Postman
- 🚫 **No secrets in code** — Everything runs off environment variables

## ⚡ Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/your-org/invtd-aws-devops.git
cd invtd-aws-devops
npm install
```

### 2. Set up environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Then edit `.env`:

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

## 📋 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `AWS_REGION` | Yes | AWS region, e.g. `eu-north-1` |
| `AWS_ACCESS_KEY_ID` | Yes | IAM access key |
| `AWS_SECRET_ACCESS_KEY` | Yes | IAM secret key |
| `AWS_COGNITO_USER_POOL_ID` | Yes | Cognito User Pool ID |
| `AWS_COGNITO_CLIENT_ID` | For `--get-token` | App client ID (no secret required) |

## 🔐 Required IAM Permissions

The IAM user running these scripts only needs:

```
cognito-idp:AdminCreateUser
cognito-idp:AdminSetUserPassword
cognito-idp:InitiateAuth
```

---

*Built with [Claude Code](https://claude.ai/claude-code)*
