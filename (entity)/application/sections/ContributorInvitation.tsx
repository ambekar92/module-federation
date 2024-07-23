import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress';
import { QuestionnaireProps } from '../utils/types';
import ContributorForm from '../components/contributor-invite/ContributorForm';

function ContributorInvitation({contributorId}: QuestionnaireProps) {
  useUpdateApplicationProgress('Contributor Invitation');

  return (
    <>
      <ContributorForm contributorId={contributorId} />
    </>
  )
}
export default ContributorInvitation
