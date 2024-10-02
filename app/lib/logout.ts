import Cookies from 'js-cookie';
import { signOut } from 'next-auth/react';
import { decrypt, decryptData } from '@/app/shared/utility/encryption';

export async function logout() {
  const okta_oauth2_issuer = process.env.NEXT_PUBLIC_LOGOUT_URL;
  const encryptedIdToken = Cookies.get('idtoken');
  const sessionToken = Cookies.get('sessionToken');
  const pk = Cookies.get('pk');
  const secretKey2 = decryptData(sessionToken, pk);

  const idToken = encryptedIdToken ? decryptData(encryptedIdToken, secretKey2) : undefined;
  const post_logout_redirect_uri = encodeURIComponent(process.env.NEXT_PUBLIC_POST_REDIRECT_URL || '');

  Cookies.remove('email_password_auth_token');
  Cookies.remove('accesstoken');
  Cookies.remove('idtoken');
  Cookies.remove('next-auth.csrf-token', { path: '/' });
  Cookies.remove('next-auth.callback-url', { path: '/' });
  Cookies.remove('maxgov_auth_token');
  Cookies.remove('next-auth.session-token')
  Cookies.remove('applicationData');
  Cookies.remove('entityData');
  Cookies.remove('firstPermission');
  Cookies.remove('lastPermission');
  Cookies.remove('pk');
  Cookies.remove('sessionToken');

  localStorage.clear();

  await signOut({ redirect: false });

  if (idToken) {
    const logout_url = `${okta_oauth2_issuer}/oauth2/default/v1/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${post_logout_redirect_uri}`;
    window.location.href = logout_url;
  } else {
    window.location.href = '/';
  }
}
