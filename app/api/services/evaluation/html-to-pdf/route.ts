import { NextRequest, NextResponse } from 'next/server';
import { handleApiRequest } from '@/app/services/handleApiRequest';
import { HTML_TO_PDF_ROUTE } from '@/app/constants/routes';

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get('file_name');
  const uploadUserId = searchParams.get('upload_user_id');
  const entityId = searchParams.get('entity_id');
  const documentTypeId = searchParams.get('document_type_id');
  const documentType = searchParams.get('document_type');

  if (!fileName || !uploadUserId || !entityId || !documentTypeId || !documentType) {
    return NextResponse.json({ error: 'Missing required query parameters' }, { status: 400 });
  }

  const url = `${HTML_TO_PDF_ROUTE}?file_name=${encodeURIComponent(fileName)}&upload_user_id=${encodeURIComponent(uploadUserId)}&entity_id=${encodeURIComponent(entityId)}&document_type_id=${encodeURIComponent(documentTypeId)}&document_type=${encodeURIComponent(documentType)}`;

  return handleApiRequest(request, url, 'POST');
}