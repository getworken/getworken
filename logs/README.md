# 📋 Error Logs Directory

**Purpose:** Centralized location for all application and build error logs
**Last Updated:** November 23, 2025

---

## 📂 Directory Structure

```
logs/
├── README.md              # This file
├── sentry/                # Sentry wizard installation errors
├── firebase/              # Firebase emulator and debug logs
├── dev/                   # Development server output logs
└── .gitignore             # Excludes logs from git (except README)
```

---

## 🗂️ Log Categories

### Sentry Logs

**Location:** `logs/sentry/`

Contains Sentry wizard installation error logs. These logs capture issues during the Sentry SDK integration process.

**Files:**

- `sentry-wizard-installation-error-*.log` - Installation attempt errors

**Common Issues:**

- Peer dependency conflicts with Firebase
- Configuration wizard failures
- SDK initialization errors

**Resolution:** See [Sentry Setup Guide](../docs/setup/SENTRY_SETUP.md)

### Firebase Logs

**Location:** `logs/firebase/`

Contains Firebase emulator debug logs and Firestore operation logs.

**Files:**

- `firestore-debug.log` - Firestore emulator debug output
- Firebase emulator runtime logs

**Common Issues:**

- Emulator connection failures
- Security rule validation errors
- Database operation timeouts

**Resolution:** See [Firebase Setup Guide](../docs/setup/FIREBASE_SETUP_NEW_ACCOUNT.md)

### Development Logs

**Location:** `logs/dev/`

Contains development server output and runtime logs.

**Files:**

- `dev-output.log` - Next.js dev server output
- Runtime error logs
- Build process logs

**Common Issues:**

- Module resolution errors
- TypeScript compilation errors
- Hot reload failures

**Resolution:** Check the specific error in the log file and refer to troubleshooting guides

---

## 🚫 Git Ignore

All log files (except this README) are excluded from version control via `.gitignore`:

```gitignore
# Logs
logs/**/*.log
!logs/README.md
```

**Why?** Log files are:

- Environment-specific
- Potentially large
- Contain local machine paths
- Regenerated on each run

---

## 🔍 Log Analysis

### Viewing Logs

**PowerShell:**

```powershell
# View latest entries
Get-Content logs/dev/dev-output.log -Tail 50

# Search for errors
Select-String -Path "logs/**/*.log" -Pattern "ERROR|FAIL|Exception"

# List all logs by date
Get-ChildItem -Path logs -Recurse -Filter "*.log" | Sort-Object LastWriteTime -Descending
```

**Linux/Mac:**

```bash
# View latest entries
tail -50 logs/dev/dev-output.log

# Search for errors
grep -r "ERROR\|FAIL\|Exception" logs/

# List all logs by date
find logs -name "*.log" -type f -ls | sort -k9
```

### Common Error Patterns

**Peer Dependency Conflicts:**

```
npm error ERESOLVE could not resolve
npm error peer firebase@"^12.0.0"
```

**Solution:** Use `--legacy-peer-deps` flag

**Port Already in Use:**

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:** Kill process on port 3000 or use different port

**TypeScript Errors:**

```
Type error: Cannot find module '@/shared/lib/utils'
```

**Solution:** Restart TypeScript server or check tsconfig.json paths

---

## 🧹 Cleanup

### Manual Cleanup

```powershell
# Remove all logs (PowerShell)
Remove-Item -Path "logs/**/*.log" -Force

# Remove logs older than 7 days
Get-ChildItem -Path logs -Recurse -Filter "*.log" |
  Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-7) } |
  Remove-Item -Force
```

```bash
# Remove all logs (Linux/Mac)
find logs -name "*.log" -type f -delete

# Remove logs older than 7 days
find logs -name "*.log" -type f -mtime +7 -delete
```

### Automated Cleanup (Recommended)

Add to `package.json`:

```json
{
  "scripts": {
    "logs:clean": "node -e \"require('fs').rmSync('logs', {recursive:true, force:true}); require('fs').mkdirSync('logs', {recursive:true})\"",
    "logs:clean:old": "node scripts/clean-old-logs.js"
  }
}
```

---

## 📊 Log Retention

**Recommendation:**

- Keep logs for last 7 days for debugging
- Archive critical error logs if needed
- Clean logs before committing code

**Storage:**

- Logs are stored locally only
- Not synced to version control
- Not deployed to production

---

## 🔧 Troubleshooting by Log Type

### Sentry Installation Errors

**Symptom:** `sentry-wizard-installation-error-*.log` files created

**Cause:**

- Peer dependency conflicts with Firebase
- Incompatible Node.js version
- Network issues during package installation

**Steps:**

1. Read the specific error in the log file
2. Check [Sentry Setup Guide](../docs/setup/SENTRY_SETUP.md)
3. Use `npm install --legacy-peer-deps` for Sentry packages
4. Verify Node.js version is 20+

### Firebase Debug Logs

**Symptom:** `firestore-debug.log` shows errors

**Cause:**

- Emulator not started correctly
- Port conflicts (default: 8080, 9099)
- Security rules validation failures

**Steps:**

1. Check which port is failing
2. Ensure Java 11+ is installed (required for emulators)
3. Review firestore.rules for syntax errors
4. Restart emulators: `npm run emulators`

### Development Server Logs

**Symptom:** `dev-output.log` contains errors

**Cause:**

- Module import errors
- TypeScript compilation errors
- Environment variable issues

**Steps:**

1. Check the specific error message
2. Verify all dependencies are installed: `npm install --legacy-peer-deps`
3. Restart dev server: `npm run dev`
4. Clear Next.js cache: `rm -rf .next`

---

## 📝 Adding New Log Categories

To add a new log category:

1. **Create directory:**

   ```powershell
   New-Item -ItemType Directory -Path "logs/new-category" -Force
   ```

2. **Update .gitignore:**

   ```gitignore
   logs/new-category/**/*.log
   ```

3. **Document here:**
   Add section above describing the log category

4. **Configure in code:**
   ```typescript
   // Example: Custom logger
   const logPath = path.join(process.cwd(), 'logs/new-category/app.log');
   ```

---

## 🔗 Related Documentation

- [Setup Guide](../docs/setup/SETUP_GUIDE.md)
- [Sentry Setup](../docs/setup/SENTRY_SETUP.md)
- [Firebase Configuration](../docs/setup/FIREBASE_CONFIGURATION.md)
- [Troubleshooting](../docs/fixes/FIXES_APPLIED.md)

---

## ⚠️ Important Notes

1. **Never commit logs to git** - They may contain sensitive data
2. **Check logs first** when debugging issues - Most errors are logged
3. **Clean logs regularly** - They can accumulate and take disk space
4. **Archive critical logs** - If an error needs investigation later

---

**Need Help?** Check the specific log file for the error message, then refer to the appropriate setup or troubleshooting guide.
