import { NextRequest, NextResponse } from 'next/server';
import { handleApiRequest } from '@/app/services/handleApiRequest';
import { LETTER_FOR_APPLICATION_ROUTE } from '@/app/constants/routes';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const templateName = searchParams.get('template_name');
  const applicationId = searchParams.get('application_id');

  if (!templateName || !applicationId) {
    return NextResponse.json({ error: 'Both template_name and application_id are required' }, { status: 400 });
  }

  const url = `${LETTER_FOR_APPLICATION_ROUTE}?template_name=${encodeURIComponent(templateName)}&application_id=${encodeURIComponent(applicationId)}`;

  return handleApiRequest(request, url, 'GET');
}