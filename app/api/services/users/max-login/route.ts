import { handleApiRequest } from '@/app/services/handleApiRequest'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  return handleApiRequest(request, '/max-login', 'GET')
} 