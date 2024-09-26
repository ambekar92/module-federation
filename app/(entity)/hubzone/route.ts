import { headers, cookies } from 'next/headers';
import redisClient from '@/app/lib/redis';
import { decrypt } from '@/app/shared/utility/encryption'
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

  const cookieStore = cookies();
  const emailPasswordAuthToken = cookieStore.get('email_password_auth_token');
  const userData = emailPasswordAuthToken ? JSON.parse(decrypt(emailPasswordAuthToken.value)) : undefined;
  const redisData = await redisClient.get(userData.email);
  const token = redisData ? JSON.parse(redisData).access : null;

  const jwtToken = jwt.sign(
    {token, application_contributor_id, user_id, application_id},
    SECRET_KEY,
    { expiresIn: 1800 }
  )
  const url = `${process.env.NEXT_PUBLIC_HUBZONE_URL}?&wt=${jwtToken}`
  if (token) {
    return NextResponse.redirect(url);
  }

  return null
}
