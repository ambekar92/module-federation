import { NextRequest, NextResponse } from 'next/server'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { QUESTIONNAIRE_LIST_ROUTE } from '@/app/constants/questionnaires'

export async function GET(request: NextRequest, { params }: { params: { contributorId: string } }) {
  const { contributorId } = params
  const url = `${QUESTIONNAIRE_LIST_ROUTE}/${contributorId}`
  return handleApiRequest(request, url, 'GET')
}