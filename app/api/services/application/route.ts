import { APPLICATION_ROUTE } from '@/app/constants/routes';
import { handleApiRequest } from '@/app/services/handleApiRequest';
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters';
import { NextRequest } from 'next/server';

/**
 * Handles GET requests to /api/applications.
 * @param request - The NextRequest object.
 * @returns A NextResponse object.
 * @throws {Response} with a 400 status if no valid filter parameters are provided.
 *
 * Queries the application service with the given filter parameters.
 * Valid filter parameters are:
 * - application_type_id
 * - application_id
 * - entity_id
 * - id
 * - workflow_state
 * - user_id
*/
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  let query = ''
  let hasValidFilter = false

  for (const filterType of Object.values(ApplicationFilterType)) {
    const filterValue = searchParams.get(filterType)
    if (filterValue) {
      query += query ? '&' : '?'
      query += `${filterType}=${filterValue}`
      hasValidFilter = true
    }
  }

  if (!hasValidFilter) {
    return new Response('At least one valid filter parameter is required', { status: 400 })
  }

  return handleApiRequest(request, `${APPLICATION_ROUTE}${query}`, 'GET')
}

export async function PUT(request: NextRequest) {
  return handleApiRequest(request, APPLICATION_ROUTE, 'PUT');
}

export async function POST(request: NextRequest) {
  return handleApiRequest(request, APPLICATION_ROUTE, 'POST');
}