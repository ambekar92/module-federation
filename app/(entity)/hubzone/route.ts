import { headers, cookies } from 'next/headers';
import redisClient from '@/app/lib/redis';
import { decrypt, decryptData } from '@/app/shared/utility/encryption'
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.NEXTAUTH_SECRET;

// Handling GET request and redirecting
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log('**********', searchParams)
  const application_contributor_id = searchParams.get('application_contributor_id');
  const user_id = searchParams.get('user_id');
  const application_id = searchParams.get('application_id');
  const role = searchParams.get('role');

  const cookieStore = cookies();
  const emailPasswordAuthToken = cookieStore.get('email_password_auth_token');
  const sessionToken = cookieStore.get('sessionToken');
  const pk = cookieStore.get('pk');
  const secretKey2 = decryptData(sessionToken?.value, pk?.value);

  const userData = emailPasswordAuthToken ? JSON.parse(decryptData(emailPasswordAuthToken.value, secretKey2)) : undefined;
  const redisData = await redisClient.get(userData.email);
  const token = redisData ? JSON.parse(redisData).access : null;

  const jwtToken = jwt.sign(
    {token, application_contributor_id, user_id, application_id, role},
    SECRET_KEY,
    { expiresIn: 86400 } // 24 hours
  )
  const url = `${process.env.NEXT_PUBLIC_HUBZONE_URL}?&wt=${jwtToken}`
  if (token) {
    return NextResponse.redirect(url);
  }

  return null
}
