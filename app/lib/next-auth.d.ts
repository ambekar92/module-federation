import 'next-auth';
import { DefaultJWT, JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends IUserDetails {
    csrfToken?: string;
    user: {
      name: string,
      email: string,
      image: string | undefined,
			accessToken?: string;
    },

  }

}

export interface IUserDetails  {
  user_id: number,
    permissions: {
      id: number,
      slug: 'external_user' | 'primary_qualify_owner' | 'contributor' | 'admin',
      name: string,
      description: string,
      parameters: string
    }[],
    entities: any[]
}

declare module '@auth/core/jwt' {
  interface JWT extends DefaultJWT {
    role: 'external_user' | 'primary_qualify_owner' | 'contributor' | 'admin'
  }
}
