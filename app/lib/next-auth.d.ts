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
      idToken: string;
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
	ANALYST = 'analyst',
	APPROVER = 'approver',
	SCREENER_COMMON = 'screener_common_app',
	ANALYST_LOW = 'analyst_low_tier',
	ANALYST_HIGH = 'analyst_high_tier',
	REVIEWER_LOW = 'reviewer_low_tier',
	REVIEWER_HIGH = 'reviewer_high_tier',
	APPROVER_AABD = 'approver_8a_aabd',
	APPROVER_DELEGATE = 'approver_8a_delegate',
	ANALYST_OGC = 'analyst_contributor_ogc',
	ANALYST_OSS = 'analyst_contributor_oss'
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
    entities: any[],
    access: string
}

declare module '@auth/core/jwt' {
  interface JWT extends DefaultJWT {
    role: 'external_user' | 'primary_qualifying_owner' | 'contributor' | 'admin'
  }
}
