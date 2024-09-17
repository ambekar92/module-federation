import { APPLICATION_CONTRIBUTORS_ROUTE } from '@/app/constants/routes';
import { handleApiRequest } from '@/app/services/handleApiRequest';
import { NextRequest } from 'next/server';

export async function PUT(request: NextRequest, { params }: { params: { contributorId: string } }) {
  const { contributorId } = params;
  const url = `${APPLICATION_CONTRIBUTORS_ROUTE}/${contributorId}`;

  return handleApiRequest(request, url, 'PUT');
}
