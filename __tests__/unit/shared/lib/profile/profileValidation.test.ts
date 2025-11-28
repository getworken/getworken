/**
 * Profile Validation Helper Tests
 * @module __tests__/unit/shared/lib/profile/profileValidation.test
 * 
 * ✅ DIAMOND STANDARD: Unit tests for validation utilities
 */

import { describe, it, expect } from '@jest/globals';
import {
  isValidEmail,
  isValidPhone,
  isValidUrl,
  isValidZipCode,
  isValidHexColor,
  isProfilePublicReady,
  calculateProfileCompletion,
} from '../../../../../src/shared/lib/profile/profileValidation';

describe('profileValidation', () => {
  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('test.user+tag@domain.co.uk')).toBe(true);
      expect(isValidEmail('name@subdomain.domain.com')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('missing@domain')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('should validate US phone numbers with 10 digits', () => {
      expect(isValidPhone('1234567890')).toBe(true);
      expect(isValidPhone('(123) 456-7890')).toBe(true);
      expect(isValidPhone('123-456-7890')).toBe(true);
      expect(isValidPhone('123.456.7890')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(isValidPhone('123')).toBe(false);
      expect(isValidPhone('12345')).toBe(false);
      expect(isValidPhone('123456789')).toBe(false);
      expect(isValidPhone('12345678901')).toBe(false);
      expect(isValidPhone('')).toBe(false);
    });
  });

  describe('isValidUrl', () => {
    it('should validate correct URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('https://subdomain.example.com/path')).toBe(true);
      expect(isValidUrl('https://example.com:8080')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isValidUrl('not a url')).toBe(false);
      expect(isValidUrl('example.com')).toBe(false);
      expect(isValidUrl('')).toBe(false);
      expect(isValidUrl('ftp://invalid')).toBe(true); // Valid URL but different protocol
    });
  });

  describe('isValidZipCode', () => {
    it('should validate 5-digit ZIP codes', () => {
      expect(isValidZipCode('12345')).toBe(true);
      expect(isValidZipCode('90210')).toBe(true);
    });

    it('should validate ZIP+4 format', () => {
      expect(isValidZipCode('12345-6789')).toBe(true);
      expect(isValidZipCode('90210-1234')).toBe(true);
    });

    it('should reject invalid ZIP codes', () => {
      expect(isValidZipCode('1234')).toBe(false);
      expect(isValidZipCode('123456')).toBe(false);
      expect(isValidZipCode('abcde')).toBe(false);
      expect(isValidZipCode('12345-678')).toBe(false);
      expect(isValidZipCode('')).toBe(false);
    });
  });

  describe('isValidHexColor', () => {
    it('should validate hex color codes', () => {
      expect(isValidHexColor('#000000')).toBe(true);
      expect(isValidHexColor('#FFFFFF')).toBe(true);
      expect(isValidHexColor('#123ABC')).toBe(true);
      expect(isValidHexColor('#abc123')).toBe(true);
    });

    it('should reject invalid hex colors', () => {
      expect(isValidHexColor('000000')).toBe(false);
      expect(isValidHexColor('#FFF')).toBe(false);
      expect(isValidHexColor('#GGGGGG')).toBe(false);
      expect(isValidHexColor('#12345')).toBe(false);
      expect(isValidHexColor('')).toBe(false);
    });
  });

  describe('isProfilePublicReady', () => {
    it('should return true when all requirements are met', () => {
      const profile = {
        completed: true,
        active: true,
        verified: true,
      };
      expect(isProfilePublicReady(profile)).toBe(true);
    });

    it('should return false when completed is false', () => {
      const profile = {
        completed: false,
        active: true,
        verified: true,
      };
      expect(isProfilePublicReady(profile)).toBe(false);
    });

    it('should return false when active is false', () => {
      const profile = {
        completed: true,
        active: false,
        verified: true,
      };
      expect(isProfilePublicReady(profile)).toBe(false);
    });

    it('should return false when verified is false', () => {
      const profile = {
        completed: true,
        active: true,
        verified: false,
      };
      expect(isProfilePublicReady(profile)).toBe(false);
    });

    it('should return false when multiple requirements are missing', () => {
      const profile = {
        completed: false,
        active: false,
        verified: false,
      };
      expect(isProfilePublicReady(profile)).toBe(false);
    });
  });

  describe('calculateProfileCompletion', () => {
    it('should return 0% for empty profile', () => {
      const profile = {};
      const requiredFields = ['name', 'email', 'phone'];
      expect(calculateProfileCompletion(profile, requiredFields)).toBe(0);
    });

    it('should return 100% when all fields are filled', () => {
      const profile = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
      };
      const requiredFields = ['name', 'email', 'phone'];
      expect(calculateProfileCompletion(profile, requiredFields)).toBe(100);
    });

    it('should return 50% when half the fields are filled', () => {
      const profile = {
        name: 'John Doe',
        email: '',
      };
      const requiredFields = ['name', 'email'];
      expect(calculateProfileCompletion(profile, requiredFields)).toBe(50);
    });

    it('should return 33% when one of three fields is filled', () => {
      const profile = {
        name: 'John Doe',
        email: '',
        phone: '',
      };
      const requiredFields = ['name', 'email', 'phone'];
      expect(calculateProfileCompletion(profile, requiredFields)).toBeCloseTo(33.33, 0);
    });

    it('should treat null and undefined as incomplete', () => {
      const profile = {
        name: 'John Doe',
        email: null,
        phone: undefined,
      };
      const requiredFields = ['name', 'email', 'phone'];
      expect(calculateProfileCompletion(profile, requiredFields)).toBeCloseTo(33.33, 0);
    });

    it('should treat empty arrays as incomplete', () => {
      const profile = {
        name: 'John Doe',
        skills: [],
      };
      const requiredFields = ['name', 'skills'];
      expect(calculateProfileCompletion(profile, requiredFields)).toBe(50);
    });

    it('should treat filled arrays as complete', () => {
      const profile = {
        name: 'John Doe',
        skills: ['Plumbing', 'Electrical'],
      };
      const requiredFields = ['name', 'skills'];
      expect(calculateProfileCompletion(profile, requiredFields)).toBe(100);
    });

    it('should return 0% for null profile', () => {
      expect(calculateProfileCompletion(null as any, ['name'])).toBe(0);
    });

    it('should return 0% for empty required fields', () => {
      const profile = { name: 'John' };
      expect(calculateProfileCompletion(profile, [])).toBe(0);
    });
  });
});
