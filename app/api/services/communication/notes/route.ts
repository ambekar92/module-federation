import { NOTES_ROUTE } from '@/app/constants/routes'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters'
import { NextRequest } from 'next/server'

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

  return handleApiRequest(request, `${NOTES_ROUTE}${query}`, 'GET')
}

export async function POST(request: NextRequest) {
  return handleApiRequest(request, NOTES_ROUTE, 'POST')
}

export async function PUT(request: NextRequest) {
  return handleApiRequest(request, NOTES_ROUTE, 'PUT')
}