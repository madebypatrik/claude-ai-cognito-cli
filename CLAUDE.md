# Claude Permissions

## Allowed AWS Cognito Actions

Claude is only permitted to run the following AWS Cognito operations in this project:

| Action | Script | Description |
|---|---|---|
| `AdminCreateUser` | `cognito/create-user.js` | Create a new Cognito user |
| `AdminSetUserPassword` | `cognito/create-user.js` | Set user password as permanent |
| `InitiateAuth` | `cognito/create-user.js`, `cognito/login.js` | Authenticate a user and retrieve JWT tokens |

## Denied Actions

All other AWS actions are denied. Claude must not run, add, or invoke any AWS API calls outside the list above — including but not limited to deleting users, listing users, updating user attributes, managing user pools, or any non-Cognito AWS services.
