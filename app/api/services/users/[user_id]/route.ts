import { NextRequest, NextResponse } from 'next/server';
import { handleApiRequest } from '@/app/services/handleApiRequest';
import { USER_ROUTE } from '@/app/constants/routes';

export async function GET(request: NextRequest, { params }: { params: { user_id: string } }) {
  const userId = params.user_id;

  // Check if it's a request for a single user
  if (userId && userId !== 'users') {
    return handleApiRequest(request, `${USER_ROUTE}/${userId}`, 'GET');
  }

  // Handle request for multiple users with optional filters
  const { searchParams } = new URL(request.url);
  const validFilters = ['id', 'first_name', 'last_name', 'email', 'is_active', 'role_slug'];
  let query = '';
  validFilters.forEach(filter => {
    const value = searchParams.get(filter);
    if (value !== null) {
      query += query ? '&' : '?';
      query += `${filter}=${encodeURIComponent(value)}`;
    }
  });

  return handleApiRequest(request, `${USER_ROUTE}${query}`, 'GET');
}