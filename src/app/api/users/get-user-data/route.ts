/**
 * API Route: Get User Data
 * @module api/users/get-user-data
 *
 * ✅ DIAMOND STANDARD: App Router API route handler
 */

import { NextRequest, NextResponse } from 'next/server';
import { getUserData } from '@/features/auth/api/actions';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const uid = searchParams.get('uid');

    if (!uid) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const result = await getUserData(uid);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
