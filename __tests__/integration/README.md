# Integration Tests for Firestore Security Rules

## Overview

These integration tests verify that Firestore Security Rules correctly enforce the Hybrid RBAC model using the Firebase Emulator Suite.

## Diamond Standard Compliance

✅ **MANDATORY**: Integration tests are the ONLY way to test Firestore Security Rules offline without deploying to production.

## Setup

### 1. Install Java (Required for Emulators)

Firebase Emulators require Java 11 or higher.

**Windows:**
```bash
# Check if Java is installed
java -version

# If not installed, download from:
# https://www.oracle.com/java/technologies/downloads/
# Or install via winget:
winget install Oracle.JDK.21
```

**macOS:**
```bash
brew install openjdk@17
```

**Linux:**
```bash
sudo apt-get install openjdk-17-jdk
```

### 2. Install Firebase Emulator Suite

```bash
npm install -g firebase-tools
```

### 3. Install Required Dependencies

```bash
npm install --save-dev @firebase/rules-unit-testing --legacy-peer-deps
```

**Note:** The `--legacy-peer-deps` flag is required due to a peer dependency mismatch between Firebase 11.x and the latest rules-unit-testing package.

### 3. Start Firebase Emulators

Before running tests, start the Firebase Emulator Suite:

```bash
npm run emulators
```

This will start:
- Firestore Emulator on `localhost:8080`
- Auth Emulator on `localhost:9099`

## Running Tests

### Run All Integration Tests

```bash
npm run test:integration
```

### Run Specific Test File

```bash
npm run test:integration -- user-rules.test.ts
```

### Watch Mode

```bash
npm run test:integration -- --watch
```

## Test Structure

```
__tests__/integration/firestore-rules/
├── user-rules.test.ts         # Tests for users collection
├── profile-rules.test.ts      # Tests for profiles collection (TODO)
└── system-rules.test.ts       # Tests for _system collection (TODO)
```

## Writing Tests

### Test Template

```typescript
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, getDoc } from 'firebase/firestore';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'getworken-test',
    firestore: {
      rules: readFileSync('firestore.rules', 'utf8'),
    },
  });
});

afterEach(async () => {
  await testEnv.clearFirestore();
});

afterAll(async () => {
  await testEnv.cleanup();
});

describe('My Security Rules', () => {
  it('should allow authenticated read', async () => {
    const userId = 'user123';
    const context = testEnv.authenticatedContext(userId);
    const db = context.firestore();
    
    await assertSucceeds(getDoc(doc(db, 'users', userId)));
  });
});
```

### Testing Hybrid RBAC

#### Static Role (Custom Claims - Free)

```typescript
// Admin role via Custom Claims (no Firestore read)
const adminContext = testEnv.authenticatedContext('admin123', {
  role: 'admin', // Custom Claim
});
```

#### Dynamic Permissions (Firestore - Costs 1 Read)

```typescript
// Setup user with specific permissions
await testEnv.withSecurityRulesDisabled(async (context) => {
  const db = context.firestore();
  await setDoc(doc(db, 'users', userId), {
    profiles: {
      business: { active: true },
      contractor: { active: false },
    },
  });
});

// Now test that getPermissions() function works
```

## Test Coverage Requirements

### ✅ User Collection (user-rules.test.ts)

- [x] User can read own document
- [x] User cannot read other user documents
- [x] Admin can read any user document
- [x] User can update own document
- [x] User cannot change own role
- [x] Admin can update user roles
- [x] User cannot delete own document
- [x] Super-admin can delete user documents

### 📋 Profile Collection (TODO)

- [ ] User can read own profiles
- [ ] User cannot read other profiles
- [ ] Staff can read any profile
- [ ] User can create profiles linked to their userId
- [ ] User cannot create profiles for other users
- [ ] User with active business profile can update business data
- [ ] User without active business profile cannot update business data

### 📋 System Collection (TODO)

- [ ] Only super-admin can read _system documents
- [ ] Only super-admin can write _system documents
- [ ] Regular users cannot access _system collection

## CI/CD Integration

Add to `.github/workflows/ci.yml`:

```yaml
test-integration:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v3
    - name: Setup Node
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    - name: Install Dependencies
      run: npm ci
    - name: Install Firebase Tools
      run: npm install -g firebase-tools
    - name: Start Firebase Emulators
      run: firebase emulators:start --only firestore,auth &
    - name: Wait for Emulators
      run: sleep 10
    - name: Run Integration Tests
      run: npm run test:integration
```

## Troubleshooting

### Port Already in Use

If Firestore emulator port 8080 is in use:

```bash
# Kill existing emulators
pkill -f firebase

# Or use different ports in firebase.json
```

### Tests Timeout

Ensure emulators are running before tests:

```bash
# Terminal 1
npm run emulators

# Terminal 2 (after emulators are ready)
npm run test:integration
```

### Rules Not Loading

Verify `firestore.rules` path in test setup matches your project structure.

## References

- [Firebase Rules Unit Testing](https://firebase.google.com/docs/rules/unit-tests)
- [Diamond Standard Reference](../../DIAMOND_STANDARD_REFERENCE.md)
- [Firestore Security Rules](../../firestore.rules)
