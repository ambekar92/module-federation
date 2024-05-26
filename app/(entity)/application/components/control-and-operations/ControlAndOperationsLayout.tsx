import { Button } from '@trussworks/react-uswds';
import React, { useEffect } from 'react';
import { setOwnerTypeSelected, setStep } from '../../redux/applicationSlice';
import { useApplicationDispatch } from '../../redux/hooks';

type ControlAndOperationsProps = {
  children: React.ReactNode;
};

function ControlAndOperations({children}: ControlAndOperationsProps) {
  const dispatch = useApplicationDispatch();

  const handleAddNew =() => {
    dispatch(setOwnerTypeSelected(true))
  }

  useEffect(() => {
    dispatch(setStep(1))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <h1>Control & Operations</h1>
        <p className='light' style={{fontSize: '22px', fontWeight: 'lighter', lineHeight: '1.5'}}>
				Please enter the following information about any individual who is on the legal management team of the company, but is not an owner.
        </p>
      </div>

      <hr className='margin-y-3 width-full border-base-lightest'/>

      <div className='display-flex flex-justify flex-align-center'>
        <h3 className='margin-y-0'>Partners, Members, and Controlling Individuals</h3>
        <Button type='button' outline onClick={() => handleAddNew()}>Add New</Button>
      </div>

      {children}
      <div className='flex-fill'></div>
    </>
  )
}
export default ControlAndOperations;
