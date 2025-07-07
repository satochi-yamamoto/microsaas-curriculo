#!/usr/bin/env bash
# Initialize Supabase tables using the schema.sql file

set -e

if ! command -v supabase >/dev/null 2>&1; then
  echo "Supabase CLI not found. Please install it: https://supabase.com/docs/guides/cli" >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

supabase db push "$ROOT_DIR/supabase/schema.sql"
