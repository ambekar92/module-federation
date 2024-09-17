import { NextRequest } from 'next/server'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { DELEGATES_ROUTE } from '@/app/constants/routes'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const contributorId = searchParams.get('contributor_id')

  if (!contributorId) {
    return new Response('Contributor ID is required', { status: 400 })
  }

  return handleApiRequest(request, `${DELEGATES_ROUTE}/${contributorId}`, 'GET')
}