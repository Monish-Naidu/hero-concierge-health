#!/bin/bash
# Hero Health — Dev Server
# Double-click this file to install dependencies and start the site

cd "$(dirname "$0")"

echo "================================"
echo "  Hero Health Dev Server"
echo "================================"
echo ""

# Check for Node.js
if ! command -v node &>/dev/null; then
  echo "❌ Node.js not found. Install it from https://nodejs.org and try again."
  read -p "Press Enter to close..."
  exit 1
fi

echo "✅ Node.js $(node -v)"

# Install pnpm if needed
if ! command -v pnpm &>/dev/null; then
  echo "📦 Installing pnpm..."
  npm install -g pnpm
fi

echo "✅ pnpm $(pnpm -v)"
echo ""

# Install dependencies if node_modules is missing
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies (first run only, takes ~1 min)..."
  pnpm install
  echo ""
fi

echo "🚀 Starting dev server at http://localhost:3010"
echo "   Press Ctrl+C to stop."
echo ""

open "http://localhost:3010"
pnpm dev
