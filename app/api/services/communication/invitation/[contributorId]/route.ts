import { NextRequest, NextResponse } from 'next/server'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { INVITATION_ROUTE } from '@/app/constants/routes'

export async function GET(request: NextRequest, { params }: { params: { contributorId: string } }) {
  const { contributorId } = params
  const url = `${INVITATION_ROUTE}/${contributorId}`
  return handleApiRequest(request, url, 'GET')
}