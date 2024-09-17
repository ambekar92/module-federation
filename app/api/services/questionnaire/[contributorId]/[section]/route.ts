import { NextRequest, NextResponse } from 'next/server'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { QUESTIONNAIRE_API_ROUTE } from '@/app/constants/routes'

export async function GET(
  request: NextRequest,
  { params }: { params: { contributorId: string; section: string } }
) {
  const { contributorId, section } = params

  if (!contributorId || !section) {
    return NextResponse.json({ error: 'Contributor ID and section are required' }, { status: 400 })
  }

  const url = `${QUESTIONNAIRE_API_ROUTE}/${contributorId}/${section}`

  try {
    return await handleApiRequest(request, url, 'GET')
  } catch (error) {
    console.error('Error fetching questionnaire:', error)
    return NextResponse.json({ error: 'An error occurred while fetching the questionnaire' }, { status: 500 })
  }
}