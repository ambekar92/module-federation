import { InvitationType } from '@/app/services/types/application-service/Application';
import { Contributor } from '../components/contributor-invite/types';

export const findExistingInvitation = (contributor: Contributor, invitationData: InvitationType[] | undefined) => {
  if (contributor.contributorRole === 'role_spouse') {
    return invitationData?.find(
      invite =>
        invite.email.toLowerCase() === contributor.emailAddress.toLowerCase() &&
        invite.application_role.name === 'spouse-of-qualifying-owner'
    );
  } else if (contributor.contributorRole === 'role_owner_eligible') {
    return invitationData?.find(
      invite =>
        invite.email.toLowerCase() === contributor.emailAddress.toLowerCase() &&
        invite.application_role.name === 'qualifying-owner'
    );
  } else if (contributor.contributorRole === 'role_other') {
    return invitationData?.find(
      invite =>
        invite.email.toLowerCase() === contributor.emailAddress.toLowerCase() &&
        invite.application_role.name === 'other-individuals'
    );
  } else if (contributor.contributorRole === 'role_owner') {
    return invitationData?.find(
      invite =>
        invite.email.toLowerCase() === contributor.emailAddress.toLowerCase() &&
        invite.application_role.name === 'non-qualifying-owner'
    );
  }
  return undefined;
}
