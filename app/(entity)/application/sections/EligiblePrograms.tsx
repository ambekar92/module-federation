'use client';
import { Button, ButtonGroup, Grid } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ProgramOption, sbaProgramOptions } from '@/app/constants/sba-programs';
import ProgramCard from '@/app/shared/components/ownership/ProgramCard';
import { setDisplayStepNavigation, setStep } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';
import { applicationSteps } from '../utils/constants';

function EligiblePrograms() {
  const [selectedPrograms, setSelectedPrograms] = useState<ProgramOption[]>([]);
  const [eligiblePrograms, setEligiblePrograms] = useState<ProgramOption[]>(sbaProgramOptions);

  const dispatch = useApplicationDispatch();
  useEffect(() => {
    dispatch(setStep(applicationSteps.eligiblePrograms.stepIndex));
    dispatch(setDisplayStepNavigation(false));
  }, [dispatch]);

  useEffect(() => {
    const storedPrograms = localStorage.getItem('eligiblePrograms');
    if (storedPrograms) {
      const programNames = JSON.parse(storedPrograms) as string[];
      const programs = programNames.map(name => sbaProgramOptions.find(program => program.name.includes(name))).filter(Boolean) as ProgramOption[];
      setEligiblePrograms(programs);
    } else {
      localStorage.setItem('eligiblePrograms', JSON.stringify(sbaProgramOptions.map(program => program.name)));
      setEligiblePrograms(sbaProgramOptions);
    }
  }, []);

  const handleCheckboxChange = (program: ProgramOption) => {
    setSelectedPrograms(prev => {
      const isAlreadySelected = prev.find(p => p.name === program.name);
      if (isAlreadySelected) {
        return prev.filter(p => p.name !== program.name);
      } else {
        return [...prev, program];
      }
    });
  };

  const handleCardClick = (program: ProgramOption) => {
    handleCheckboxChange(program);
  };

  return (
    <>
      <h1>
        {eligiblePrograms.length === 0
          ? 'Your business does not qualify for any programs'
          : 'To which programs would you like to apply today?'
        }
      </h1>
      {eligiblePrograms.length > 0 ? <p>You appear to be eligible for the programs below. Please select the ones for which you&apos;d like to apply</p> : null}
      <Grid row gap>
        {eligiblePrograms.map((program, index) => (
          <Grid key={index} className='margin-bottom-2' desktop={{ col: 6 }} tablet={{ col: 12 }} mobile={{ col: 12 }}>
            <ProgramCard
              className={`height-full ${selectedPrograms.find(p => p.name === program.name) ? 'blue-bg' : ''}`}
              program={program.name}
              description={program.description}
              details={program.details}
              onClick={() => handleCardClick(program)}
              input={
                <input
                  className="custom-checkbox"
                  type="checkbox"
                  checked={selectedPrograms.some(p => p.name === program.name)}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleCheckboxChange(program);
                  }}
                />
              }
            />
          </Grid>
        ))}
      </Grid>
      <div className='flex-fill'></div>
      <hr className='margin-y-3 width-full border-base-lightest'/>
      <ButtonGroup className='display-flex flex-justify'>
        <Link href={applicationSteps.controlAndOwnership.link} className='usa-button usa-button--outline'>
          Back
        </Link>
        {selectedPrograms.length === 0 && eligiblePrograms.length !== 0 ? (
          <Button disabled type='button'>
            Next
          </Button>
        ) : (
          <Link href={applicationSteps.questionnaire.link} className='usa-button'>
            Next
          </Link>
        )}
      </ButtonGroup>
    </>
  );
}
export default EligiblePrograms;
