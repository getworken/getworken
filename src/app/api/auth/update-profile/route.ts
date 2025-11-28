import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/shared/lib/firebase/admin';
import { logger } from '@/shared/lib/logger';
import { z } from 'zod';

/**
 * Schema for profile update request.
 * Validates profile type and uid.
 */
const updateProfileSchema = z.object({
  uid: z.string().min(1),
  profile: z.enum(['business', 'contractor', 'customer', 'employee']),
});

/**
 * POST /api/auth/update-profile
 * Updates user profile completion status in Firestore.
 * 
 * @param request - Next.js request with uid and profile type
 * @returns JSON response with success status
 */
export async function POST(request: NextRequest) {
  const requestLogger = logger.child({ route: '/api/auth/update-profile' });
  
  try {
    const body = await request.json();
    const { uid, profile } = updateProfileSchema.parse(body);

    // When a profile is selected during onboarding:
    // - Set uid to the user's uid (this will be the profile document ID later)
    // - Set active to true (this is the active profile)
    // - Set completed to true (onboarding for this profile is done)
    // - Set onboardingStep to 1 (first step completed)
    await adminDb
      .collection('users')
      .doc(uid)
      .update({
        [`profiles.${profile}.uid`]: uid,
        [`profiles.${profile}.active`]: true,
        [`profiles.${profile}.completed`]: true,
        [`profiles.${profile}.onboardingStep`]: 1,
        updatedAt: new Date(),
      });

    requestLogger.info({ uid, profile }, 'Profile updated successfully');
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      requestLogger.warn({ errors: error.errors }, 'Validation failed for profile update');
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    requestLogger.error({ error }, 'Failed to update profile');
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
      );
  }
}
