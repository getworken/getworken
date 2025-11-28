import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/shared/lib/firebase/admin';
import { logger } from '@/shared/lib/logger';
import { z } from 'zod';

/**
 * Schema for user creation request.
 * Validates all required fields from signup form.
 */
const createUserSchema = z.object({
  uid: z.string().min(1),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phoneNumber: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
});

/**
 * POST /api/auth/create-user
 * Creates user document in Firestore after Firebase Auth signup.
 * 
 * @param request - Next.js request with user data
 * @returns JSON response with success status
 */
export async function POST(request: NextRequest) {
  const requestLogger = logger.child({ route: '/api/auth/create-user' });
  
  try {
    const body = await request.json();
    const validatedData = createUserSchema.parse(body);

    const userDoc = {
      uid: validatedData.uid,
      email: validatedData.email,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      phoneNumber: validatedData.phoneNumber,
      city: validatedData.city,
      'state/province': validatedData.state,
      profiles: {
        business: {
          uid: `BUS-${validatedData.uid}`,
          active: false,
          completed: false,
          onboardingStep: 0,
        },
        contractor: {
          uid: `CONT-${validatedData.uid}`,
          active: false,
          completed: false,
          onboardingStep: 0,
        },
        customer: {
          uid: `CUST-${validatedData.uid}`,
          active: true,
          completed: false,
        },
        employee: {
          uid: `EMP-${validatedData.uid}`,
          active: false,
          completed: false,
          onboardingStep: 0,
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await adminDb
      .collection('users')
      .doc(validatedData.uid)
      .set(userDoc);

    requestLogger.info({ uid: validatedData.uid }, 'User document created successfully');
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      requestLogger.warn({ errors: error.errors }, 'Validation failed for user creation');
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    requestLogger.error({ error }, 'Failed to create user document');
    return NextResponse.json(
      { error: 'Failed to create user document' },
      { status: 500 }
    );
  }
}
