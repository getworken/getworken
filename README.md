# GetWorken

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-Realtime-orange?style=for-the-badge&logo=firebase)

**The modern platform connecting businesses, contractors, and workers in the field services industry.**

GetWorken simplifies workforce management with real-time job matching, profile management, and seamless communication tools.

## 🎯 About GetWorken

GetWorken is a comprehensive workforce management platform designed for the field services industry. Our mission is to connect:

- **Businesses** seeking reliable contractors and employees
- **Contractors** looking for quality projects and opportunities
- **Workers** searching for flexible employment in their field

### Why GetWorken?

- 🚀 **Fast Onboarding** - Join the waitlist and be ready to work in minutes
- 🔍 **Smart Matching** - AI-powered job and worker recommendations
- 💼 **Profile Management** - Comprehensive profiles for all user types
- 📱 **Mobile First** - Access everything on the go
- 🌍 **Multilingual** - Available in English, Spanish, and French

## ✨ Key Features

- ✅ **Next.js 16** with App Router
- ✅ **React 19** with Server Components
- ✅ **TypeScript** (strict mode)
- ✅ **Tailwind CSS** for styling
- ✅ **Firebase** (client SDK + Admin SDK with Hybrid RBAC)
- ✅ **next-intl** for internationalization (en, es, fr)
- ✅ **Pino** for structured logging
- ✅ **Sentry** for error tracking and APM
- ✅ **Jest** + **Playwright** + **Storybook** for testing
- ✅ **Husky** + **lint-staged** for code quality enforcement

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ and npm 10+
- Firebase project with Firestore enabled

### Installation

1. **Clone the repository**

```bash
cd getworken-main
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Copy `.env.local.example` to `.env.local` and fill in your Firebase credentials:

```bash
cp .env.local.example .env.local
```

Required environment variables:

- `NEXT_PUBLIC_FIREBASE_*`: Firebase client SDK configuration
- `FIREBASE_SERVICE_ACCOUNT`: Firebase Admin SDK service account JSON (as a single-line string)

4. **Initialize Husky (Git hooks)**

```bash
npm run prepare
```

5. **Run development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Using Firebase Emulators (Development)

Run Firebase emulators for local development:

```bash
npm run emulators
```

The app will automatically connect to emulators in development mode:

- Auth: `localhost:9099`
- Firestore: `localhost:8080`
- Storage: `localhost:9199`
- Emulator UI: `localhost:4000`

## 🧪 Testing

### Unit Tests (Jest + React Testing Library)

```bash
npm test                # Run tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

### E2E Tests (Playwright)

```bash
npm run test:e2e        # Run E2E tests
npm run test:e2e:ui     # Run with UI
```

### Component Development (Storybook)

```bash
npm run storybook       # Start Storybook
npm run build-storybook # Build static Storybook
```

## 📝 Code Quality

Code quality is enforced automatically:

- **Pre-commit**: Husky runs linting and formatting on staged files
- **CI/CD**: GitHub Actions runs tests and builds on every PR

### Manual Commands

```bash
npm run lint            # Run ESLint
npm run format          # Format with Prettier
npm run format:check    # Check formatting
```

## 🔐 Security (Hybrid RBAC Model)

This project implements a **Hybrid Role-Based Access Control (RBAC)** system:

### Static Roles (Firebase Custom Claims)

Stored in Firebase Custom Claims for instant permission checks:

- `super-admin` - Full system access
- `admin` - Administrative capabilities
- `moderator` - Content and user moderation
- `support` - Customer support functions
- `client` - Standard user access

### Dynamic Permissions (Firestore)

Stored in user documents for flexible, profile-based permissions:

- `profiles.business.active` - Business account access
- `profiles.contractor.active` - Contractor capabilities
- `profiles.employee.active` - Employee features
- `profiles.customer.active` - Customer portal access

### Defense in Depth

Security is enforced at multiple layers:

