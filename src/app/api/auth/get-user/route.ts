import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/shared/lib/firebase/admin';
import { logger } from '@/shared/lib/logger';

/**
 * GET /api/auth/get-user?uid=<userId>
 * Retrieves user document from Firestore.
 * 
 * @param request - Next.js request with uid query param
 * @returns JSON response with user data
 */
export async function GET(request: NextRequest) {
  const requestLogger = logger.child({ route: '/api/auth/get-user' });
  
  try {
    const uid = request.nextUrl.searchParams.get('uid');

    if (!uid) {
      requestLogger.warn('Missing uid parameter in request');
      return NextResponse.json(
        { error: 'Missing uid parameter' },
        { status: 400 }
      );
    }

    const userDoc = await adminDb
      .collection('users')
      .doc(uid)
      .get();

    if (!userDoc.exists) {
      requestLogger.warn({ uid }, 'User document not found');
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    
    // Convert Firestore Timestamps to ISO strings for JSON serialization
    const serializedData = {
      ...userData,
      createdAt: userData?.createdAt?.toDate?.()?.toISOString?.() || null,
      updatedAt: userData?.updatedAt?.toDate?.()?.toISOString?.() || null,
    };

    requestLogger.info({ uid }, 'User document retrieved successfully');
    return NextResponse.json(serializedData, { status: 200 });
  } catch (error) {
    requestLogger.error({ error }, 'Failed to fetch user document');
    return NextResponse.json(
      { error: 'Failed to fetch user document' },
      { status: 500 }
    );
  }
}
