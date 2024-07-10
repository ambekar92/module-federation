import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress';
import { QuestionnaireProps } from '../utils/types';
import ContributorForm from '../components/contributor-invite/ContributorForm';

function ContributorInvitation({contributorId}: QuestionnaireProps) {
  useUpdateApplicationProgress('Contributor Invitation');

  return (
    <>
      <div>
        <h1>Contributor Invitations</h1>
      </div>

      <ContributorForm contributorId={contributorId} />
    </>
  )
}
export default ContributorInvitation
