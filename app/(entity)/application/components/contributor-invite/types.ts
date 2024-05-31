export type Contributor = {
  contributorRole: 'role_owner' | 'role_other' | 'role_spouse';
  firstName?: string;
  lastName?: string;
  emailAddress: string;
};
