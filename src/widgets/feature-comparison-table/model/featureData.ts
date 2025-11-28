/**
 * @fileoverview Feature comparison data
 * @module widgets/feature-comparison-table/model
 */

import type { FeatureRow } from './types';

/**
 * Complete feature comparison data
 *
 * Format: [Free Solo / Team Basic, Solo Basic / Team Pro, Solo Pro / Enterprise]
 */
export const featureData: FeatureRow[] = [
  // ============================================
  // CUSTOMER MANAGEMENT
  // ============================================

  // CRM Core
  {
    name: 'Customer Management (CRM)',
    section: 'Customer Management',
    subsection: 'CRM Core',
    status: 'live',
    soloValues: ['25', '100', '∞'],
    teamValues: ['500', '∞', '∞'],
  },
  {
    name: 'Contact Management',
    section: 'Customer Management',
    subsection: 'CRM Core',
    status: 'soon',
    soloValues: ['✓', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Client Segmentation',
    section: 'Customer Management',
    subsection: 'CRM Core',
    status: 'soon',
    soloValues: ['Basic', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },

  // Client Portal & Self-Service
  {
    name: 'Client Hub',
    section: 'Customer Management',
    subsection: 'Client Portal & Self-Service',
    status: 'soon',
    soloValues: ['Basic', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Client Portal',
    section: 'Customer Management',
    subsection: 'Client Portal & Self-Service',
    status: 'soon',
    soloValues: ['View Only', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Online Booking',
    section: 'Customer Management',
    subsection: 'Client Portal & Self-Service',
    status: 'soon',
    soloValues: ['5/mo', '25/mo', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Requests',
    section: 'Customer Management',
    subsection: 'Client Portal & Self-Service',
    status: 'soon',
    soloValues: ['10/mo', '50/mo', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },

  // Lead Management
  {
    name: 'Lead Management',
    section: 'Customer Management',
    subsection: 'Lead Management',
    status: 'soon',
    soloValues: ['✓', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Lead Scoring',
    section: 'Customer Management',
    subsection: 'Lead Management',
    status: 'soon',
    soloValues: ['Basic', '✓', 'Advanced'],
    teamValues: ['✓', '✓', '✓'],
  },

  // Communication & Automation
  {
    name: 'Automated Client Notifications',
    section: 'Customer Management',
    subsection: 'Communication & Automation',
    status: 'soon',
    soloValues: ['50/mo', '100/mo', '∞'],
    teamValues: ['∞', '∞', '∞'],
  },
  {
    name: 'Two-Way Text Messaging',
    section: 'Customer Management',
    subsection: 'Communication & Automation',
    status: 'soon',
    soloValues: ['25/mo', '100/mo', '500/mo'],
    teamValues: ['1K/mo', '2.5K/mo', '∞'],
  },
  {
    name: 'Custom Automation Builder',
    section: 'Customer Management',
    subsection: 'Communication & Automation',
    status: 'soon',
    soloValues: ['-', '5', '✓'],
    teamValues: [null, '✓', '✓'],
  },
  {
    name: 'Receptionist',
    section: 'Customer Management',
    subsection: 'Communication & Automation',
    status: 'soon',
    soloValues: ['-', '-', '✓'],
    teamValues: [null, '✓', '✓'],
  },

  // ============================================
  // MARKETING
  // ============================================

  // Email & SMS Marketing
  {
    name: 'Email Marketing',
    section: 'Marketing',
    subsection: 'Email & SMS Marketing',
    status: 'soon',
    soloValues: ['50/mo', '500/mo', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'SMS Marketing',
    section: 'Marketing',
    subsection: 'Email & SMS Marketing',
    status: 'soon',
    soloValues: ['25/mo', '100/mo', '500/mo'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Transactional Emails',
    section: 'Marketing',
    subsection: 'Email & SMS Marketing',
    status: 'soon',
    soloValues: ['✓', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },

  // Campaign Management
  {
    name: 'Campaign Management',
    section: 'Marketing',
    subsection: 'Campaign Management',
    status: 'soon',
    soloValues: ['1', '5', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Marketing Automation',
    section: 'Marketing',
    subsection: 'Campaign Management',
    status: 'soon',
    soloValues: ['-', '3', '✓'],
    teamValues: [null, '✓', '✓'],
  },
  {
    name: 'A/B Testing',
    section: 'Marketing',
    subsection: 'Campaign Management',
    status: 'soon',
    soloValues: ['-', '5 tests', '✓'],
    teamValues: [null, '✓', '✓'],
  },
  {
    name: 'Marketing Suite',
    section: 'Marketing',
    subsection: 'Campaign Management',
    status: 'soon',
    soloValues: ['-', 'Basic', '✓'],
    teamValues: [null, '✓', '✓'],
  },

  // Website Tools
  {
    name: 'Landing Pages',
    section: 'Marketing',
    subsection: 'Website Tools',
    status: 'soon',
    soloValues: ['1', '5', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Website Builder',
    section: 'Marketing',
    subsection: 'Website Tools',
    status: 'soon',
    soloValues: ['Basic', '✓', 'Advanced'],
    teamValues: ['✓', '✓', '✓'],
  },

  // ============================================
  // SOCIAL MEDIA
  // ============================================

  // Dashboard & Planning
  {
    name: 'Marketing Dashboard',
    section: 'Social Media',
    subsection: 'Dashboard & Planning',
    status: 'soon',
    soloValues: ['Basic', '✓', 'Advanced'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Visual Content Planner',
    section: 'Social Media',
    subsection: 'Dashboard & Planning',
    status: 'soon',
    soloValues: ['7 days', '30 days', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Social Media Scheduler',
    section: 'Social Media',
    subsection: 'Dashboard & Planning',
    status: 'soon',
    soloValues: ['10/mo', '50/mo', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Social Media Manager',
    section: 'Social Media',
    subsection: 'Dashboard & Planning',
    status: 'soon',
    soloValues: ['1 profile', '3 profiles', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Content Strategy Tools',
    section: 'Social Media',
    subsection: 'Dashboard & Planning',
    status: 'soon',
    soloValues: ['Basic', '✓', 'Advanced'],
    teamValues: ['✓', '✓', '✓'],
  },

  // Platform Scheduling
  {
    name: 'Instagram Scheduling',
    section: 'Social Media',
    subsection: 'Platform Scheduling',
    status: 'soon',
    soloValues: ['10/mo', '50/mo', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Facebook Scheduling',
    section: 'Social Media',
    subsection: 'Platform Scheduling',
    status: 'soon',
    soloValues: ['10/mo', '50/mo', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Pinterest Scheduling',
    section: 'Social Media',
    subsection: 'Platform Scheduling',
    status: 'soon',
    soloValues: ['10/mo', '50/mo', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'TikTok Scheduling',
    section: 'Social Media',
    subsection: 'Platform Scheduling',
    status: 'soon',
    soloValues: ['10/mo', '50/mo', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'LinkedIn Scheduling',
    section: 'Social Media',
    subsection: 'Platform Scheduling',
    status: 'soon',
    soloValues: ['10/mo', '50/mo', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'YouTube Shorts Scheduling',
    section: 'Social Media',
    subsection: 'Platform Scheduling',
    status: 'soon',
    soloValues: ['10/mo', '50/mo', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Threads Scheduling',
    section: 'Social Media',
    subsection: 'Platform Scheduling',
    status: 'soon',
    soloValues: ['10/mo', '50/mo', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },

  // AI Content Tools
  {
    name: 'AI Content Generator',
    section: 'Social Media',
    subsection: 'AI Content Tools',
    status: 'soon',
    soloValues: ['-', '25/mo', '✓'],
    teamValues: [null, '✓', '✓'],
  },
  {
    name: 'AI Caption Generator',
    section: 'Social Media',
    subsection: 'AI Content Tools',
    status: 'soon',
    soloValues: ['-', '50/mo', '✓'],
    teamValues: [null, '✓', '✓'],
  },

  // ============================================
  // JOB TRACKING
  // ============================================

  // Scheduling & Calendar
  {
    name: 'Scheduling',
    section: 'Job Tracking',
    subsection: 'Scheduling & Calendar',
    status: 'dev',
    soloValues: ['✓', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Find a Time',
    section: 'Job Tracking',
    subsection: 'Scheduling & Calendar',
    status: 'soon',
    soloValues: ['Basic', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Recurring Jobs',
    section: 'Job Tracking',
    subsection: 'Scheduling & Calendar',
    status: 'soon',
    soloValues: ['5', '25', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },

  // Job Management
  {
    name: 'Job Details and Attachments',
    section: 'Job Tracking',
    subsection: 'Job Management',
    status: 'dev',
    soloValues: ['3/mo', '50/mo', '∞'],
    teamValues: ['200/mo', '∞', '∞'],
  },
  {
    name: 'Job Templates',
    section: 'Job Tracking',
    subsection: 'Job Management',
    status: 'soon',
    soloValues: ['3', '15', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Job Forms',
    section: 'Job Tracking',
    subsection: 'Job Management',
    status: 'soon',
    soloValues: ['5', '25', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Job Costing',
    section: 'Job Tracking',
    subsection: 'Job Management',
    status: 'soon',
    soloValues: ['Basic', '✓', 'Advanced'],
    teamValues: ['✓', '✓', '✓'],
  },

  // Project & Task Management
  {
    name: 'Project Management',
    section: 'Job Tracking',
    subsection: 'Project & Task Management',
    status: 'soon',
    soloValues: ['5 projects', '25 projects', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Task Management',
    section: 'Job Tracking',
    subsection: 'Project & Task Management',
    status: 'soon',
    soloValues: ['✓', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },

  // Time & Expense Tracking
  {
    name: 'Time Tracking and Expense Tracking',
    section: 'Job Tracking',
    subsection: 'Time & Expense Tracking',
    status: 'soon',
    soloValues: ['Manual', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Automatic Time Tracking',
    section: 'Job Tracking',
    subsection: 'Time & Expense Tracking',
    status: 'soon',
    soloValues: ['-', 'Basic', '✓'],
    teamValues: [null, '✓', '✓'],
  },

  // Routing & GPS
  {
    name: 'Routing',
    section: 'Job Tracking',
    subsection: 'Routing & GPS',
    status: 'soon',
    soloValues: ['-', '5/day', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'GPS Tracking',
    section: 'Job Tracking',
    subsection: 'Routing & GPS',
    status: 'soon',
    soloValues: ['-', 'Basic', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },

  // ============================================
  // QUOTING & ESTIMATES
  // ============================================

  // Quote Creation
  {
    name: 'Quoting',
    section: 'Quoting & Estimates',
    subsection: 'Quote Creation',
    status: 'dev',
    soloValues: ['10/mo', '25/mo', '∞'],
    teamValues: ['100/mo', '∞', '∞'],
  },
  {
    name: 'Auto-Drafted Quotes',
    section: 'Quoting & Estimates',
    subsection: 'Quote Creation',
    status: 'soon',
    soloValues: ['-', 'Basic', '✓'],
    teamValues: [null, '✓', '✓'],
  },
  {
    name: 'Advanced Customization',
    section: 'Quoting & Estimates',
    subsection: 'Quote Creation',
    status: 'soon',
    soloValues: ['-', 'Basic', 'Advanced'],
    teamValues: [null, '✓', '✓'],
  },

  // Quote Management
  {
    name: 'High-Value Quote Alerts',
    section: 'Quoting & Estimates',
    subsection: 'Quote Management',
    status: 'soon',
    soloValues: ['-', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Automated Follow-Ups',
    section: 'Quoting & Estimates',
    subsection: 'Quote Management',
    status: 'soon',
    soloValues: ['3/mo', '15/mo', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Optional Add-Ons and Markups',
    section: 'Quoting & Estimates',
    subsection: 'Quote Management',
    status: 'soon',
    soloValues: ['5', '25', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },

  // ============================================
  // INVOICING & PAYMENTS
  // ============================================

  // Invoicing
  {
    name: 'Invoicing',
    section: 'Invoicing & Payments',
    subsection: 'Invoicing',
    status: 'soon',
    soloValues: ['10/mo', '50/mo', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Online Invoicing',
    section: 'Invoicing & Payments',
    subsection: 'Invoicing',
    status: 'soon',
    soloValues: ['10/mo', '50/mo', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Recurring Invoices',
    section: 'Invoicing & Payments',
    subsection: 'Invoicing',
    status: 'soon',
    soloValues: ['3', '15', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Invoice Templates',
    section: 'Invoicing & Payments',
    subsection: 'Invoicing',
    status: 'soon',
    soloValues: ['3', '10', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Progress Invoicing',
    section: 'Invoicing & Payments',
    subsection: 'Invoicing',
    status: 'soon',
    soloValues: ['-', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },

  // Payment Processing
  {
    name: 'Credit Card Processing',
    section: 'Invoicing & Payments',
    subsection: 'Payment Processing',
    status: 'soon',
    soloValues: ['-', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Online Payment Gateway',
    section: 'Invoicing & Payments',
    subsection: 'Payment Processing',
    status: 'soon',
    soloValues: ['-', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Automatic Payments',
    section: 'Invoicing & Payments',
    subsection: 'Payment Processing',
    status: 'soon',
    soloValues: ['-', '-', '✓'],
    teamValues: [null, '✓', '✓'],
  },
  {
    name: 'Multi-Currency Support',
    section: 'Invoicing & Payments',
    subsection: 'Payment Processing',
    status: 'soon',
    soloValues: ['-', '-', '✓'],
    teamValues: [null, '✓', '✓'],
  },

  // Payment Methods
  {
    name: 'Tap to Pay',
    section: 'Invoicing & Payments',
    subsection: 'Payment Methods',
    status: 'soon',
    soloValues: ['-', '-', '✓'],
    teamValues: [null, '✓', '✓'],
  },
  {
    name: 'Bank Payments (ACH)',
    section: 'Invoicing & Payments',
    subsection: 'Payment Methods',
    status: 'soon',
    soloValues: ['-', '-', '✓'],
    teamValues: [null, '✓', '✓'],
  },
  {
    name: 'Instant Payouts',
    section: 'Invoicing & Payments',
    subsection: 'Payment Methods',
    status: 'soon',
    soloValues: ['-', '-', '✓'],
    teamValues: [null, '✓', '✓'],
  },
  {
    name: 'Tip Collection',
    section: 'Invoicing & Payments',
    subsection: 'Payment Methods',
    status: 'soon',
    soloValues: ['-', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },

  // Invoice Management
  {
    name: 'Automated Invoice Follow-Ups',
    section: 'Invoicing & Payments',
    subsection: 'Invoice Management',
    status: 'soon',
    soloValues: ['3/mo', '15/mo', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Payment Reminders',
    section: 'Invoicing & Payments',
    subsection: 'Invoice Management',
    status: 'soon',
    soloValues: ['Manual', '✓', 'Auto'],
    teamValues: ['✓', '✓', '✓'],
  },

  // ============================================
  // REPORTING & ANALYTICS
  // ============================================

  // AI & Intelligence
  {
    name: 'GetWorken AI Voice',
    section: 'Reporting & Analytics',
    subsection: 'AI & Intelligence',
    status: 'soon',
    soloValues: ['-', '10/mo', '✓'],
    teamValues: [null, '✓', '✓'],
  },
  {
    name: 'GetWorken AI Chat',
    section: 'Reporting & Analytics',
    subsection: 'AI & Intelligence',
    status: 'soon',
    soloValues: ['-', '25/mo', '✓'],
    teamValues: [null, '✓', '✓'],
  },

  // Business Analytics
  {
    name: 'Insights Dashboard',
    section: 'Reporting & Analytics',
    subsection: 'Business Analytics',
    status: 'soon',
    soloValues: ['Basic', '✓', '✓'],
    teamValues: ['✓', 'Advanced', 'Advanced'],
  },
  {
    name: 'Real-Time Analytics',
    section: 'Reporting & Analytics',
    subsection: 'Business Analytics',
    status: 'soon',
    soloValues: ['Basic', '✓', 'Advanced'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Custom Reports',
    section: 'Reporting & Analytics',
    subsection: 'Business Analytics',
    status: 'soon',
    soloValues: ['-', '5', '∞'],
    teamValues: [null, '✓', '✓'],
  },
  {
    name: 'Custom Fields',
    section: 'Reporting & Analytics',
    subsection: 'Business Analytics',
    status: 'soon',
    soloValues: ['5', '25', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Data Export',
    section: 'Reporting & Analytics',
    subsection: 'Business Analytics',
    status: 'soon',
    soloValues: ['✓', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },

  // Financial Reports
  {
    name: 'Financial Reporting',
    section: 'Reporting & Analytics',
    subsection: 'Financial Reports',
    status: 'soon',
    soloValues: ['Basic', '✓', 'Advanced'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Profit & Loss Reports',
    section: 'Reporting & Analytics',
    subsection: 'Financial Reports',
    status: 'soon',
    soloValues: ['Monthly', '✓', 'Real-time'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Cash Flow Reporting',
    section: 'Reporting & Analytics',
    subsection: 'Financial Reports',
    status: 'soon',
    soloValues: ['Basic', '✓', 'Advanced'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Tax Reporting',
    section: 'Reporting & Analytics',
    subsection: 'Financial Reports',
    status: 'soon',
    soloValues: ['-', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },

  // Operational Reports
  {
    name: 'Client Reporting',
    section: 'Reporting & Analytics',
    subsection: 'Operational Reports',
    status: 'soon',
    soloValues: ['Basic', '✓', 'Advanced'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Work Reporting',
    section: 'Reporting & Analytics',
    subsection: 'Operational Reports',
    status: 'soon',
    soloValues: ['Basic', '✓', 'Advanced'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Expense Reporting',
    section: 'Reporting & Analytics',
    subsection: 'Operational Reports',
    status: 'soon',
    soloValues: ['Manual', '✓', 'Auto'],
    teamValues: ['✓', '✓', '✓'],
  },

  // Team Reports
  {
    name: 'Salesperson Reporting',
    section: 'Reporting & Analytics',
    subsection: 'Team Reports',
    status: 'soon',
    soloValues: ['-', '-', 'Basic'],
    teamValues: [null, '✓', '✓'],
  },
  {
    name: 'Team Productivity Reporting',
    section: 'Reporting & Analytics',
    subsection: 'Team Reports',
    status: 'soon',
    soloValues: ['-', '-', 'Basic'],
    teamValues: ['✓', '✓', '✓'],
  },

  // ============================================
  // ACCOUNTING & BOOKKEEPING
  // ============================================

  // Core Accounting
  {
    name: 'Accounts Receivable',
    section: 'Accounting & Bookkeeping',
    subsection: 'Core Accounting',
    status: 'soon',
    soloValues: ['Basic', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Accounts Payable',
    section: 'Accounting & Bookkeeping',
    subsection: 'Core Accounting',
    status: 'soon',
    soloValues: ['-', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Chart of Accounts',
    section: 'Accounting & Bookkeeping',
    subsection: 'Core Accounting',
    status: 'soon',
    soloValues: ['Basic', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'General Ledger',
    section: 'Accounting & Bookkeeping',
    subsection: 'Core Accounting',
    status: 'soon',
    soloValues: ['-', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Balance Sheet',
    section: 'Accounting & Bookkeeping',
    subsection: 'Core Accounting',
    status: 'soon',
    soloValues: ['-', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },

  // Reconciliation & Management
  {
    name: 'Bank Reconciliation',
    section: 'Accounting & Bookkeeping',
    subsection: 'Reconciliation & Management',
    status: 'soon',
    soloValues: ['Manual', '✓', 'Auto'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Expense Management',
    section: 'Accounting & Bookkeeping',
    subsection: 'Reconciliation & Management',
    status: 'soon',
    soloValues: ['50/mo', '250/mo', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },

  // Expense Tools
  {
    name: 'Receipt Capture',
    section: 'Accounting & Bookkeeping',
    subsection: 'Expense Tools',
    status: 'soon',
    soloValues: ['50/mo', '250/mo', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Mileage Tracking',
    section: 'Accounting & Bookkeeping',
    subsection: 'Expense Tools',
    status: 'soon',
    soloValues: ['Manual', '✓', 'Auto'],
    teamValues: ['✓', '✓', '✓'],
  },

  // ============================================
  // HR & PAYROLL
  // ============================================

  // Employee Management
  {
    name: 'Employee Management',
    section: 'HR & Payroll',
    subsection: 'Employee Management',
    status: 'soon',
    soloValues: ['1 employee', '6 employees', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Time Off Management',
    section: 'HR & Payroll',
    subsection: 'Employee Management',
    status: 'soon',
    soloValues: ['-', 'Basic', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },

  // Payroll & Benefits
  {
    name: 'Payroll Processing',
    section: 'HR & Payroll',
    subsection: 'Payroll & Benefits',
    status: 'soon',
    soloValues: ['-', '-', '✓'],
    teamValues: [null, '✓', '✓'],
  },
  {
    name: 'Benefits Administration',
    section: 'HR & Payroll',
    subsection: 'Payroll & Benefits',
    status: 'soon',
    soloValues: ['-', '-', '✓'],
    teamValues: [null, '✓', '✓'],
  },

  // Hiring & Recruitment
  {
    name: 'Hiring & Onboarding',
    section: 'HR & Payroll',
    subsection: 'Hiring & Recruitment',
    status: 'soon',
    soloValues: ['-', '-', 'Basic'],
    teamValues: [null, '✓', '✓'],
  },
  {
    name: 'Applicant Tracking',
    section: 'HR & Payroll',
    subsection: 'Hiring & Recruitment',
    status: 'soon',
    soloValues: ['-', '-', '✓'],
    teamValues: [null, '✓', '✓'],
  },

  // ============================================
  // SETUP & INTEGRATIONS
  // ============================================

  // User Management
  {
    name: 'Users',
    section: 'Setup & Integrations',
    subsection: 'User Management',
    status: 'live',
    soloValues: ['1c+1e', '1c+6e', '1c+∞e'],
    teamValues: ['3c+∞e', '10c+∞e', '∞'],
  },

  // Accounting Integrations
  {
    name: 'QuickBooks Online Sync',
    section: 'Setup & Integrations',
    subsection: 'Accounting Integrations',
    status: 'soon',
    soloValues: ['-', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Xero Sync',
    section: 'Setup & Integrations',
    subsection: 'Accounting Integrations',
    status: 'soon',
    soloValues: ['-', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },

  // Productivity Tools
  {
    name: 'Google Workspace Integration',
    section: 'Setup & Integrations',
    subsection: 'Productivity Tools',
    status: 'soon',
    soloValues: ['-', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Microsoft 365 Integration',
    section: 'Setup & Integrations',
    subsection: 'Productivity Tools',
    status: 'soon',
    soloValues: ['-', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Gusto Integration',
    section: 'Setup & Integrations',
    subsection: 'Productivity Tools',
    status: 'soon',
    soloValues: ['-', '-', '✓'],
    teamValues: [null, '✓', '✓'],
  },

  // Payment Integrations
  {
    name: 'Stripe Integration',
    section: 'Setup & Integrations',
    subsection: 'Payment Integrations',
    status: 'soon',
    soloValues: ['-', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },

  // Automation Tools
  {
    name: 'GetWorken App Marketplace',
    section: 'Setup & Integrations',
    subsection: 'Automation Tools',
    status: 'soon',
    soloValues: ['✓', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Zapier',
    section: 'Setup & Integrations',
    subsection: 'Automation Tools',
    status: 'soon',
    soloValues: ['-', '25/mo', '✓'],
    teamValues: [null, '✓', '✓'],
  },

  // Developer Tools
  {
    name: 'REST API',
    section: 'Setup & Integrations',
    subsection: 'Developer Tools',
    status: 'soon',
    soloValues: ['-', '-', '1000/day'],
    teamValues: [null, null, '✓'],
  },
  {
    name: 'Webhooks',
    section: 'Setup & Integrations',
    subsection: 'Developer Tools',
    status: 'soon',
    soloValues: ['-', '5', '∞'],
    teamValues: [null, '✓', '✓'],
  },

  // ============================================
  // PLATFORM & MOBILE
  // ============================================

  // Core Features
  {
    name: 'PDF Generation',
    section: 'Platform & Mobile',
    subsection: 'Core Features',
    status: 'live',
    soloValues: ['✓', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Photo & Document Upload',
    section: 'Platform & Mobile',
    subsection: 'Core Features',
    status: 'live',
    soloValues: ['50 MB', '500 MB', '2 GB'],
    teamValues: ['5 GB', '10 GB', '∞'],
  },

  // Mobile & Documents
  {
    name: 'Mobile App (iOS & Android)',
    section: 'Platform & Mobile',
    subsection: 'Mobile & Documents',
    status: 'soon',
    soloValues: ['✓', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Offline Mode',
    section: 'Platform & Mobile',
    subsection: 'Mobile & Documents',
    status: 'soon',
    soloValues: ['24hrs', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Document Storage',
    section: 'Platform & Mobile',
    subsection: 'Mobile & Documents',
    status: 'soon',
    soloValues: ['1 GB', '5 GB', '20 GB'],
    teamValues: ['50 GB', '100 GB', '∞'],
  },
  {
    name: 'Document Templates',
    section: 'Platform & Mobile',
    subsection: 'Mobile & Documents',
    status: 'soon',
    soloValues: ['3', '15', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'E-Signatures',
    section: 'Platform & Mobile',
    subsection: 'Mobile & Documents',
    status: 'soon',
    soloValues: ['10/mo', '50/mo', '∞'],
    teamValues: ['✓', '✓', '✓'],
  },

  // Security & Access
  {
    name: 'Role-Based Permissions',
    section: 'Platform & Mobile',
    subsection: 'Security & Access',
    status: 'soon',
    soloValues: ['-', 'Basic', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Audit Trail',
    section: 'Platform & Mobile',
    subsection: 'Security & Access',
    status: 'soon',
    soloValues: ['-', '30 days', '✓'],
    teamValues: [null, '✓', '✓'],
  },
  {
    name: 'Two-Factor Authentication',
    section: 'Platform & Mobile',
    subsection: 'Security & Access',
    status: 'soon',
    soloValues: ['✓', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'SSO (Single Sign-On)',
    section: 'Platform & Mobile',
    subsection: 'Security & Access',
    status: 'soon',
    soloValues: ['-', '-', '-'],
    teamValues: [null, null, '✓'],
  },

  // Automation & Workflows
  {
    name: 'Workflow Automation',
    section: 'Platform & Mobile',
    subsection: 'Automation & Workflows',
    status: 'soon',
    soloValues: ['-', '5', '✓'],
    teamValues: [null, '✓', '✓'],
  },

  // ============================================
  // SUPPORT & SERVICES
  // ============================================

  // Customer Support
  {
    name: 'Email Support',
    section: 'Support & Services',
    subsection: 'Customer Support',
    status: 'soon',
    soloValues: ['✓', '✓', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Live Chat Support',
    section: 'Support & Services',
    subsection: 'Customer Support',
    status: 'soon',
    soloValues: ['-', 'Business hrs', '✓'],
    teamValues: ['✓', '✓', '✓'],
  },
  {
    name: 'Phone Support',
    section: 'Support & Services',
    subsection: 'Customer Support',
    status: 'soon',
    soloValues: ['-', '-', '✓'],
    teamValues: [null, '✓', '✓'],
  },
  {
    name: '1-on-1 Product Support',
    section: 'Support & Services',
    subsection: 'Customer Support',
    status: 'soon',
    soloValues: ['-', '-', '✓'],
    teamValues: [null, '✓', '✓'],
  },
  {
    name: 'Premium Support',
    section: 'Support & Services',
    subsection: 'Customer Support',
    status: 'soon',
    soloValues: ['-', '-', '✓'],
    teamValues: [null, '✓', '✓'],
  },

  // Enterprise Services
  {
    name: 'White Glove Onboarding',
    section: 'Support & Services',
    subsection: 'Enterprise Services',
    status: 'soon',
    soloValues: ['-', '-', '-'],
    teamValues: [null, null, '✓'],
  },
  {
    name: 'Data Import',
    section: 'Support & Services',
    subsection: 'Enterprise Services',
    status: 'soon',
    soloValues: ['-', 'Self-serve', '✓'],
    teamValues: [null, '✓', '✓'],
  },
  {
    name: 'Dedicated Account Manager',
    section: 'Support & Services',
    subsection: 'Enterprise Services',
    status: 'soon',
    soloValues: ['-', '-', '-'],
    teamValues: [null, null, '✓'],
  },
  {
    name: 'Custom Training',
    section: 'Support & Services',
    subsection: 'Enterprise Services',
    status: 'soon',
    soloValues: ['-', '-', '-'],
    teamValues: [null, null, '✓'],
  },
  {
    name: 'SLA Guarantee',
    section: 'Support & Services',
    subsection: 'Enterprise Services',
    status: 'soon',
    soloValues: ['-', '-', '-'],
    teamValues: [null, null, '✓'],
  },

  // Additional Services
  {
    name: 'The Home Service Community Membership',
    section: 'Support & Services',
    subsection: 'Additional Services',
    status: 'soon',
    soloValues: ['-', 'Basic', '✓'],
    teamValues: [null, '✓', '✓'],
  },
  {
    name: 'GetWorken Capital',
    section: 'Support & Services',
    subsection: 'Additional Services',
    status: 'soon',
    soloValues: ['-', '-', '✓'],
    teamValues: [null, '✓', '✓'],
  },
];
