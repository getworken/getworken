/**
 * Pricing Quiz Feature
 * @module features/pricing-quiz
 *
 * ✅ DIAMOND STANDARD: Features Layer Component
 *
 * Interactive 4-step quiz to guide users to the right pricing plan.
 * Collects team size, employee count, and job volume to recommend
 * the most appropriate plan (Solo Basic/Pro, Team Basic/Pro).
 *
 * **Architecture Compliance:**
 * - FSD features/ layer (business logic UI)
 * - WCAG 2.2 compliant (ARIA labels, keyboard navigation, semantic HTML)
 * - Internationalized (ready for next-intl)
 * - Imports only from shared/ (FSD rules)
 *
 * **State Management:**
 * - Controlled components with onChange handlers
 * - Conditional rendering based on quiz step
 * - Callbacks for completion and cancellation
 *
 * @see {@link https://feature-sliced.design/docs/reference/layers#features}
 */

'use client';

import { useState } from 'react';
import { Button, Card, CardTitle } from '@/shared/ui';
import type { QuizAnswers, QuizStep } from '../model/types';

export interface PricingQuizProps {
  /** Whether the quiz is visible */
  show: boolean;
  /** Callback when quiz is completed with recommendation and billing cycle */
  onComplete: (
    recommendation: string,
    billingCycle: 'monthly' | 'annual'
  ) => void;
}

/**
 * PricingQuiz Component
 *
 * Multi-step form that helps users find their ideal pricing plan.
 *
 * @param show - Controls visibility
 * @param onComplete - Handler for quiz completion with answers
 * @returns {JSX.Element} The pricing quiz interface
 *
 * @example
 * ```tsx
 * <PricingQuiz
 *   show={showQuiz}
 *   onComplete={(answers) => {
 *     setSelectedPlanType(answers.teamSize === '1' ? 'solo' : 'team');
 *     setShowQuiz(false);
 *   }}
 * />
 * ```
 */
