# Release check
Run before every deploy:

    npm run build
    npx vite preview --port 4173 &
    node tests/persistence.test.mjs

Checks that servings (2-14) survive reloads, unversioned saves are not re-converted, and old pounds-era saves convert once.
