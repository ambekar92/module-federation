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
			id: number;
			okta_id?: string;
    }
		expires: string
  }
}

enum Role {
  EXTERNAL= 'external_user',
  PRIMARY_QUALIFYING_OWNER= 'primary_qualifying_owner',
  CONTRIBUTOR= 'contributor',
  ADMIN= 'admin',
  INTERNAL= 'internal_user',
  SCREENER = 'screener',
	REVIEWER = 'reviewer',
	ANALYST = 'analyst'
}

export interface IUserPermission {
  id: number,
  slug: Role,
  name: string,
  description: string,
  parameters: string
}

export interface IUserDetails  {
	okta_id: boolean;
  user_id: number,
    permissions: IUserPermission[],
    entities: any[]
}

declare module '@auth/core/jwt' {
  interface JWT extends DefaultJWT {
    role: 'external_user' | 'primary_qualifying_owner' | 'contributor' | 'admin'
  }
}
