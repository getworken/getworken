/**
 * Home Page - Diamond Standard Refactored
 * @module pages/home
 *
 * ✅ DIAMOND STANDARD v2.0 COMPLIANT
 *
 * Complete home page using Feature-Sliced Design architecture.
 * Composed of widgets, features, and entities with clean separation of concerns.
 *
 * Architecture:
 * - Widgets: HomeHeader, HomeHero, HomeStats, HomeFeatures, HomeCTA, HomeFooter
 * - Features: PricingQuiz, BillingToggle, PlanTypeSelector
 * - Widgets: PricingCardsGrid, FeatureComparisonTable
 * - Entities: PricingCard (composed within widgets)
 *
 * State Management: Minimal - billing cycle and plan type selection
 */

'use client';

import { useState } from 'react';
import type { BillingCycle, PlanType } from '@/entities/pricing-card';

// Widgets Layer
import { HomeHeader } from '@/widgets/home-header';
import { HomeHero } from '@/widgets/home-hero';
import { HomeFeatures } from '@/widgets/home-features';
import { PricingCardsGrid } from '@/widgets/pricing-cards-grid';
import { FeatureComparisonTable } from '@/widgets/feature-comparison-table';
import { HomeCTA } from '@/widgets/home-cta';
import { HomeRoadmap } from '@/widgets/home-roadmap';
import { HomeFooter } from '@/widgets/home-footer';

// Features Layer
import { PricingQuiz } from '@/features/pricing-quiz';
import { BillingToggle } from '@/features/billing-toggle';
import { PlanTypeSelector } from '@/features/plan-type-selector';
import { WaitlistModal } from '@/features/waitlist-modal';

/**
 * Home Page Component
 *
 * ✅ DIAMOND STANDARD: Pages layer - minimal logic, pure composition
 *
 * Composes the complete home page from widgets, features, and entities.
 * Manages local state for pricing configuration (billing cycle, plan type)
 * and quiz recommendation logic.
 *
 * State Management:
 * - billingCycle: Current selected billing period (monthly/annual)
 * - selectedPlanType: Current selected plan category (solo/team)
 * - quizRecommendation: Recommended plan name from quiz completion
 * - quizBillingCycle: Billing cycle selected during quiz (for conditional highlighting)
 * - showQuiz: Controls quiz modal visibility
 *
 * Features:
 * - Interactive pricing quiz with 5-step flow
 * - Conditional plan highlighting based on quiz results
 * - Billing cycle and plan type persistence across user exploration
 * - Recommendation only displays when current view matches quiz preferences
 *
 * @returns {JSX.Element} Complete home page with pricing section
 *
 * @example
 * ```tsx
 * // Rendered from app/page.tsx:
 * export { default } from '@/pages/home';
 * ```
 *
 * @see {@link file://src/widgets/home-header}
 * @see {@link file://src/widgets/home-hero}
 * @see {@link file://src/features/pricing-quiz}
 * @see {@link file://src/widgets/pricing-cards-grid}
 */
