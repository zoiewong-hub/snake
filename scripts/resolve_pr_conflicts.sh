#!/usr/bin/env bash
set -euo pipefail

# Resolve PR conflicts by keeping *ours* for known game files.
# Usage:
#   git merge <target-branch>   # enters conflict state
#   bash scripts/resolve_pr_conflicts.sh

FILES=(
  "README.md"
  "index.html"
  "script.js"
  "styles.css"
)

resolved_count=0

for f in "${FILES[@]}"; do
  if git ls-files -u -- "$f" | grep -q .; then
    echo "[resolve] keep ours: $f"
    git checkout --ours -- "$f"
    git add "$f"
    resolved_count=$((resolved_count + 1))
  else
    echo "[skip] no conflict entry: $f"
  fi
done

if [ "$resolved_count" -eq 0 ]; then
  echo "No known conflicts were staged."
  echo "Tip: run this script after 'git merge <target-branch>' enters conflict state."
  exit 0
fi

echo "Resolved $resolved_count file(s) with --ours and staged them."
echo "Next: git commit -m 'chore: resolve PR conflicts with ours strategy'"
