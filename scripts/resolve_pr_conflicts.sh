#!/usr/bin/env bash
set -euo pipefail

# Resolve PR conflicts for the game prototype by keeping this branch's
# intended game implementation for the known conflicted files.

FILES=(
  "README.md"
  "index.html"
  "script.js"
  "styles.css"
)

for f in "${FILES[@]}"; do
  if git ls-files -u -- "$f" | grep -q .; then
    echo "[resolve] keep feature version: $f"
    git checkout --ours -- "$f"
    git add "$f"
  else
    echo "[skip] no conflict entry: $f"
  fi
done

if git diff --cached --quiet; then
  echo "No conflicted files were staged."
  echo "Tip: run this script after 'git merge <target-branch>' enters conflict state."
  exit 0
fi

echo "Conflicts resolved and staged."
echo "Next: git commit -m 'chore: resolve PR conflicts for puzzle game files'"
