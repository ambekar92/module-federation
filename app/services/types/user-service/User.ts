import { Role } from '@/app/lib/next-auth';

export type User = {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_staff: boolean;
    is_superuser: boolean;
    is_active: boolean;
    last_login: null | string;
    date_joined: string;
    prbac_role: PrbacRole[];
		profile: [
			{
				id: number,
				okta_id: string,
				sba_job_title: string | null,
				sba_office: string | null,
				out_of_office: boolean | null
			}
		]
};

type PrbacRole = {
    id: number,
    slug: Role,
    name: string,
    description: string,
    parameters: string
}

export type UpdateProfilePayloadType = {
	id: number,
	user_id: number,
	okta_id: string,
	out_of_office: boolean
}
