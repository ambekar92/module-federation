import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress';
import ContributorInv from '../components/contributor-invite'

function ContributorInvitation() {
  useUpdateApplicationProgress('Contributor Invitation');

  return (
    <ContributorInv />
  )
}
export default ContributorInvitation
