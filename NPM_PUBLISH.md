# NPM Publishing Guide

## Prerequisites

1. **NPM Account**: Create an account at https://www.npmjs.com/
2. **Login**: Run `npm login` to authenticate
3. **Verify**: Check you're logged in with `npm whoami`

## Publishing Steps

### 1. Prepare for Publishing

```bash
# Make sure all tests pass
npm test

# Check what will be published
npm pack --dry-run
```

### 2. Version Management

Update the version in `package.json` following semantic versioning:
- **Patch** (0.1.0 → 0.1.1): Bug fixes
- **Minor** (0.1.0 → 0.2.0): New features, backward compatible
- **Major** (0.1.0 → 1.0.0): Breaking changes

Or use npm version commands:
```bash
npm version patch  # 0.1.0 → 0.1.1
npm version minor  # 0.1.0 → 0.2.0
npm version major  # 0.1.0 → 1.0.0
```

### 3. Publish

```bash
# Publish to NPM
npm publish

# For scoped packages (if you want @buchenberg/har-to-mermaid)
npm publish --access public
```

### 4. Verify Publication

Check your package at: `https://www.npmjs.com/package/har-to-mermaid`

## Package Configuration

The `package.json` includes:
- ✅ **files** field: Only publishes necessary files (index.js, lib/, README.md, LICENSE)
- ✅ **.npmignore**: Excludes test files, git files, etc.
- ✅ **repository**: Points to GitHub repo
- ✅ **keywords**: For NPM searchability
- ✅ **engines**: Node.js version requirement

## Files Included in NPM Package

Based on `package.json` files field and `.npmignore`:
- `index.js`
- `lib/har-to-mermaid.js`
- `README.md`
- `LICENSE`

Excluded:
- `test/` directory
- `.git/` directory
- Development files

## Updating After Publishing

1. Make changes
2. Update version: `npm version patch`
3. Test: `npm test`
4. Publish: `npm publish`
5. Commit and tag: `git push && git push --tags`

## Unpublishing (if needed)

⚠️ **Warning**: Only unpublish within 72 hours of publishing

```bash
npm unpublish har-to-mermaid@0.1.0
```

## Troubleshooting

### "Package name already exists"
- Choose a different name, or
- Use a scoped package: `@buchenberg/har-to-mermaid`

### "You must verify your email"
- Check your email and verify your NPM account

### "Incorrect password"
- Run `npm login` again

