import { NextRequest, NextResponse } from 'next/server'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { DOCUMENT_REQUIRED_ROUTE } from '@/app/constants/routes'

export async function GET(
  request: NextRequest,
  { params }: { params: { contributorId: string } }
) {
  const { contributorId } = params
  const url = `${DOCUMENT_REQUIRED_ROUTE}/${contributorId}`
  
  return handleApiRequest(request, url, 'GET')
}