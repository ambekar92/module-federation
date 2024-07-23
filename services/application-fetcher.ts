import { axiosInstance } from './fetcher';

type ProgramApplicationType = {
	id: number,
	program_id: number,
	programs: {
		name: string,
		description: string | null,
		title: string
	}
}
export type ApplicationResponseType = {
	id: number;
	entity: number;
	application_type: {
		id: number;
		name: string;
		description: string;
		title: string;
	};
	program_application: [ProgramApplicationType];
	workflow_state: string;
	application_version: 1;
	deleted_at: string | null;
	created_at: string;
	updated_at: string;
	application_tier: string;
	application_expiration: string;
}
// If we ever use the error messages for something
// type ApplicationErrorResponseType = {
// 	loc: [string, number];
// 	msg: string;
// 	type: string;
// }

export type ApplicationResponse = ApplicationResponseType[];

export const applicationFetcherGet = async (url: string): Promise<ApplicationResponse> => {
  const response = await axiosInstance.get<ApplicationResponse>(url);
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error('API call unsuccessful');
  }
};
