import { useApplicationId } from '@/app/shared/hooks/useApplicationIdResult';
import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress';
import { useEffect } from 'react';
import OwnershipLayout from '../components/ownership/OwnershipLayout';
import Partnership from '../components/ownership/Partnership';
import { setDisplayStepNavigation } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';
import { QuestionnaireProps } from '../utils/types';

function Ownership({contributorId}: QuestionnaireProps) {
  const dispatch = useApplicationDispatch();
  const { applicationId } = useApplicationId();
  useUpdateApplicationProgress('Ownership');

  useEffect(() => {
    dispatch(setDisplayStepNavigation(true));
  }, []);

  return (
    <OwnershipLayout applicationId={applicationId} contributorId={contributorId}>
      <Partnership />
    </OwnershipLayout>
  )
}
export default Ownership;
