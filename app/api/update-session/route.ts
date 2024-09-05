import { NextResponse } from 'next/server';
import { OKTA_POST_LOGIN_ROUTE } from '@/app/constants/routes';
import { encrypt } from '@/app/shared/utility/encryption';
import { axiosInstance } from '@/app/services/axiosInstance';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { user } = await request.json();
    if (!user || !user.profile || !user.profile[0] || !user.profile[0].okta_id) {
      return NextResponse.json({ message: 'Invalid user data' }, { status: 400 });
    }
    const postData = {
      user: {
        name: user.first_name + ' ' + user.last_name,
        email: user.email,
        okta_id: user.profile[0].okta_id
      },
      expires: Date.now() + 1000 * 60 * 60 * 24 * 30,
      csrfToken: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      colloportus: process.env.COLLOPORTUS
    };
    const userDetails = await axiosInstance.post(OKTA_POST_LOGIN_ROUTE, postData);
    if (userDetails.data.access) {
      const cookieStore = cookies();
      cookieStore.set('email_password_auth_token', encrypt(JSON.stringify(userDetails.data)));
      return NextResponse.json({ message: 'Session updated successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Failed to update session' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating user session:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}