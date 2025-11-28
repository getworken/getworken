/**
 * @fileoverview Unit tests for PricingCard component
 * @module entities/pricing-card/ui
 */

import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { PricingCard } from './PricingCard';
import {
  freeSoloPlan,
  soloBasicPlan,
  soloProPlan,
  enterprisePlan,
} from '../model/planData';

describe('PricingCard', () => {
  describe('Free Solo Plan', () => {
    it('renders free plan correctly', () => {
      render(<PricingCard plan={freeSoloPlan} billingCycle="monthly" />);

      expect(screen.getByText('Free Solo')).toBeInTheDocument();
      expect(
        screen.getByText('Perfect for getting started')
      ).toBeInTheDocument();
      expect(screen.getByText('$0')).toBeInTheDocument();
      expect(screen.getByText('1 contractor + 1 employee')).toBeInTheDocument();
      expect(screen.getByText('Get Started Free')).toBeInTheDocument();
    });

    it('displays included features', () => {
      render(<PricingCard plan={freeSoloPlan} billingCycle="monthly" />);

      expect(screen.getByText('3 Jobs/month')).toBeInTheDocument();
      expect(screen.getByText('10 Estimates/month')).toBeInTheDocument();
      expect(screen.getByText('25 Customers')).toBeInTheDocument();
    });

    it('displays excluded features with strikethrough', () => {
      render(<PricingCard plan={freeSoloPlan} billingCycle="monthly" />);

      const smsFeature = screen.getByText('SMS Messaging');
      expect(smsFeature).toHaveClass('line-through');

      const gpsFeature = screen.getByText('GPS Routing');
      expect(gpsFeature).toHaveClass('line-through');
    });
  });

  describe('Solo Basic Plan', () => {
    it('shows monthly price when billing cycle is monthly', () => {
      render(<PricingCard plan={soloBasicPlan} billingCycle="monthly" />);

      expect(screen.getByText('$49')).toBeInTheDocument();
      expect(
        screen.queryByText('Billed annually at $468')
      ).not.toBeInTheDocument();
    });

    it('shows annual price when billing cycle is annual', () => {
      render(<PricingCard plan={soloBasicPlan} billingCycle="annual" />);

      expect(screen.getByText('$39')).toBeInTheDocument();
      expect(screen.getByText('Billed annually at $468')).toBeInTheDocument();
    });

    it('has correct CTA link', () => {
      render(<PricingCard plan={soloBasicPlan} billingCycle="monthly" />);

      const ctaButton = screen.getByText('Start Free Trial');
      const link = ctaButton.closest('a');
      expect(link).toHaveAttribute('href', '/signup?plan=solo_basic');
    });
  });

  describe('Solo Pro Plan (Featured)', () => {
    it('displays featured badge', () => {
      render(<PricingCard plan={soloProPlan} billingCycle="monthly" />);

      expect(screen.getByText('MOST POPULAR')).toBeInTheDocument();
    });

    it('applies featured styling', () => {
      const { container } = render(
        <PricingCard plan={soloProPlan} billingCycle="monthly" />
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('pricing-card-featured');
    });

    it('shows all unlimited features', () => {
      render(<PricingCard plan={soloProPlan} billingCycle="monthly" />);

      expect(screen.getByText('Unlimited Jobs')).toBeInTheDocument();
      expect(screen.getByText('Unlimited Estimates')).toBeInTheDocument();
      expect(screen.getByText('Unlimited Customers')).toBeInTheDocument();
    });

    it('has no excluded features', () => {
      render(<PricingCard plan={soloProPlan} billingCycle="monthly" />);

      const excludedFeatures = screen.queryAllByText(/✗/);
      expect(excludedFeatures).toHaveLength(0);
    });
  });

  describe('Enterprise Plan', () => {
    it('displays custom pricing text', () => {
      render(<PricingCard plan={enterprisePlan} billingCycle="monthly" />);

      expect(screen.getByText('Custom')).toBeInTheDocument();
      expect(screen.queryByText('/month')).not.toBeInTheDocument();
    });

    it('applies enterprise styling', () => {
      const { container } = render(
        <PricingCard plan={enterprisePlan} billingCycle="monthly" />
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('pricing-card-enterprise');
    });

    it('shows Contact Sales CTA', () => {
      render(<PricingCard plan={enterprisePlan} billingCycle="monthly" />);

      const ctaButton = screen.getByText('Contact Sales');
      const link = ctaButton.closest('a');
      expect(link).toHaveAttribute('href', '/contact');
    });

    it('uses purple checkmarks for features', () => {
      const { container } = render(
        <PricingCard plan={enterprisePlan} billingCycle="monthly" />
      );

      const checkmarks = container.querySelectorAll('.text-purple-400');
      expect(checkmarks.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<PricingCard plan={soloBasicPlan} billingCycle="monthly" />);

      const heading = screen.getByRole('heading', { name: 'Solo Basic' });
      expect(heading).toBeInTheDocument();
    });

    it('CTA button is accessible', () => {
      render(<PricingCard plan={soloBasicPlan} billingCycle="monthly" />);

      const button = screen.getByRole('link', { name: 'Start Free Trial' });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('applies custom className prop', () => {
      const { container } = render(
        <PricingCard
          plan={soloBasicPlan}
          billingCycle="monthly"
          className="custom-class"
        />
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-class');
    });
  });
});
