export type Contributor = {
  contributorRole: 'role_owner' | 'role_other' | 'role_spouse' | 'role_owner_eligible';
  firstName?: string;
  lastName?: string;
  emailAddress: string;
};