export default function HomePage() {
  // State: Billing and plan selection
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [selectedPlanType, setSelectedPlanType] = useState<PlanType>('solo');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizRecommendation, setQuizRecommendation] = useState<string | null>(
    null
  );
  const [quizBillingCycle, setQuizBillingCycle] = useState<BillingCycle | null>(
    null
  );
  const [showWaitlist, setShowWaitlist] = useState(false);

  /**
   * Handles quiz completion and applies recommendations
   *
   * Sets the quiz results, automatically switches to the recommended
   * plan type (solo/team) and billing cycle. Stores both the recommendation
   * and billing preference for conditional highlighting logic.
   *
   * @param recommendation - Name of the recommended plan (e.g., "Team Pro")
   * @param billingCycle - User's billing preference from quiz (monthly/annual)
   */
  const handleQuizComplete = (
    recommendation: string,
    billingCycle: 'monthly' | 'annual'
  ) => {
    setShowQuiz(false);
    setQuizRecommendation(recommendation);
    setQuizBillingCycle(billingCycle);

    // Set the billing cycle preference from quiz
    setBillingCycle(billingCycle);

    // Automatically switch to the correct plan type based on recommendation
    if (
      recommendation.toLowerCase().includes('team') ||
      recommendation.toLowerCase().includes('enterprise')
    ) {
      setSelectedPlanType('team');
    } else {
      setSelectedPlanType('solo');
    }

    // Scroll to the specific recommended pricing card after a brief delay
    setTimeout(() => {
      // Convert plan name to ID format (e.g., "Solo Pro" -> "plan-solo-pro")
      const planId = `plan-${recommendation.toLowerCase().replace(/\s+/g, '-')}`;
      const recommendedCard = document.getElementById(planId);
      const offset = 100; // Offset from top to show the recommendation banner

      if (recommendedCard) {
        const elementPosition = recommendedCard.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen">
      {/* Header Widget */}
      <HomeHeader onWaitlistClick={() => setShowWaitlist(true)} />

      {/* Hero Widget */}
      <HomeHero onWaitlistClick={() => setShowWaitlist(true)} />

      {/* Features Widget */}
      <HomeFeatures />

      {/* Pricing Section - Diamond Standard Composition */}
      <section id="pricing" className="border-t border-border py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="mb-8 text-center md:mb-12">
            <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl md:mb-4 md:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mb-6 text-lg text-muted-foreground sm:text-xl md:mb-8">
              Choose the plan that fits your business needs
            </p>
          </div>

          {/* Quiz Recommendation Banner */}
          {quizRecommendation && !showQuiz && (
            <div className="mb-6 flex justify-center md:mb-8">
              <div className="rounded-lg border-2 border-teal-500 bg-teal-900/30 px-4 py-3 text-center sm:px-6 sm:py-4 md:px-8">
                <div className="mb-2 flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2">
                  <span className="text-xl sm:text-2xl">🎯</span>
                  <span className="text-base font-semibold text-white sm:text-lg">
                    Quiz Result: We recommend {quizRecommendation}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setQuizRecommendation(null);
                    setQuizBillingCycle(null);
                    setShowQuiz(true);
                  }}
                  className="text-xs text-teal-300 underline hover:text-teal-200 sm:text-sm"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          )}

          {/* Pricing Quiz Feature */}
          {showQuiz && (
            <div className="mb-8 md:mb-12">
              <PricingQuiz show={showQuiz} onComplete={handleQuizComplete} />
            </div>
          )}

          {!showQuiz && !quizRecommendation && (
            <div className="mb-6 flex justify-center md:mb-8">
              <button
                onClick={() => setShowQuiz(true)}
                className="w-full rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 sm:w-auto sm:text-base"
              >
                🎯 Take Our Quiz - Find Your Perfect Plan
              </button>
            </div>
          )}

          {/* Billing Toggle Feature */}
          <div className="mb-6 flex justify-center md:mb-8">
            <BillingToggle value={billingCycle} onChange={setBillingCycle} />
          </div>

          {/* Plan Type Selector Feature - Mobile Above, Desktop Below */}
          <div className="mb-6 flex justify-center md:hidden">
            <PlanTypeSelector
              value={selectedPlanType}
              onChange={setSelectedPlanType}
            />
          </div>

          {/* Pricing Cards Grid Widget */}
          <div id="pricing-cards" className="mb-8 md:mb-12">
            <PricingCardsGrid
              planType={selectedPlanType}
              billingCycle={billingCycle}
              highlightedPlan={
                quizRecommendation && billingCycle === quizBillingCycle
                  ? quizRecommendation
                  : null
              }
              onCtaClick={() => setShowWaitlist(true)}
            />
          </div>

          {/* Plan Type Selector Feature - Desktop Below */}
          <div className="mb-8 hidden justify-center md:mb-12 md:flex">
            <PlanTypeSelector
              value={selectedPlanType}
              onChange={setSelectedPlanType}
            />
          </div>

          {/* Feature Comparison Table Widget */}
          <FeatureComparisonTable planType={selectedPlanType} />
        </div>
      </section>

      {/* CTA, Roadmap & Footer - Unified gradient background */}
      <div className="relative">
        {/* Unified gradient backdrop - artistic shape spanning all three sections */}
        <div
          className="absolute left-1/2 top-0 -z-10 h-full w-[90%] -translate-x-1/2"
          style={{
            background:
              'radial-gradient(ellipse 120% 60% at 50% 40%, hsl(173, 58%, 39%) 0%, hsl(173, 58%, 39%) 20%, hsl(173, 45%, 35%) 40%, transparent 80%)',
            filter: 'blur(80px)',
            opacity: 0.4,
          }}
          aria-hidden="true"
        />

        <HomeCTA onWaitlistClick={() => setShowWaitlist(true)} />
        <HomeRoadmap />
        <HomeFooter onWaitlistClick={() => setShowWaitlist(true)} />
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={showWaitlist}
        onClose={() => setShowWaitlist(false)}
      />
    </div>
  );
}
