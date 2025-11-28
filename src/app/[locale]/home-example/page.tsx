/**
 * Home Page Example - Production-Ready Alternative
 * @module app/[locale]/home-example
 *
 * Complete pricing page using clean presentation style with GetWorken's
 * pricing structure and features. Includes interactive quiz, full pricing tiers,
 * and comprehensive feature comparison table.
 *
 * Ready to replace main home page upon approval.
 */

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button, Card, CardTitle, Badge } from '@/shared/ui';

export default function HomeExamplePage() {
  const t = useTranslations();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(
    'monthly'
  );
  const [selectedPlanType, setSelectedPlanType] = useState<'solo' | 'team'>(
    'solo'
  );
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({
    teamSize: '',
    employees: '',
    jobsPerMonth: '',
  });

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

      {/* Pricing Section with Quiz */}
      <section id="pricing" className="bg-slate-800 py-20">
        <div className="container mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              {t('home.pricing.title')}
            </h2>
            <p className="mb-8 text-xl text-slate-400">
              {t('home.pricing.subtitle')}
            </p>
          </div>

          {/* Interactive Quiz Section */}
          {showQuiz ? (
            <Card className="mx-auto mb-12 max-w-2xl border-slate-700 bg-slate-900 p-8">
              <CardTitle className="mb-6 text-2xl text-white">
                Find Your Perfect Plan
              </CardTitle>

              {quizStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-slate-300">
                      How many contractors work in your business?
                    </label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <button
                        onClick={() => {
                          setQuizAnswers({ ...quizAnswers, teamSize: '1' });
                          setQuizStep(2);
                        }}
                        className="rounded-lg border-2 border-slate-700 bg-slate-800 p-4 text-left transition hover:border-teal-500 hover:bg-slate-700"
                      >
                        <div className="font-semibold text-white">
                          Just me (1 contractor)
                        </div>
                        <div className="text-sm text-slate-400">
                          Solo contractor or freelancer
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setQuizAnswers({ ...quizAnswers, teamSize: 'team' });
                          setQuizStep(2);
                        }}
                        className="rounded-lg border-2 border-slate-700 bg-slate-800 p-4 text-left transition hover:border-teal-500 hover:bg-slate-700"
                      >
                        <div className="font-semibold text-white">
                          Multiple contractors
                        </div>
                        <div className="text-sm text-slate-400">
                          Team of 2+ contractors
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {quizStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-slate-300">
                      How many employees do you have (non-contractors)?
                    </label>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <button
                        onClick={() => {
                          setQuizAnswers({ ...quizAnswers, employees: '0-1' });
                          setQuizStep(3);
                        }}
                        className="rounded-lg border-2 border-slate-700 bg-slate-800 p-4 text-center transition hover:border-teal-500 hover:bg-slate-700"
                      >
                        <div className="font-semibold text-white">0-1</div>
                        <div className="text-sm text-slate-400">
                          Just starting
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setQuizAnswers({ ...quizAnswers, employees: '2-6' });
                          setQuizStep(3);
                        }}
                        className="rounded-lg border-2 border-slate-700 bg-slate-800 p-4 text-center transition hover:border-teal-500 hover:bg-slate-700"
                      >
                        <div className="font-semibold text-white">2-6</div>
                        <div className="text-sm text-slate-400">Small team</div>
                      </button>
                      <button
                        onClick={() => {
                          setQuizAnswers({ ...quizAnswers, employees: '7+' });
                          setQuizStep(3);
                        }}
                        className="rounded-lg border-2 border-slate-700 bg-slate-800 p-4 text-center transition hover:border-teal-500 hover:bg-slate-700"
                      >
                        <div className="font-semibold text-white">7+</div>
                        <div className="text-sm text-slate-400">
                          Growing team
                        </div>
                      </button>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setQuizStep(1)}
                    className="border-slate-600 text-slate-300"
                  >
                    ← Back
                  </Button>
                </div>
              )}

              {quizStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-slate-300">
                      How many jobs do you complete per month?
                    </label>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <button
                        onClick={() => {
                          setQuizAnswers({
                            ...quizAnswers,
                            jobsPerMonth: '1-10',
                          });
                          setQuizStep(4);
                        }}
                        className="rounded-lg border-2 border-slate-700 bg-slate-800 p-4 text-center transition hover:border-teal-500 hover:bg-slate-700"
                      >
                        <div className="font-semibold text-white">1-10</div>
                        <div className="text-sm text-slate-400">Starting</div>
                      </button>
                      <button
                        onClick={() => {
                          setQuizAnswers({
                            ...quizAnswers,
                            jobsPerMonth: '10-50',
                          });
                          setQuizStep(4);
                        }}
                        className="rounded-lg border-2 border-slate-700 bg-slate-800 p-4 text-center transition hover:border-teal-500 hover:bg-slate-700"
                      >
                        <div className="font-semibold text-white">10-50</div>
                        <div className="text-sm text-slate-400">Busy</div>
                      </button>
                      <button
                        onClick={() => {
                          setQuizAnswers({
                            ...quizAnswers,
                            jobsPerMonth: '50+',
                          });
                          setQuizStep(4);
                        }}
                        className="rounded-lg border-2 border-slate-700 bg-slate-800 p-4 text-center transition hover:border-teal-500 hover:bg-slate-700"
                      >
                        <div className="font-semibold text-white">50+</div>
                        <div className="text-sm text-slate-400">Scaling</div>
                      </button>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setQuizStep(2)}
                    className="border-slate-600 text-slate-300"
                  >
                    ← Back
                  </Button>
                </div>
              )}

              {quizStep === 4 && (
                <div className="space-y-6">
                  <div className="rounded-lg bg-gradient-to-r from-teal-900 to-blue-900 p-6">
                    <h3 className="mb-3 text-xl font-bold text-white">
                      We recommend:{' '}
                      {quizAnswers.teamSize === '1'
                        ? quizAnswers.jobsPerMonth === '1-10'
                          ? 'Free Solo'
                          : quizAnswers.jobsPerMonth === '10-50'
                            ? 'Solo Basic'
                            : 'Solo Pro'
                        : quizAnswers.jobsPerMonth === '1-10'
                          ? 'Team Basic'
                          : quizAnswers.jobsPerMonth === '10-50'
                            ? 'Team Pro'
                            : 'Enterprise'}
                    </h3>
                    <p className="mb-4 text-slate-300">
                      Based on your answers, this plan will give you the tools
                      you need to manage your business efficiently.
                    </p>
                    <Button
                      onClick={() => {
                        setShowQuiz(false);
                        setSelectedPlanType(
                          quizAnswers.teamSize === '1' ? 'solo' : 'team'
                        );
                      }}
                      className="bg-white text-teal-900 hover:bg-slate-100"
                    >
                      View Recommended Plan
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setQuizStep(1);
                      setQuizAnswers({
                        teamSize: '',
                        employees: '',
                        jobsPerMonth: '',
                      });
                    }}
                    className="border-slate-600 text-slate-300"
                  >
                    Start Over
                  </Button>
                </div>
              )}
            </Card>
          ) : (
            <div className="mb-12 text-center">
              <Card className="mx-auto inline-block border-slate-700 bg-slate-900 p-6">
                <h3 className="mb-2 text-lg font-bold text-white">
                  Not sure which plan is right for you?
                </h3>
                <p className="mb-4 text-sm text-slate-400">
                  Take our 30-second quiz to find your perfect plan
                </p>
                <Button
                  onClick={() => setShowQuiz(true)}
                  variant="outline"
                  className="border-slate-600 bg-slate-800 text-white hover:bg-slate-700"
                >
                  Take the Quiz →
                </Button>
              </Card>
            </div>
          )}

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
                {t('home.pricing.billing.monthly')}
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`rounded-md px-6 py-2 font-medium transition ${
                  billingCycle === 'annual'
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-300'
                }`}
              >
                {t('home.pricing.billing.annual')}{' '}
                <span className="ml-1 text-sm text-teal-400">
                  ({t('home.pricing.billing.annualSave')})
                </span>
              </button>
            </div>
          </div>

          {/* Plan Type Tabs */}
          <div className="mb-12 flex justify-center gap-4">
            <Button
              onClick={() => setSelectedPlanType('solo')}
              variant={selectedPlanType === 'solo' ? 'default' : 'outline'}
              className={
                selectedPlanType === 'solo'
                  ? 'bg-teal-600 px-8 py-3 shadow-lg hover:bg-teal-700'
                  : 'bg-slate-700 px-8 py-3 text-slate-300 hover:bg-slate-600'
              }
            >
              {t('home.pricing.planTypes.solo')}
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
              {t('home.pricing.planTypes.team')}
            </Button>
          </div>

          {/* Pricing Cards - 3 per tab */}
          <div className="mb-16 grid gap-8 md:grid-cols-3">
            {selectedPlanType === 'solo' ? (
              <>
                {/* Free Solo Plan */}
                <Card className="border-2 border-slate-700 bg-slate-900 p-8 transition hover:border-teal-500">
                  <div className="mb-6 text-center">
                    <CardTitle className="mb-2 text-3xl font-bold text-white">
                      {t('home.pricing.plans.freeSolo.name')}
                    </CardTitle>
                    <p className="mb-4 text-slate-400">
                      {t('home.pricing.plans.freeSolo.description')}
                    </p>
                    <div className="mb-2 text-5xl font-bold text-white">
                      {t('home.pricing.plans.freeSolo.price')}
                      <span className="text-2xl text-slate-400">
                        {t('home.pricing.plans.freeSolo.period')}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-teal-400">
                      {t('home.pricing.plans.freeSolo.users')}
                    </p>
                  </div>

                  <Link href="/signup?plan=free" className="mb-6 block w-full">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">
                      {t('home.pricing.plans.freeSolo.cta')}
                    </Button>
                  </Link>

                  <div className="space-y-2 text-sm">
                    {t
                      .raw('home.pricing.plans.freeSolo.features')
                      .map((feature: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-slate-300"
                        >
                          <span className="font-bold text-teal-400">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    {t
                      .raw('home.pricing.plans.freeSolo.excluded')
                      .map((feature: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-slate-400"
                        >
                          <span className="font-bold text-slate-600">✗</span>
                          <span className="line-through">{feature}</span>
                        </div>
                      ))}
                  </div>
                </Card>

                {/* Solo Basic Plan */}
                <Card className="border-2 border-teal-600 bg-slate-900 p-8 transition hover:border-teal-500">
                  <div className="mb-6 text-center">
                    <CardTitle className="mb-2 text-3xl font-bold text-white">
                      {t('home.pricing.plans.soloBasic.name')}
                    </CardTitle>
                    <p className="mb-4 text-slate-400">
                      {t('home.pricing.plans.soloBasic.description')}
                    </p>
                    <div className="mb-2 text-5xl font-bold text-white">
                      {billingCycle === 'monthly'
                        ? t('home.pricing.plans.soloBasic.priceMonthly')
                        : t('home.pricing.plans.soloBasic.priceAnnual')}
                      <span className="text-2xl text-slate-400">
                        {t('home.pricing.plans.soloBasic.period')}
                      </span>
                    </div>
                    {billingCycle === 'annual' && (
                      <p className="text-sm text-teal-400">
                        {t('home.pricing.plans.soloBasic.annualBilling')}
                      </p>
                    )}
                    <p className="mt-1 text-sm font-medium text-teal-400">
                      {t('home.pricing.plans.soloBasic.users')}
                    </p>
                  </div>

                  <Link
                    href="/signup?plan=solo_basic"
                    className="mb-6 block w-full"
                  >
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">
                      {t('home.pricing.plans.soloBasic.cta')}
                    </Button>
                  </Link>

                  <div className="space-y-2 text-sm">
                    {t
                      .raw('home.pricing.plans.soloBasic.features')
                      .map((feature: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-slate-300"
                        >
                          <span className="font-bold text-teal-400">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    {t
                      .raw('home.pricing.plans.soloBasic.excluded')
                      .map((feature: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-slate-400"
                        >
                          <span className="font-bold text-slate-600">✗</span>
                          <span className="line-through">{feature}</span>
                        </div>
                      ))}
                  </div>
                </Card>

                {/* Solo Pro Plan */}
                <Card className="relative border-2 border-teal-500 bg-gradient-to-br from-teal-900 to-slate-900 p-8">
                  <div className="absolute right-8 top-0 rounded-b-lg bg-teal-500 px-4 py-1 text-sm font-bold text-white">
                    {t('home.pricing.plans.soloPro.badge')}
                  </div>

                  <div className="mb-6 text-center">
                    <CardTitle className="mb-2 text-3xl font-bold text-white">
                      {t('home.pricing.plans.soloPro.name')}
                    </CardTitle>
                    <p className="mb-4 text-slate-300">
                      {t('home.pricing.plans.soloPro.description')}
                    </p>
                    <div className="mb-2 text-5xl font-bold text-white">
                      {billingCycle === 'monthly'
                        ? t('home.pricing.plans.soloPro.priceMonthly')
                        : t('home.pricing.plans.soloPro.priceAnnual')}
                      <span className="text-2xl text-slate-400">
                        {t('home.pricing.plans.soloPro.period')}
                      </span>
                    </div>
                    {billingCycle === 'annual' && (
                      <p className="text-sm text-teal-400">
                        {t('home.pricing.plans.soloPro.annualBilling')}
                      </p>
                    )}
                    <p className="mt-1 text-sm font-medium text-teal-400">
                      {t('home.pricing.plans.soloPro.users')}
                    </p>
                  </div>

                  <Link
                    href="/signup?plan=solo_pro"
                    className="mb-6 block w-full"
                  >
                    <Button className="w-full bg-teal-500 shadow-lg hover:bg-teal-600">
                      {t('home.pricing.plans.soloPro.cta')}
                    </Button>
                  </Link>

                  <div className="space-y-2 text-sm">
                    {t
                      .raw('home.pricing.plans.soloPro.features')
                      .map((feature: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-white"
                        >
                          <span className="font-bold text-teal-400">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                  </div>
                </Card>
              </>
            ) : (
              <>
                {/* Team Basic Plan */}
                <Card className="border-2 border-slate-700 bg-slate-900 p-8 transition hover:border-teal-500">
                  <div className="mb-6 text-center">
                    <CardTitle className="mb-2 text-3xl font-bold text-white">
                      {t('home.pricing.plans.teamBasic.name')}
                    </CardTitle>
                    <p className="mb-4 text-slate-400">
                      {t('home.pricing.plans.teamBasic.description')}
                    </p>
                    <div className="mb-2 text-5xl font-bold text-white">
                      {billingCycle === 'monthly'
                        ? t('home.pricing.plans.teamBasic.priceMonthly')
                        : t('home.pricing.plans.teamBasic.priceAnnual')}
                      <span className="text-2xl text-slate-400">
                        {t('home.pricing.plans.teamBasic.period')}
                      </span>
                    </div>
                    {billingCycle === 'annual' && (
                      <p className="text-sm text-teal-400">
                        {t('home.pricing.plans.teamBasic.annualBilling')}
                      </p>
                    )}
                    <p className="mt-1 text-sm font-medium text-teal-400">
                      {t('home.pricing.plans.teamBasic.users')}
                    </p>
                  </div>

                  <Link
                    href="/signup?plan=team_basic"
                    className="mb-6 block w-full"
                  >
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">
                      {t('home.pricing.plans.teamBasic.cta')}
                    </Button>
                  </Link>

                  <div className="space-y-2 text-sm">
                    {t
                      .raw('home.pricing.plans.teamBasic.features')
                      .map((feature: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-slate-300"
                        >
                          <span className="font-bold text-teal-400">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    {t
                      .raw('home.pricing.plans.teamBasic.excluded')
                      .map((feature: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-slate-400"
                        >
                          <span className="font-bold text-slate-600">✗</span>
                          <span className="line-through">{feature}</span>
                        </div>
                      ))}
                  </div>
                </Card>

                {/* Team Pro Plan */}
                <Card className="relative border-2 border-teal-500 bg-gradient-to-br from-teal-900 to-slate-900 p-8">
                  <div className="absolute right-8 top-0 rounded-b-lg bg-teal-500 px-4 py-1 text-sm font-bold text-white">
                    {t('home.pricing.plans.teamPro.badge')}
                  </div>

                  <div className="mb-6 text-center">
                    <CardTitle className="mb-2 text-3xl font-bold text-white">
                      {t('home.pricing.plans.teamPro.name')}
                    </CardTitle>
                    <p className="mb-4 text-slate-300">
                      {t('home.pricing.plans.teamPro.description')}
                    </p>
                    <div className="mb-2 text-5xl font-bold text-white">
                      {billingCycle === 'monthly'
                        ? t('home.pricing.plans.teamPro.priceMonthly')
                        : t('home.pricing.plans.teamPro.priceAnnual')}
                      <span className="text-2xl text-slate-400">
                        {t('home.pricing.plans.teamPro.period')}
                      </span>
                    </div>
                    {billingCycle === 'annual' && (
                      <p className="text-sm text-teal-400">
                        {t('home.pricing.plans.teamPro.annualBilling')}
                      </p>
                    )}
                    <p className="mt-1 text-sm font-medium text-teal-400">
                      {t('home.pricing.plans.teamPro.users')}
                    </p>
                  </div>

                  <Link
                    href="/signup?plan=team_pro"
                    className="mb-6 block w-full"
                  >
                    <Button className="w-full bg-teal-500 shadow-lg hover:bg-teal-600">
                      {t('home.pricing.plans.teamPro.cta')}
                    </Button>
                  </Link>

                  <div className="space-y-2 text-sm">
                    {t
                      .raw('home.pricing.plans.teamPro.features')
                      .map((feature: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-white"
                        >
                          <span className="font-bold text-teal-400">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    {t
                      .raw('home.pricing.plans.teamPro.excluded')
                      .map((feature: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-slate-300"
                        >
                          <span className="font-bold text-slate-600">✗</span>
                          <span className="line-through">{feature}</span>
                        </div>
                      ))}
                  </div>
                </Card>

                {/* Enterprise Plan */}
                <Card className="border-2 border-purple-600 bg-slate-900 p-8 transition hover:border-purple-500">
                  <div className="mb-6 text-center">
                    <CardTitle className="mb-2 text-3xl font-bold text-white">
                      {t('home.pricing.plans.enterprise.name')}
                    </CardTitle>
                    <p className="mb-4 text-slate-400">
                      {t('home.pricing.plans.enterprise.description')}
                    </p>
                    <div className="mb-4 text-5xl font-bold text-white">
                      {t('home.pricing.plans.enterprise.price')}
                    </div>
                    <p className="text-sm font-medium text-teal-400">
                      {t('home.pricing.plans.enterprise.users')}
                    </p>
                  </div>

                  <Link href="/contact" className="mb-6 block w-full">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      {t('home.pricing.plans.enterprise.cta')}
                    </Button>
                  </Link>

                  <div className="space-y-2 text-sm">
                    {t
                      .raw('home.pricing.plans.enterprise.features')
                      .map((feature: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-slate-300"
                        >
                          <span className="font-bold text-purple-400">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                  </div>
                </Card>
              </>
            )}
          </div>

          {/* Feature Comparison Table - Comprehensive */}
          <Card className="mt-12 border-slate-700 bg-slate-900 p-8">
            <CardTitle className="mb-6 text-center text-2xl font-bold text-white">
              {selectedPlanType === 'solo' ? 'Solo Plans' : 'Team Plans'}{' '}
              Feature Comparison
            </CardTitle>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="px-2 py-3 font-semibold text-white">
                      Feature
                    </th>
                    <th className="px-2 py-3 text-center font-semibold text-white">
                      Status
                    </th>
                    {selectedPlanType === 'solo' ? (
                      <>
                        <th className="px-2 py-3 text-center font-semibold text-white">
                          Free Solo
                        </th>
                        <th className="px-2 py-3 text-center font-semibold text-white">
                          Solo Basic
                        </th>
                        <th className="px-2 py-3 text-center font-semibold text-white">
                          Solo Pro
                        </th>
                      </>
                    ) : (
                      <>
                        <th className="px-2 py-3 text-center font-semibold text-white">
                          Team Basic
                        </th>
                        <th className="px-2 py-3 text-center font-semibold text-white">
                          Team Pro
                        </th>
                        <th className="px-2 py-3 text-center font-semibold text-white">
                          Enterprise
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {/* Copy the full feature table from main home page */}
                  <tr className="hover:bg-slate-800">
                    <td className="px-2 py-3 text-slate-300">
                      Customer Management (CRM)
                    </td>
                    <td className="px-2 py-3 text-center">
                      <Badge className="border-0 bg-teal-900 text-xs text-teal-400">
                        ✓ Live
                      </Badge>
                    </td>
                    {selectedPlanType === 'solo' ? (
                      <>
                        <td className="px-2 py-3 text-center text-slate-400">
                          25
                        </td>
                        <td className="px-2 py-3 text-center text-slate-300">
                          100
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          ∞
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          500
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          ∞
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-purple-300">
                          ∞
                        </td>
                      </>
                    )}
                  </tr>
                  <tr className="hover:bg-slate-800">
                    <td className="px-2 py-3 text-slate-300">Jobs System</td>
                    <td className="px-2 py-3 text-center">
                      <Badge className="border-0 bg-teal-900 text-xs text-teal-400">
                        ✓ Live
                      </Badge>
                    </td>
                    {selectedPlanType === 'solo' ? (
                      <>
                        <td className="px-2 py-3 text-center text-slate-400">
                          3/mo
                        </td>
                        <td className="px-2 py-3 text-center text-slate-300">
                          50/mo
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          ∞
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          200/mo
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          ∞
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-purple-300">
                          ∞
                        </td>
                      </>
                    )}
                  </tr>
                  <tr className="hover:bg-slate-800">
                    <td className="px-2 py-3 text-slate-300">
                      Estimates/Quotes (PDF)
                    </td>
                    <td className="px-2 py-3 text-center">
                      <Badge className="border-0 bg-teal-900 text-xs text-teal-400">
                        ✓ Live
                      </Badge>
                    </td>
                    {selectedPlanType === 'solo' ? (
                      <>
                        <td className="px-2 py-3 text-center text-slate-400">
                          10/mo
                        </td>
                        <td className="px-2 py-3 text-center text-slate-300">
                          25/mo
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          ∞
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          100/mo
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          ∞
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-purple-300">
                          ∞
                        </td>
                      </>
                    )}
                  </tr>
                  <tr className="hover:bg-slate-800">
                    <td className="px-2 py-3 text-slate-300">
                      Job Calendar & Scheduling
                    </td>
                    <td className="px-2 py-3 text-center">
                      <Badge className="border-0 bg-teal-900 text-xs text-teal-400">
                        ✓ Live
                      </Badge>
                    </td>
                    {selectedPlanType === 'solo' ? (
                      <>
                        <td className="px-2 py-3 text-center text-slate-400">
                          ✓
                        </td>
                        <td className="px-2 py-3 text-center text-slate-300">
                          ✓
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          ✓
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          ✓
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          ✓
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-purple-300">
                          ✓
                        </td>
                      </>
                    )}
                  </tr>
                  <tr className="hover:bg-slate-800">
                    <td className="px-2 py-3 text-slate-300">
                      Team Size (Contractors + Employees)
                    </td>
                    <td className="px-2 py-3 text-center">
                      <Badge className="border-0 bg-teal-900 text-xs text-teal-400">
                        ✓ Live
                      </Badge>
                    </td>
                    {selectedPlanType === 'solo' ? (
                      <>
                        <td className="px-2 py-3 text-center text-slate-400">
                          1c+1e
                        </td>
                        <td className="px-2 py-3 text-center text-slate-300">
                          1c+6e
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          1c+∞e
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          3c+∞e
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          10c+∞e
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-purple-300">
                          ∞
                        </td>
                      </>
                    )}
                  </tr>
                  <tr className="hover:bg-slate-800">
                    <td className="px-2 py-3 text-slate-300">PDF Generation</td>
                    <td className="px-2 py-3 text-center">
                      <Badge className="border-0 bg-teal-900 text-xs text-teal-400">
                        ✓ Live
                      </Badge>
                    </td>
                    {selectedPlanType === 'solo' ? (
                      <>
                        <td className="px-2 py-3 text-center text-slate-400">
                          ✓
                        </td>
                        <td className="px-2 py-3 text-center text-slate-300">
                          ✓
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          ✓
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          ✓
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          ✓
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-purple-300">
                          ✓
                        </td>
                      </>
                    )}
                  </tr>
                  <tr className="hover:bg-slate-800">
                    <td className="px-2 py-3 text-slate-300">
                      Photo & Document Upload
                    </td>
                    <td className="px-2 py-3 text-center">
                      <Badge className="border-0 bg-teal-900 text-xs text-teal-400">
                        ✓ Live
                      </Badge>
                    </td>
                    {selectedPlanType === 'solo' ? (
                      <>
                        <td className="px-2 py-3 text-center text-slate-400">
                          50 MB
                        </td>
                        <td className="px-2 py-3 text-center text-slate-300">
                          500 MB
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          2 GB
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          5 GB
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          10 GB
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-purple-300">
                          ∞
                        </td>
                      </>
                    )}
                  </tr>
                  <tr className="hover:bg-slate-800">
                    <td className="px-2 py-3 text-slate-300">
                      Team Size (Contractors + Employees)
                    </td>
                    <td className="px-2 py-3 text-center">
                      <Badge className="border-0 bg-teal-900 text-xs text-teal-400">
                        ✓ Live
                      </Badge>
                    </td>
                    {selectedPlanType === 'solo' ? (
                      <>
                        <td className="px-2 py-3 text-center text-slate-400">
                          1c+1e
                        </td>
                        <td className="px-2 py-3 text-center text-slate-300">
                          1c+6e
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          1c+∞e
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          3c+∞e
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          10c+∞e
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-purple-300">
                          ∞
                        </td>
                      </>
                    )}
                  </tr>

                  {/* COMMUNICATION FEATURES - LIVE */}
                  <tr className="hover:bg-slate-800">
                    <td className="px-2 py-3 text-slate-300">
                      Two-Way SMS Messaging
                    </td>
                    <td className="px-2 py-3 text-center">
                      <Badge className="border-0 bg-teal-900 text-xs text-teal-400">
                        ✓ Live
                      </Badge>
                    </td>
                    {selectedPlanType === 'solo' ? (
                      <>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                        <td className="px-2 py-3 text-center text-slate-300">
                          100/mo
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          500/mo
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          1K/mo
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          2.5K/mo
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-purple-300">
                          ∞
                        </td>
                      </>
                    )}
                  </tr>
                  <tr className="hover:bg-slate-800">
                    <td className="px-2 py-3 text-slate-300">
                      Automated Notifications (Email/SMS)
                    </td>
                    <td className="px-2 py-3 text-center">
                      <Badge className="border-0 bg-teal-900 text-xs text-teal-400">
                        ✓ Live
                      </Badge>
                    </td>
                    {selectedPlanType === 'solo' ? (
                      <>
                        <td className="px-2 py-3 text-center text-slate-400">
                          50/mo
                        </td>
                        <td className="px-2 py-3 text-center text-slate-300">
                          100/mo
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          ∞
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          ∞
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          ∞
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-purple-300">
                          ∞
                        </td>
                      </>
                    )}
                  </tr>
                  <tr className="hover:bg-slate-800">
                    <td className="px-2 py-3 text-slate-300">
                      Job Chat System
                    </td>
                    <td className="px-2 py-3 text-center">
                      <Badge className="border-0 bg-teal-900 text-xs text-teal-400">
                        ✓ Live
                      </Badge>
                    </td>
                    {selectedPlanType === 'solo' ? (
                      <>
                        <td className="px-2 py-3 text-center text-slate-400">
                          Basic
                        </td>
                        <td className="px-2 py-3 text-center text-slate-300">
                          ✓
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          ✓
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          ✓
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          Advanced
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-purple-300">
                          Advanced
                        </td>
                      </>
                    )}
                  </tr>

                  {/* IN DEVELOPMENT */}
                  <tr className="hover:bg-slate-800">
                    <td className="px-2 py-3 text-slate-300">
                      Drag-and-Drop Calendar
                    </td>
                    <td className="px-2 py-3 text-center">
                      <Badge className="border-0 bg-yellow-900 text-xs text-yellow-400">
                        🔨 Dev
                      </Badge>
                    </td>
                    {selectedPlanType === 'solo' ? (
                      <>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                        <td className="px-2 py-3 text-center text-slate-300">
                          ✓
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          ✓
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          ✓
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          ✓
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-purple-300">
                          ✓
                        </td>
                      </>
                    )}
                  </tr>
                  <tr className="hover:bg-slate-800">
                    <td className="px-2 py-3 text-slate-300">
                      GPS & Route Optimization
                    </td>
                    <td className="px-2 py-3 text-center">
                      <Badge className="border-0 bg-yellow-900 text-xs text-yellow-400">
                        🔨 Dev
                      </Badge>
                    </td>
                    {selectedPlanType === 'solo' ? (
                      <>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          ✓
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          ✓
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-white">
                          ✓
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-purple-300">
                          ✓
                        </td>
                      </>
                    )}
                  </tr>

                  {/* COMING SOON */}
                  <tr className="hover:bg-slate-800">
                    <td className="px-2 py-3 text-red-300">Invoicing System</td>
                    <td className="px-2 py-3 text-center">
                      <Badge className="border-0 bg-red-900 text-xs text-red-400">
                        ⏳ Soon
                      </Badge>
                    </td>
                    {selectedPlanType === 'solo' ? (
                      <>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                        <td className="px-2 py-3 text-center text-red-300">
                          50/mo
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-red-200">
                          ∞
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-3 text-center font-semibold text-red-200">
                          ∞
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-red-200">
                          ∞
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-purple-200">
                          ∞
                        </td>
                      </>
                    )}
                  </tr>
                  <tr className="hover:bg-slate-800">
                    <td className="px-2 py-3 text-red-300">
                      Payment Processing (Stripe/Square/PayPal)
                    </td>
                    <td className="px-2 py-3 text-center">
                      <Badge className="border-0 bg-red-900 text-xs text-red-400">
                        ⏳ Soon
                      </Badge>
                    </td>
                    {selectedPlanType === 'solo' ? (
                      <>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                        <td className="px-2 py-3 text-center text-red-300">
                          2.9% fee
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-red-200">
                          2.9% fee
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-3 text-center font-semibold text-red-200">
                          2.7% fee
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-red-200">
                          2.5% fee
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-purple-200">
                          2.3% fee
                        </td>
                      </>
                    )}
                  </tr>
                  <tr className="hover:bg-slate-800">
                    <td className="px-2 py-3 text-red-300">
                      Mobile App (Native iOS/Android)
                    </td>
                    <td className="px-2 py-3 text-center">
                      <Badge className="border-0 bg-red-900 text-xs text-red-400">
                        ⏳ Soon
                      </Badge>
                    </td>
                    {selectedPlanType === 'solo' ? (
                      <>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                        <td className="px-2 py-3 text-center text-red-300">
                          View only
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-red-200">
                          View only
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-3 text-center font-semibold text-red-200">
                          Full access
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-red-200">
                          Full access
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-purple-200">
                          Full access
                        </td>
                      </>
                    )}
                  </tr>
                  <tr className="hover:bg-slate-800">
                    <td className="px-2 py-3 text-red-300">
                      QuickBooks Integration
                    </td>
                    <td className="px-2 py-3 text-center">
                      <Badge className="border-0 bg-red-900 text-xs text-red-400">
                        ⏳ Soon
                      </Badge>
                    </td>
                    {selectedPlanType === 'solo' ? (
                      <>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-3 text-center text-red-300">
                          ✓
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-red-200">
                          ✓
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-purple-200">
                          ✓
                        </td>
                      </>
                    )}
                  </tr>
                  <tr className="hover:bg-slate-800">
                    <td className="px-2 py-3 text-red-300">
                      White Label Options
                    </td>
                    <td className="px-2 py-3 text-center">
                      <Badge className="border-0 bg-red-900 text-xs text-red-400">
                        ⏳ Soon
                      </Badge>
                    </td>
                    {selectedPlanType === 'solo' ? (
                      <>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-purple-200">
                          ✓
                        </td>
                      </>
                    )}
                  </tr>
                  <tr className="hover:bg-slate-800">
                    <td className="px-2 py-3 text-red-300">
                      Dedicated Account Manager
                    </td>
                    <td className="px-2 py-3 text-center">
                      <Badge className="border-0 bg-red-900 text-xs text-red-400">
                        ⏳ Soon
                      </Badge>
                    </td>
                    {selectedPlanType === 'solo' ? (
                      <>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-purple-200">
                          ✓
                        </td>
                      </>
                    )}
                  </tr>
                  <tr className="hover:bg-slate-800">
                    <td className="px-2 py-3 text-red-300">
                      24/7 Priority Support
                    </td>
                    <td className="px-2 py-3 text-center">
                      <Badge className="border-0 bg-red-900 text-xs text-red-400">
                        ⏳ Soon
                      </Badge>
                    </td>
                    {selectedPlanType === 'solo' ? (
                      <>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-3 text-center text-slate-600">
                          —
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-red-200">
                          ✓
                        </td>
                        <td className="px-2 py-3 text-center font-semibold text-purple-200">
                          ✓
                        </td>
                      </>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
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
