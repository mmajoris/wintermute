#!/usr/bin/env node

const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/hash-password.js <password>");
  console.error("");
  console.error("Example:");
  console.error("  node scripts/hash-password.js mysecretpassword");
  console.error("");
  console.error("Then add the output to your .env.local:");
  console.error('  AUTH_PASSWORD_HASH="$2b$10$..."');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log("");
console.log("Password hash generated successfully!");
console.log("");
console.log("Add this to your .env.local:");
console.log(`AUTH_PASSWORD_HASH="${hash}"`);
console.log("");
