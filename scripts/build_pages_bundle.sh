#!/usr/bin/env bash
set -euo pipefail

# Build a GitHub Pages-friendly docs bundle from repository root static files.
# Useful when repository Pages source is configured to /docs.

mkdir -p docs
cp -f index.html styles.css script.js README.md docs/
touch docs/.nojekyll

echo "Generated docs bundle: docs/index.html docs/styles.css docs/script.js docs/README.md docs/.nojekyll"
