import { NextRequest, NextResponse } from 'next/server'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { DOCUMENTS_ROUTE } from '@/app/constants/routes'

export async function PUT(request: NextRequest, { params }: { params: { documentId: string } }) {
  const { documentId } = params;

  const url = `${DOCUMENTS_ROUTE}/${documentId}`;

  return handleApiRequest(request, url, 'PUT');
}