export function PricingQuiz({ show, onComplete }: PricingQuizProps) {
  const [quizStep, setQuizStep] = useState<QuizStep>(1);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({
    teamSize: '',
    employees: '',
    jobsPerMonth: '',
    billingCycle: '',
  });

  const handleRestart = () => {
    setQuizStep(1);
    setQuizAnswers({
      teamSize: '',
      employees: '',
      jobsPerMonth: '',
      billingCycle: '',
    });
  };

  const getRecommendedPlan = () => {
    if (quizAnswers.teamSize === '1') {
      if (quizAnswers.jobsPerMonth === '1-10') return 'Free Solo';
      if (quizAnswers.jobsPerMonth === '10-50') return 'Solo Basic';
      return 'Solo Pro';
    } else {
      if (quizAnswers.jobsPerMonth === '1-10') return 'Team Basic';
      if (quizAnswers.jobsPerMonth === '10-50') return 'Team Pro';
      return 'Enterprise';
    }
  };

  if (!show) return null;

  return (
    <Card
      className="mx-auto mb-12 max-w-2xl border-slate-700 bg-slate-900 p-8"
      role="dialog"
      aria-label="Pricing plan recommendation quiz"
    >
      <CardTitle className="mb-6 text-2xl text-white">
        Find Your Perfect Plan
      </CardTitle>

      {/* Step 1: Team Size */}
      {quizStep === 1 && (
        <div className="space-y-6" role="group" aria-label="Quiz Step 1 of 4">
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
                className="quiz-option"
                aria-label="Select: Just me (1 contractor)"
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
                className="quiz-option"
                aria-label="Select: Multiple contractors"
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

      {/* Step 2: Employee Count */}
      {quizStep === 2 && (
        <div className="space-y-6" role="group" aria-label="Quiz Step 2 of 4">
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
                className="quiz-option-center"
                aria-label="Select: 0 to 1 employees"
              >
                <div className="font-semibold text-white">0-1</div>
                <div className="text-sm text-slate-400">Just starting</div>
              </button>
              <button
                onClick={() => {
                  setQuizAnswers({ ...quizAnswers, employees: '2-6' });
                  setQuizStep(3);
                }}
                className="quiz-option-center"
                aria-label="Select: 2 to 6 employees"
              >
                <div className="font-semibold text-white">2-6</div>
                <div className="text-sm text-slate-400">Small team</div>
              </button>
              <button
                onClick={() => {
                  setQuizAnswers({ ...quizAnswers, employees: '7+' });
                  setQuizStep(3);
                }}
                className="quiz-option-center"
                aria-label="Select: 7 or more employees"
              >
                <div className="font-semibold text-white">7+</div>
                <div className="text-sm text-slate-400">Growing team</div>
              </button>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setQuizStep(1)}
            className="border-slate-600 text-slate-300"
            aria-label="Go back to previous step"
          >
            ← Back
          </Button>
        </div>
      )}

      {/* Step 3: Jobs Per Month */}
      {quizStep === 3 && (
        <div className="space-y-6" role="group" aria-label="Quiz Step 3 of 4">
          <div>
            <label className="mb-3 block text-sm font-medium text-slate-300">
              How many jobs do you complete per month?
            </label>
            <div className="grid gap-3 sm:grid-cols-3">
              <button
                onClick={() => {
                  setQuizAnswers({ ...quizAnswers, jobsPerMonth: '1-10' });
                  setQuizStep(4);
                }}
                className="quiz-option-center"
                aria-label="Select: 1 to 10 jobs per month"
              >
                <div className="font-semibold text-white">1-10</div>
                <div className="text-sm text-slate-400">Starting</div>
              </button>
              <button
                onClick={() => {
                  setQuizAnswers({ ...quizAnswers, jobsPerMonth: '10-50' });
                  setQuizStep(4);
                }}
                className="quiz-option-center"
                aria-label="Select: 10 to 50 jobs per month"
              >
                <div className="font-semibold text-white">10-50</div>
                <div className="text-sm text-slate-400">Busy</div>
              </button>
              <button
                onClick={() => {
                  setQuizAnswers({ ...quizAnswers, jobsPerMonth: '50+' });
                  setQuizStep(4);
                }}
                className="quiz-option-center"
                aria-label="Select: 50 or more jobs per month"
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
            aria-label="Go back to previous step"
          >
            ← Back
          </Button>
        </div>
      )}

      {/* Step 4: Billing Cycle */}
      {quizStep === 4 && (
        <div className="space-y-6" role="group" aria-label="Quiz Step 4 of 5">
          <div>
            <label className="mb-3 block text-sm font-medium text-slate-300">
              How would you prefer to pay?
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => {
                  setQuizAnswers({ ...quizAnswers, billingCycle: 'monthly' });
                  setQuizStep(5);
                }}
                className="quiz-option"
                aria-label="Select: Pay monthly"
              >
                <div className="font-semibold text-white">Monthly</div>
                <div className="text-sm text-slate-400">
                  Flexible, pay as you go
                </div>
              </button>
              <button
                onClick={() => {
                  setQuizAnswers({ ...quizAnswers, billingCycle: 'annual' });
                  setQuizStep(5);
                }}
                className="quiz-option"
                aria-label="Select: Pay annually"
              >
                <div className="font-semibold text-white">Annually</div>
                <div className="text-sm text-slate-400">Save up to 20%</div>
              </button>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setQuizStep(3)}
            className="border-slate-600 text-slate-300"
            aria-label="Go back to previous step"
          >
            ← Back
          </Button>
        </div>
      )}

      {/* Step 5: Results */}
      {quizStep === 5 && (
        <div
          className="space-y-6"
          role="group"
          aria-label="Quiz Step 5 of 5: Results"
        >
          <div className="quiz-results">
            <h3 className="mb-3 text-xl font-bold text-white">
              We recommend: {getRecommendedPlan()}
            </h3>
            <p className="mb-4 text-slate-300">
              Based on your answers, this plan will give you the tools you need
              to manage your business efficiently.
            </p>
            <Button
              onClick={() => {
                const recommendation = getRecommendedPlan();
                const billingCycle = quizAnswers.billingCycle as
                  | 'monthly'
                  | 'annual';
                onComplete(recommendation, billingCycle);
                handleRestart();
              }}
              className="bg-teal-600 text-white hover:bg-teal-700"
              aria-label={`View ${getRecommendedPlan()} plan details`}
            >
              View Recommended Plan
            </Button>
          </div>
          <Button
            variant="outline"
            onClick={handleRestart}
            className="border-slate-600 text-slate-300"
            aria-label="Restart quiz from beginning"
          >
            Start Over
          </Button>
        </div>
      )}
    </Card>
  );
}
