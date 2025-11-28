/**
 * Pricing Quiz Types
 * @module features/pricing-quiz/model
 *
 * ✅ DIAMOND STANDARD: Features Layer Types
 *
 * Type definitions for the interactive pricing quiz feature.
 */

/**
 * Quiz answers collected from user input
 */
export interface QuizAnswers {
  /** Number of contractors in the business (as string for form handling) */
  teamSize: string;
  /** Number of employees (as string for form handling) */
  employees: string;
  /** Number of jobs completed per month (as string for form handling) */
  jobsPerMonth: string;
  /** Preferred billing cycle (monthly or annual) */
  billingCycle: string;
}

/**
 * Quiz step number (1-5)
 */
export type QuizStep = 1 | 2 | 3 | 4 | 5;

/**
 * Recommended plan type based on quiz answers
 */
export type RecommendedPlan =
  | 'free-solo'
  | 'solo-basic'
  | 'solo-pro'
  | 'team-basic'
  | 'team-pro'
  | 'enterprise';
