import { useEffect } from 'react';
import OwnershipLayout from '../components/ownership/OwnershipLayout';
import Partnership from '../components/ownership/Partnership'
import { setDisplayStepNavigation } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';

function Ownership() {
  const dispatch = useApplicationDispatch();

  useEffect(() => {
    dispatch(setDisplayStepNavigation(true));
  }, []);

  return (
    <OwnershipLayout>
      <Partnership />
    </OwnershipLayout>
  )
}
export default Ownership;
