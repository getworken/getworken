/**
 * Home Page Example - Alternative Pricing Style
 * @module pages/home/example
 *
 * This is a reference example showing streamlined pricing with simplified approach.
 * Key differences from main home page:
 * - User count display instead of granular limits
 * - Feature highlights focus on high-level capabilities
 * - Simplified comparison without detailed limits
 *
 * Note: "1 contractor" terminology maps to "1 user" for solo plans
 */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button, Card, CardTitle, Badge } from '@/shared/ui';

export default function HomeExamplePage() {
  const t = useTranslations('home');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(
    'monthly'
  );
  const [selectedPlanType, setSelectedPlanType] = useState<'solo' | 'team'>(
    'solo'
  );

  return (
    <div className="bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-800 shadow-lg">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <span className="text-2xl font-bold text-teal-400">
            {t('common.appName')}{' '}
            <span className="text-sm text-slate-400">(Example)</span>
          </span>
          <nav className="flex items-center gap-8">
            <a
              href="#features"
              className="font-medium text-slate-300 transition hover:text-white"
            >
              {t('home.nav.features')}
            </a>
            <a
              href="#pricing"
              className="font-medium text-slate-300 transition hover:text-white"
            >
              {t('home.nav.pricing')}
            </a>
            <Link href="/login">
              <Button className="bg-teal-600 shadow-lg hover:bg-teal-700">
                {t('home.nav.login')}
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex h-[600px] items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10"></div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
          <h1 className="mb-6 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
            {t('home.hero.title')}
          </h1>
          <p className="mb-8 text-xl text-slate-300">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signup">
              <Button className="bg-teal-600 px-8 py-4 text-lg shadow-xl hover:bg-teal-700 hover:shadow-2xl">
                {t('home.hero.cta.primary')}
              </Button>
            </Link>
            <a href="#features">
              <Button
                variant="outline"
                className="border-slate-600 bg-slate-700 px-8 py-4 text-lg hover:bg-slate-600"
              >
                {t('home.hero.cta.secondary')}
              </Button>
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-400">
            {t('home.hero.disclaimer')}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-800 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-4">
            <div>
              <div className="mb-2 text-4xl font-bold text-teal-400">
                {t('home.stats.users.value')}
              </div>
              <div className="text-slate-400">
                {t('home.stats.users.label')}
              </div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-teal-400">
                {t('home.stats.jobs.value')}
              </div>
              <div className="text-slate-400">{t('home.stats.jobs.label')}</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-teal-400">
                {t('home.stats.revenue.value')}
              </div>
              <div className="text-slate-400">
                {t('home.stats.revenue.label')}
              </div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-teal-400">
                {t('home.stats.rating.value')}
              </div>
              <div className="text-slate-400">
                {t('home.stats.rating.label')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-slate-900 py-20">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              {t('home.features.title')}
            </h2>
            <p className="text-xl text-slate-400">
              {t('home.features.subtitle')}
            </p>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="hover:bg-slate-750 border-slate-700 bg-slate-800 p-8 transition">
              <div className="mb-4 text-5xl">📄</div>
              <CardTitle className="mb-3 text-2xl text-white">
                {t('home.features.quoting.title')}
              </CardTitle>
              <p className="mb-4 text-slate-400">
                {t('home.features.quoting.description')}
              </p>
              <Badge
                variant="default"
                className="border-0 bg-teal-900 text-teal-400"
              >
                ✓ {t('home.features.quoting.status')}
              </Badge>
            </Card>

            <Card className="hover:bg-slate-750 border-slate-700 bg-slate-800 p-8 transition">
              <div className="mb-4 text-5xl">📅</div>
              <CardTitle className="mb-3 text-2xl text-white">
                {t('home.features.scheduling.title')}
              </CardTitle>
              <p className="mb-4 text-slate-400">
                {t('home.features.scheduling.description')}
              </p>
              <Badge
                variant="default"
                className="border-0 bg-yellow-900 text-yellow-400"
              >
                🔨 {t('home.features.scheduling.status')}
              </Badge>
            </Card>

            <Card className="hover:bg-slate-750 border-slate-700 bg-slate-800 p-8 transition">
              <div className="mb-4 text-5xl">💳</div>
              <CardTitle className="mb-3 text-2xl text-white">
                {t('home.features.payments.title')}
              </CardTitle>
              <p className="mb-4 text-slate-400">
                {t('home.features.payments.description')}
              </p>
              <Badge
                variant="default"
                className="border-0 bg-red-900 text-red-400"
              >
                ⏳ {t('home.features.payments.status')}
              </Badge>
            </Card>

            <Card className="hover:bg-slate-750 border-slate-700 bg-slate-800 p-8 transition">
              <div className="mb-4 text-5xl">👥</div>
              <CardTitle className="mb-3 text-2xl text-white">
                {t('home.features.crm.title')}
              </CardTitle>
              <p className="mb-4 text-slate-400">
                {t('home.features.crm.description')}
              </p>
              <Badge
                variant="default"
                className="border-0 bg-teal-900 text-teal-400"
              >
                ✓ {t('home.features.crm.status')}
              </Badge>
            </Card>

            <Card className="hover:bg-slate-750 border-slate-700 bg-slate-800 p-8 transition">
              <div className="mb-4 text-5xl">📈</div>
              <CardTitle className="mb-3 text-2xl text-white">
                {t('home.features.analytics.title')}
              </CardTitle>
              <p className="mb-4 text-slate-400">
                {t('home.features.analytics.description')}
              </p>
              <Badge
                variant="default"
                className="border-0 bg-red-900 text-red-400"
              >
                ⏳ {t('home.features.analytics.status')}
              </Badge>
            </Card>

            <Card className="hover:bg-slate-750 border-slate-700 bg-slate-800 p-8 transition">
              <div className="mb-4 text-5xl">📱</div>
              <CardTitle className="mb-3 text-2xl text-white">
                {t('home.features.mobile.title')}
              </CardTitle>
              <p className="mb-4 text-slate-400">
                {t('home.features.mobile.description')}
              </p>
              <Badge
                variant="default"
                className="border-0 bg-yellow-900 text-yellow-400"
              >
                🔨 {t('home.features.mobile.status')}
              </Badge>
            </Card>
          </div>
        </div>
      </section>

      {/* Simplified Pricing Section */}
      <section id="pricing" className="bg-slate-800 py-20">
        <div className="container mx-auto max-w-7xl px-6">
          {/* Help Section */}
          <div className="mb-16 grid gap-8 md:grid-cols-3 lg:grid-cols-4">
            <div className="rounded-lg border-2 border-slate-700 bg-slate-900 p-6">
              <h3 className="mb-4 text-xl font-bold text-white">
                Need help finding the right plan?
              </h3>
              <p className="mb-6 text-sm text-slate-400">
                Take this short quiz and we'll match you with the right plan for
                your business.
              </p>
              <Button
                variant="outline"
                className="w-full border-slate-600 bg-slate-800 text-white hover:bg-slate-700"
              >
                Find your plan
              </Button>
            </div>

            {/* Solo Plans Column */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <div className="mb-8 text-center">
                <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                  Simple, transparent pricing
                </h2>
                <p className="text-xl text-slate-400">
                  Choose the plan that fits your business size
                </p>
              </div>

              {/* Billing Toggle */}
              <div className="mb-8 text-center">
                <div className="inline-flex rounded-lg bg-slate-700 p-1">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`rounded-md px-6 py-2 font-medium transition ${
                      billingCycle === 'monthly'
                        ? 'bg-teal-600 text-white'
                        : 'text-slate-300'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle('annual')}
                    className={`rounded-md px-6 py-2 font-medium transition ${
                      billingCycle === 'annual'
                        ? 'bg-teal-600 text-white'
                        : 'text-slate-300'
                    }`}
                  >
                    Annual{' '}
                    <span className="ml-1 text-sm text-teal-400">
                      (Save 20%)
                    </span>
                  </button>
                </div>
              </div>

              {/* Plan Type Tabs */}
              <div className="mb-8 flex justify-center gap-4">
                <Button
                  onClick={() => setSelectedPlanType('solo')}
                  variant={selectedPlanType === 'solo' ? 'default' : 'outline'}
                  className={
                    selectedPlanType === 'solo'
                      ? 'bg-teal-600 px-8 py-3 shadow-lg hover:bg-teal-700'
                      : 'bg-slate-700 px-8 py-3 text-slate-300 hover:bg-slate-600'
                  }
                >
                  1 Contractor Plans
                </Button>
                <Button
                  onClick={() => setSelectedPlanType('team')}
                  variant={selectedPlanType === 'team' ? 'default' : 'outline'}
                  className={
                    selectedPlanType === 'team'
                      ? 'bg-teal-600 px-8 py-3 shadow-lg hover:bg-teal-700'
                      : 'bg-slate-700 px-8 py-3 text-slate-300 hover:bg-slate-600'
                  }
                >
                  Multi-Contractor Plans
                </Button>
              </div>

              {/* Pricing Cards Grid */}
              <div className="grid gap-6 md:grid-cols-3">
                {selectedPlanType === 'solo' ? (
                  <>
                    {/* Core Plan - 1 Contractor */}
                    <Card className="border-2 border-slate-700 bg-slate-900 p-6 transition hover:border-teal-500">
                      <div className="mb-4">
                        <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-500">
                          1 contractor
                        </p>
                        <CardTitle className="mb-2 text-3xl font-bold text-white">
                          Core
                        </CardTitle>
                        <p className="text-sm text-slate-400">
                          Essential tools to grow your reputation as a
                          professional home service business.
                        </p>
                      </div>

                      <div className="mb-6 border-t border-slate-700 pt-6">
                        <div className="mb-2">
                          <span className="text-sm text-slate-500 line-through">
                            {billingCycle === 'monthly' ? '$39/mo' : '$31/mo'}
                          </span>
                        </div>
                        <div className="mb-1 flex items-baseline">
                          <span className="text-5xl font-bold text-white">
                            {billingCycle === 'monthly' ? '$23' : '$18'}
                          </span>
                          <span className="ml-2 text-slate-400">/mo</span>
                        </div>
                        <p className="text-xs text-slate-500">
                          For 12 months*
                          <br />
                          Billed annually
                        </p>
                      </div>

                      <Link href="/signup?plan=core" className="mb-6 block">
                        <Button className="w-full bg-teal-600 hover:bg-teal-700">
                          Start Free Trial
                        </Button>
                      </Link>

                      <div className="space-y-3 text-sm">
                        <p className="font-semibold text-white">
                          Key features:
                        </p>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Book and schedule jobs online</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Send professional quotes</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Send invoices and receive online payments</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Create a professional website</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Reporting</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Access the app marketplace</span>
                        </div>
                      </div>
                    </Card>

                    {/* Connect Plan - 1 Contractor */}
                    <Card className="relative border-2 border-teal-600 bg-slate-900 p-6">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="border-0 bg-gradient-to-r from-teal-500 to-blue-500 px-4 py-1 text-xs font-bold uppercase">
                          Most Popular
                        </Badge>
                      </div>

                      <div className="mb-4">
                        <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-500">
                          1 contractor
                        </p>
                        <CardTitle className="mb-2 text-3xl font-bold text-white">
                          Connect
                        </CardTitle>
                        <p className="text-sm text-slate-400">
                          Automations and must-have integrations to reduce admin
                          work and impress customers.
                        </p>
                      </div>

                      <div className="mb-6 border-t border-slate-700 pt-6">
                        <div className="mb-2">
                          <span className="text-sm text-slate-500 line-through">
                            {billingCycle === 'monthly' ? '$119/mo' : '$95/mo'}
                          </span>
                        </div>
                        <div className="mb-1 flex items-baseline">
                          <span className="text-5xl font-bold text-white">
                            {billingCycle === 'monthly' ? '$71' : '$57'}
                          </span>
                          <span className="ml-2 text-slate-400">/mo</span>
                        </div>
                        <p className="text-xs text-slate-500">
                          For 12 months*
                          <br />
                          Billed annually
                        </p>
                      </div>

                      <Link href="/signup?plan=connect" className="mb-6 block">
                        <Button className="w-full bg-teal-600 hover:bg-teal-700">
                          Start Free Trial
                        </Button>
                      </Link>

                      <div className="space-y-3 text-sm">
                        <p className="font-semibold text-white">
                          All Core features, plus:
                        </p>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Send automated reminders</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Collect payments automatically</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Document work on job forms</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Automate quote and invoice follow-ups</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Connect QuickBooks Online</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Track time and expenses</span>
                        </div>
                      </div>
                    </Card>

                    {/* Grow Plan - 1 Contractor */}
                    <Card className="border-2 border-slate-700 bg-slate-900 p-6 transition hover:border-teal-500">
                      <div className="mb-4">
                        <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-500">
                          1 contractor
                        </p>
                        <CardTitle className="mb-2 text-3xl font-bold text-white">
                          Grow
                        </CardTitle>
                        <p className="text-sm text-slate-400">
                          Advanced tools to win bigger jobs, scale your
                          operations, and take back your admin time.
                        </p>
                      </div>

                      <div className="mb-6 border-t border-slate-700 pt-6">
                        <div className="mb-2">
                          <span className="text-sm text-slate-500 line-through">
                            {billingCycle === 'monthly' ? '$199/mo' : '$159/mo'}
                          </span>
                        </div>
                        <div className="mb-1 flex items-baseline">
                          <span className="text-5xl font-bold text-white">
                            {billingCycle === 'monthly' ? '$118' : '$94'}
                          </span>
                          <span className="ml-2 text-slate-400">/mo</span>
                        </div>
                        <p className="text-xs text-slate-500">
                          For 12 months*
                          <br />
                          Billed annually
                        </p>
                      </div>

                      <Link href="/signup?plan=grow" className="mb-6 block">
                        <Button className="w-full bg-teal-600 hover:bg-teal-700">
                          Start Free Trial
                        </Button>
                      </Link>

                      <div className="space-y-3 text-sm">
                        <p className="font-semibold text-white">
                          All Connect features, plus:
                        </p>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Access advanced quote customizations</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Add optional line items</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Track time automatically</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Track costs with job costing</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>
                            Connect with customers through two-way SMS
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Build custom workflow automations</span>
                        </div>
                      </div>
                    </Card>
                  </>
                ) : (
                  <>
                    {/* Connect Team Plan */}
                    <Card className="border-2 border-slate-700 bg-slate-900 p-6 transition hover:border-teal-500">
                      <div className="mb-4">
                        <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-500">
                          Up to 5 contractors
                        </p>
                        <CardTitle className="mb-2 text-3xl font-bold text-white">
                          Connect
                        </CardTitle>
                        <p className="text-sm text-slate-400">
                          Automations and must-have integrations to reduce admin
                          work and impress customers.
                        </p>
                      </div>

                      <div className="mb-6 border-t border-slate-700 pt-6">
                        <div className="mb-2">
                          <span className="text-sm text-slate-500 line-through">
                            {billingCycle === 'monthly' ? '$169/mo' : '$135/mo'}
                          </span>
                        </div>
                        <div className="mb-1 flex items-baseline">
                          <span className="text-5xl font-bold text-white">
                            {billingCycle === 'monthly' ? '$102' : '$82'}
                          </span>
                          <span className="ml-2 text-slate-400">/mo</span>
                        </div>
                        <p className="text-xs text-slate-500">
                          For 12 months*
                          <br />
                          Billed annually
                        </p>
                      </div>

                      <Link
                        href="/signup?plan=team_connect"
                        className="mb-6 block"
                      >
                        <Button className="w-full bg-teal-600 hover:bg-teal-700">
                          Start Free Trial
                        </Button>
                      </Link>

                      <div className="space-y-3 text-sm">
                        <p className="font-semibold text-white">
                          All Core features plus:
                        </p>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Send automated reminders</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Collect payments automatically</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Document work on job forms</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Automate quote and invoice follow-ups</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Connect QuickBooks Online</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Track time and expenses</span>
                        </div>
                      </div>
                    </Card>

                    {/* Grow Team Plan */}
                    <Card className="relative border-2 border-teal-600 bg-slate-900 p-6">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="border-0 bg-gradient-to-r from-teal-500 to-blue-500 px-4 py-1 text-xs font-bold uppercase">
                          Most Popular
                        </Badge>
                      </div>

                      <div className="mb-4">
                        <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-500">
                          Up to 10 contractors
                        </p>
                        <CardTitle className="mb-2 text-3xl font-bold text-white">
                          Grow
                        </CardTitle>
                        <p className="text-sm text-slate-400">
                          Advanced tools to win bigger jobs, scale your
                          operations, and take back your admin time.
                        </p>
                      </div>

                      <div className="mb-6 border-t border-slate-700 pt-6">
                        <div className="mb-2">
                          <span className="text-sm text-slate-500 line-through">
                            {billingCycle === 'monthly' ? '$349/mo' : '$279/mo'}
                          </span>
                        </div>
                        <div className="mb-1 flex items-baseline">
                          <span className="text-5xl font-bold text-white">
                            {billingCycle === 'monthly' ? '$197' : '$158'}
                          </span>
                          <span className="ml-2 text-slate-400">/mo</span>
                        </div>
                        <p className="text-xs text-slate-500">
                          For 12 months*
                          <br />
                          Billed annually
                        </p>
                      </div>

                      <Link
                        href="/signup?plan=team_grow"
                        className="mb-6 block"
                      >
                        <Button className="w-full bg-teal-600 hover:bg-teal-700">
                          Start Free Trial
                        </Button>
                      </Link>

                      <div className="space-y-3 text-sm">
                        <p className="font-semibold text-white">
                          All Connect features, plus:
                        </p>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Access advanced quote customizations</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Add optional line items</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Track time automatically</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Track costs with job costing</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>
                            Connect with customers through two-way SMS
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Build custom workflow automations</span>
                        </div>
                      </div>
                    </Card>

                    {/* Plus Team Plan */}
                    <Card className="border-2 border-slate-700 bg-slate-900 p-6 transition hover:border-teal-500">
                      <div className="mb-4">
                        <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-500">
                          Up to 15 contractors
                        </p>
                        <CardTitle className="mb-2 text-3xl font-bold text-white">
                          Plus
                        </CardTitle>
                        <p className="text-sm text-slate-400">
                          All features backed by premium support to maximize
                          efficiency and profits.
                        </p>
                      </div>

                      <div className="mb-6 border-t border-slate-700 pt-6">
                        <div className="mb-2">
                          <span className="text-sm text-slate-500 line-through">
                            {billingCycle === 'monthly' ? '$598/mo' : '$478/mo'}
                          </span>
                        </div>
                        <div className="mb-1 flex items-baseline">
                          <span className="text-5xl font-bold text-white">
                            {billingCycle === 'monthly' ? '$355' : '$284'}
                          </span>
                          <span className="ml-2 text-slate-400">/mo</span>
                        </div>
                        <p className="text-xs text-slate-500">
                          For 12 months*
                          <br />
                          Billed annually
                        </p>
                      </div>

                      <Link
                        href="/signup?plan=team_plus"
                        className="mb-6 block"
                      >
                        <Button className="w-full bg-teal-600 hover:bg-teal-700">
                          Start Free Trial
                        </Button>
                      </Link>

                      <div className="space-y-3 text-sm">
                        <p className="font-semibold text-white">
                          All Grow features, plus:
                        </p>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>GetWorken Marketing Suite ($79 value)</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>
                            Book leads with GetWorken's Receptionist ($99 Value)
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Onboarding with a dedicated specialist</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>Premium Support ($99 Value)</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-300">
                          <span className="font-bold text-teal-400">✓</span>
                          <span>
                            Guided API walkthrough for custom integrations
                          </span>
                        </div>
                      </div>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">
            {t('home.cta.title')}
          </h2>
          <p className="mb-8 text-xl text-teal-100">{t('home.cta.subtitle')}</p>
          <Link href="/signup">
            <Button className="bg-white px-8 py-4 text-lg text-teal-600 shadow-xl hover:bg-slate-100">
              {t('home.cta.button')}
            </Button>
          </Link>
          <p className="mt-4 text-sm text-teal-100">
            {t('home.cta.disclaimer')}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <span className="text-2xl font-bold text-teal-400">
              {t('common.appName')}
            </span>
            <p className="mt-2 text-slate-400">{t('home.footer.tagline')}</p>
          </div>
          <div className="mb-8 flex justify-center gap-8 text-slate-400">
            <a href="#features" className="transition hover:text-white">
              {t('home.nav.features')}
            </a>
            <a href="#pricing" className="transition hover:text-white">
              {t('home.nav.pricing')}
            </a>
            <Link href="/login" className="transition hover:text-white">
              {t('navigation.login')}
            </Link>
            <Link href="/signup" className="transition hover:text-white">
              {t('navigation.signup')}
            </Link>
          </div>
          <p className="text-slate-500">{t('home.footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
}

// Server-side rendering enforcement
export async function getServerSideProps() {
  return {
    props: {},
  };
}
