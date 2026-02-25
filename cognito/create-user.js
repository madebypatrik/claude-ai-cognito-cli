#!/usr/bin/env node

/**
 * Creates a user in AWS Cognito.
 *
 * Usage:
 *   node cognito/create-user.js                                                  (interactive prompts)
 *   node cognito/create-user.js --email user@example.com --password MyPass123!
 *   node cognito/create-user.js --email user@example.com --password MyPass123! --get-token
 *
 * Environment variables (or set defaults below):
 *   AWS_COGNITO_USER_POOL_ID   - e.g. eu-north-1_Oh9F9mTCT
 *   AWS_COGNITO_CLIENT_ID      - App client ID (no secret) from Cognito console
 *   AWS_REGION                 - e.g. eu-north-1
 */

import readline from "readline";
import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";

// ── Config ────────────────────────────────────────────────────────────────────
const REGION       = process.env.AWS_REGION;
const USER_POOL_ID = process.env.AWS_COGNITO_USER_POOL_ID;
const CLIENT_ID    = process.env.AWS_COGNITO_CLIENT_ID ?? ""; // required for --get-token

if (!REGION)       { console.error("✗ AWS_REGION is not set");                process.exit(1); }
if (!USER_POOL_ID) { console.error("✗ AWS_COGNITO_USER_POOL_ID is not set");  process.exit(1); }
// ─────────────────────────────────────────────────────────────────────────────

const client = new CognitoIdentityProviderClient({ region: REGION });

function parseArgs() {
  const args = process.argv.slice(2);
  const result = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--email")     result.email    = args[++i];
    if (args[i] === "--password")  result.password = args[++i];
    if (args[i] === "--get-token") result.getToken = true;
  }
  return result;
}

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (answer) => { rl.close(); resolve(answer); }));
}

function promptPassword(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.output.write(question);
    rl._writeToOutput = () => {};
    rl.question("", (answer) => {
      rl.output.write("\n");
      rl.close();
      resolve(answer);
    });
  });
}

async function promptMissing(args) {
  if (!args.email) {
    args.email = await prompt("Email: ");
  }
  if (!args.password) {
    args.password = await promptPassword("Password: ");
  }
  return args;
}

async function createUser(email, password) {
  console.log(`\nCreating user: ${email}`);

  // Step 1: Admin create user (sends temp password via email by default)
  await client.send(new AdminCreateUserCommand({
    UserPoolId:        USER_POOL_ID,
    Username:          email,
    TemporaryPassword: password,
    MessageAction:     "SUPPRESS", // don't send welcome email
    UserAttributes: [
      { Name: "email",          Value: email },
      { Name: "email_verified", Value: "true" },
    ],
  }));
  console.log("✓ User created");

  // Step 2: Set permanent password immediately (skips FORCE_CHANGE_PASSWORD state)
  await client.send(new AdminSetUserPasswordCommand({
    UserPoolId: USER_POOL_ID,
    Username:   email,
    Password:   password,
    Permanent:  true,
  }));
  console.log("✓ Password set as permanent");
}

async function getToken(email, password) {
  if (!CLIENT_ID) {
    console.error("\n✗ AWS_COGNITO_CLIENT_ID is not set — required for token retrieval.");
    console.error("  Find it in: AWS Console → Cognito → User Pools → your pool → App integration → App clients");
    process.exit(1);
  }

  console.log("\nFetching JWT token...");
  const response = await client.send(new InitiateAuthCommand({
    AuthFlow:       "USER_PASSWORD_AUTH",
    ClientId:       CLIENT_ID,
    AuthParameters: { USERNAME: email, PASSWORD: password },
  }));

  const tokens = response.AuthenticationResult;
  console.log("\n── Tokens ──────────────────────────────────────────────────────");
  console.log(`IdToken (use this in Swagger):\n${tokens.IdToken}`);
  console.log(`\nAccessToken:\n${tokens.AccessToken}`);
  console.log(`\nExpires in: ${tokens.ExpiresIn}s`);
  console.log("────────────────────────────────────────────────────────────────");
  return tokens;
}

async function main() {
  const args = await promptMissing(parseArgs());
  const { email, password, getToken: shouldGetToken } = args;

  try {
    await createUser(email, password);

    if (shouldGetToken) {
      await getToken(email, password);
    } else {
      console.log("\nUser ready. Run with --get-token to also fetch a JWT token.");
    }
  } catch (err) {
    if (err.name === "UsernameExistsException") {
      console.log("⚠ User already exists — skipping creation.");
      if (shouldGetToken) await getToken(email, password);
    } else {
      console.error(`\n✗ Error: ${err.name}: ${err.message}`);
      process.exit(1);
    }
  }
}

main();
