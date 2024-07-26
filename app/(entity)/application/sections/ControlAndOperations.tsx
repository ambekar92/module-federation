import { Button, ButtonGroup, GridContainer } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect } from 'react';
import ControlOperationsForm from '../components/control-and-operations/ControlOperationsForm';
import ControlOperationsTable from '../components/control-and-operations/ControlOperationsTable';
import { selectApplication, setCurrentOperatorEditIndex, setOperators, setShowControlOperationsForm, setStep } from '../redux/applicationSlice';
import { useApplicationDispatch, useApplicationSelector } from '../redux/hooks';
import { applicationSteps, qaAppLinkPrefix } from '../utils/constants';
import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress';
import { QuestionnaireProps } from '../utils/types';

function ControlAndOperations({contributorId}: QuestionnaireProps) {
  const dispatch = useApplicationDispatch();
  const { operators, showControlOperationsForm } = useApplicationSelector(selectApplication);
  useUpdateApplicationProgress('Control & Operations');

  const handleAddNew = () => {
    dispatch(setShowControlOperationsForm(true));
    dispatch(setCurrentOperatorEditIndex(null))
  };

  useEffect(() => {
    dispatch(setStep(applicationSteps.controlAndOwnership.stepIndex));
  }, [dispatch]);

  useEffect(() => {
    const savedOperators = localStorage.getItem('operators');
    if (savedOperators) {
      dispatch(setOperators(JSON.parse(savedOperators)));
    }
  }
  , [])

  return (
    <>
      <div>
        <h1>Control & Operations</h1>
        <h3 className="light" style={{ fontSize: '22px', fontWeight: 'lighter', lineHeight: '1.5' }}>
          Please enter the following information about any individual who is on the management team of the company, but is not an owner.
        </h3>
      </div>
      <div>
        <h2>Management Structure</h2>
        <p>Based on the information provided, [Business Name] is designated as a Partnership.</p>
        <p>If this designation is incorrect, please discontinue this application and update your information on <a href="/application">SAM.gov</a></p>
      </div>

      <hr className="margin-y-3 width-full" />

      <div className="display-flex flex-justify flex-align-center">
        <h3 className="margin-y-0">Partners, Members, and Controlling Individuals</h3>
        {operators.length === 0 && <Button type="button" outline onClick={() => handleAddNew()}>Add New</Button>}
      </div>

      <div className="flex-fill" style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
        <GridContainer containerSize="widescreen" className={`width-full padding-y-2 margin-top-2
        ${operators.length > 0 && 'bg-base-lightest'} ${showControlOperationsForm && 'bg-base-lightest'}`}>
          <ControlOperationsForm />
          <ControlOperationsTable />
        </GridContainer>

        <div className="flex-fill">
          {operators.length > 0 && (
            <div className="display-flex flex-justify-end">
              <Button type="button" outline onClick={() => handleAddNew()}>Add New</Button>
            </div>
          )}
        </div>

        <hr className="margin-y-3 margin-bottom-0 width-full border-base-lightest" />

        <ButtonGroup className="display-flex flex-justify padding-y-2 margin-right-2px">
          <Link className="usa-button usa-button--outline" aria-disabled={!contributorId} href={`${qaAppLinkPrefix}${contributorId}${applicationSteps.ownership.link}`}>
            Previous
          </Link>
          <Link className="usa-button" aria-disabled={!contributorId} href={`${qaAppLinkPrefix}${contributorId}${applicationSteps.eligiblePrograms.link}`}>
            Next
          </Link>
        </ButtonGroup>
      </div>
    </>
  );
}

export default ControlAndOperations;
