import { APPLICATION_CONTRIBUTORS_ROUTE } from '@/app/constants/routes';
import { handleApiRequest } from '@/app/services/handleApiRequest';
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters';
import { NextRequest } from 'next/server';

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

  return handleApiRequest(request, `${APPLICATION_CONTRIBUTORS_ROUTE}${query}`, 'GET')
}