1. **Edge (middleware.ts)**: Route protection based on roles and authentication
2. **Server (Server Actions)**: User validation with Zod input validation
3. **Database (firestore.rules)**: Final security guarantor with comprehensive rules

## 🌍 Internationalization

Supported languages:

- 🇬🇧 **English** (default)
- 🇪🇸 **Spanish**
- 🇫🇷 **French**

### Usage Example

```tsx
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

function Component() {
  const t = useTranslations('navigation');

  return (
    <>
      <h1>{t('dashboard')}</h1>
      <Link href="/dashboard">Go to Dashboard</Link>
    </>
  );
}
```

Translations are stored in `/messages/{locale}.json` and automatically loaded based on URL locale (`/en/`, `/es/`, `/fr/`).

## 🧪 Testing

Comprehensive testing strategy covering all levels:

```bash
# Unit Tests (Jest + React Testing Library)
npm test

# Integration Tests (Firebase Emulators)
npm run emulators &
npm run test:integration

# E2E Tests (Playwright)
npm run test:e2e
npm run test:e2e:ui  # Interactive UI mode

# Coverage Report
npm run test:coverage
```

### Test Coverage

- ✅ Unit tests for shared components and utilities
- ✅ Integration tests for Firestore security rules
- ✅ E2E tests for critical user flows (auth, dashboard, profile, onboarding)
- ✅ Accessibility validation with @axe-core/playwright

## 🚀 Deployment

### Recommended: Firebase App Hosting

This project is designed for **Firebase App Hosting**, which provides full Next.js support with native Firebase integration.

**Quick Start:**

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Initialize App Hosting: `firebase init apphosting`
3. Connect your GitHub repository
4. Set environment variable: `NEXT_PUBLIC_LAUNCH_MODE=false` (for pre-launch)
5. Push to GitHub - automatic deployment!

### Deployment Modes

This project supports **two deployment modes** controlled by `NEXT_PUBLIC_LAUNCH_MODE`:

#### 🎯 Pre-Launch Mode (Waitlist Only)

Set `NEXT_PUBLIC_LAUNCH_MODE=false` in Firebase Console environment variables.

- ✅ Only homepage accessible
- ✅ Waitlist signup enabled
- ✅ All other routes redirect to home (enforced by middleware)

#### 🚀 Launch Mode (Full Platform)

Set `NEXT_PUBLIC_LAUNCH_MODE=true` when ready to launch.

- ✅ All routes enabled
- ✅ Login/signup accessible
- ✅ Dashboard and protected routes active
- ✅ Full authentication flow

### 📖 Detailed Documentation

- **[Firebase App Hosting Guide](./docs/deployment/FIREBASE_APP_HOSTING.md)** - Recommended deployment method
- **[Vercel Deployment](./docs/deployment/VERCEL_DEPLOY.md)** - Alternative hosting option
- **[Deployment Checklist](./docs/deployment/DEPLOY_CHECKLIST.md)** - Step-by-step verification

### Quick Commands

```bash
# Deploy pre-launch (waitlist only)
npm run firebase:deploy:pre-launch

# Deploy full launch (all features)
npm run firebase:deploy:launch

# Deploy Firestore rules only
npm run firebase:deploy:rules

# Build for pre-launch (no deploy)
npm run build:pre-launch

# Build for launch (no deploy)
npm run build:launch
```

## 🤝 Contributing

We welcome contributions! Before submitting a PR:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the existing code structure and conventions
4. Write tests for new functionality
5. Ensure all tests pass (`npm test`)
6. Run linting and formatting (`npm run lint && npm run format`)
7. Commit your changes (`git commit -m 'Add amazing feature'`)
8. Push to your branch (`git push origin feature/amazing-feature`)
9. Open a Pull Request

### Code Standards

- Follow Feature-Sliced Design architecture
- Use TypeScript strict mode
- Include TSDoc comments for public APIs
- Write unit tests for utilities and integration tests for features
- Ensure accessibility compliance (WCAG 2.2)

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details

---

**Built with ❤️ by the GetWorken team**
