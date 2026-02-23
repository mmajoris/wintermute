#!/bin/bash

echo "==================================="
echo "Wintermute Auth Setup"
echo "==================================="
echo ""

# Generate AUTH_SECRET
AUTH_SECRET=$(openssl rand -base64 32)
echo "Generated AUTH_SECRET"

# Generate BRAIN_API_KEY
BRAIN_API_KEY=$(openssl rand -hex 32)
echo "Generated BRAIN_API_KEY"

echo ""
echo "Enter your admin email (e.g., mike@example.com):"
read -r AUTH_ALLOWED_EMAIL

echo ""
echo "Enter your password:"
read -rs PASSWORD
echo ""

# Generate password hash
AUTH_PASSWORD_HASH=$(node -e "console.log(require('bcryptjs').hashSync('$PASSWORD', 10))")

echo ""
echo "==================================="
echo "Add these to your .env.local:"
echo "==================================="
echo ""
echo "AUTH_SECRET=\"$AUTH_SECRET\""
echo "AUTH_ALLOWED_EMAIL=\"$AUTH_ALLOWED_EMAIL\""
echo "AUTH_PASSWORD_HASH=\"$AUTH_PASSWORD_HASH\""
echo "BRAIN_API_KEY=\"$BRAIN_API_KEY\""
echo ""
echo "==================================="
echo ""
echo "To create .env.local automatically, run:"
echo "  ./scripts/setup-auth.sh > .env.local"
echo ""
