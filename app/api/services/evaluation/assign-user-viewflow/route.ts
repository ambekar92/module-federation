import { ASSIGN_USER_TO_VIEWFLOW_ROUTE } from '@/app/constants/routes'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  return handleApiRequest(request, ASSIGN_USER_TO_VIEWFLOW_ROUTE, 'POST')
}

export async function PUT(request: NextRequest) {
  return handleApiRequest(request, ASSIGN_USER_TO_VIEWFLOW_ROUTE, 'PUT')

}