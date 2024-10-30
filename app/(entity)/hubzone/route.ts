import redisClient from '@/app/lib/redis';
import { decryptData } from '@/app/shared/utility/encryption';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.NEXTAUTH_SECRET;

interface JwtPayload {
  token: string;
  application_contributor_id: string;
  user_id: string;
  application_id: string;
  application_version?: string;
}

// Handling GET request and redirecting
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const application_contributor_id = searchParams.get('application_contributor_id') || '';
  const user_id = searchParams.get('user_id') || '';
  const application_id = searchParams.get('application_id') || '';
  const role = searchParams.get('role');
  const application_version = searchParams.get('application_version');

  const cookieStore = cookies();
  const emailPasswordAuthToken = cookieStore.get('email_password_auth_token');
  const sessionToken = cookieStore.get('sessionToken');
  const pk = cookieStore.get('pk');
  const secretKey2 = decryptData(sessionToken?.value, pk?.value);
  const userData = emailPasswordAuthToken ? JSON.parse(decryptData(emailPasswordAuthToken.value, secretKey2)) : undefined;
  const redisData = await redisClient.get(userData.email);
  const token = redisData ? JSON.parse(redisData).access : null;

  const jwtPayload: JwtPayload = {
    token,
    application_contributor_id,
    user_id,
    application_id
  };

  if (application_version) {
    jwtPayload.application_version = application_version;
  }

  const jwtToken = jwt.sign(
    jwtPayload,
    SECRET_KEY,
    { expiresIn: 86400 } // 24 hours
  );

  const isAnalyst = role && role === 'analyst';
  const url = isAnalyst ? `${process.env.NEXT_PUBLIC_HUBZONE_URL}?&wt=${jwtToken}&role=analyst` : `${process.env.NEXT_PUBLIC_HUBZONE_URL}?&wt=${jwtToken}&role=`;

  if (token) {
    return NextResponse.redirect(url);
  }
  return null;
}
