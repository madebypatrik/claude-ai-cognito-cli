# Claude Agent Permissions

This file defines what AWS actions Claude is allowed to run in this project. When new services are added, this file must be updated to reflect the new permissions.

## Allowed AWS Actions

| Action | Service | Script | Description |
|---|---|---|---|
| `cognito-idp:AdminCreateUser` | Cognito | `cognito/create-user.js` | Create a new Cognito user |
| `cognito-idp:AdminSetUserPassword` | Cognito | `cognito/create-user.js` | Set user password as permanent |
| `cognito-idp:InitiateAuth` | Cognito | `cognito/create-user.js`, `cognito/login.js` | Authenticate a user and retrieve JWT tokens |

## Rules

- Claude must not run any AWS API calls outside the list above
- When a new AWS service or script is added to this project, its required actions must be added to the table above before Claude can run them
- All credentials must come from environment variables — never hardcoded
- New scripts must follow the same pattern as existing ones: env var validation at startup, interactive prompts for missing args, clear error messages
