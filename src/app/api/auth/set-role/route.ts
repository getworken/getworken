/**
 * API Route: Set User Role
 * @module api/auth/set-role
 * 
 * ✅ DIAMOND STANDARD: Server-only route using Firebase Admin SDK
 * 
 * This route demonstrates the Hybrid RBAC model by setting custom claims (static roles)
 * 
 * Security:
 * - Uses Firebase Admin SDK (server-only)
 * - Validates admin privileges
 * - Input validation with Zod
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { setUserRole, verifyIdToken, isAdmin, UserRole } from '@/shared/lib/firebase-admin';
import { logger } from '@/shared/lib/logger';

/**
 * Input validation schema
 */
const SetRoleSchema = z.object({
  targetUserId: z.string().min(1, 'User ID is required'),
  role: z.enum(['super-admin', 'admin', 'moderator', 'support', 'client']),
});

/**
 * POST /api/auth/set-role
 * Set a user's role (custom claim)
 * 
 * @requires admin role
 * 
 * @example
 * POST /api/auth/set-role
 * Authorization: Bearer <id-token>
 * {
 *   "targetUserId": "abc123",
 *   "role": "admin"
 * }
 */
export async function POST(request: NextRequest) {
  const requestLogger = logger.child({ route: '/api/auth/set-role' });
  
  try {
    // Extract ID token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      requestLogger.warn('Missing or invalid authorization header');
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Missing authorization token' } },
        { status: 401 }
      );
    }

    const idToken = authHeader.split('Bearer ')[1];
    
    if (!idToken) {
      requestLogger.warn('Invalid authorization header format');
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid authorization header' } },
        { status: 401 }
      );
    }
    
    // Verify ID token and get user
    const decodedToken = await verifyIdToken(idToken);
    const requestingUserId = decodedToken.uid;
    
    requestLogger.info({ userId: requestingUserId }, 'Request authenticated');

    // Check if requesting user is admin
    const hasAdminRole = await isAdmin(requestingUserId);
    if (!hasAdminRole) {
      requestLogger.warn({ userId: requestingUserId }, 'Non-admin attempted to set role');
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Admin privileges required' } },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = SetRoleSchema.safeParse(body);
    
    if (!validation.success) {
      requestLogger.warn({ errors: validation.error.errors }, 'Validation failed');
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request body',
            details: validation.error.errors,
          },
        },
        { status: 400 }
      );
    }

    const { targetUserId, role } = validation.data;

    // Set the role (custom claim)
    await setUserRole(targetUserId, role as UserRole);

    requestLogger.info(
      { adminId: requestingUserId, targetUserId, role },
      'User role updated successfully'
    );

    return NextResponse.json({
      success: true,
      data: {
        userId: targetUserId,
        role,
        message: 'Role updated successfully. User must sign out and sign in again for changes to take effect.',
      },
    });
  } catch (error) {
    requestLogger.error({ error }, 'Failed to set user role');
    
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An error occurred while setting the user role',
        },
      },
      { status: 500 }
    );
  }
}
