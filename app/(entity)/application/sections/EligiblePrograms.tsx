'use client';
import { Button, Grid } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ProgramOption, sbaProgramOptions } from '@/app/constants/sba-programs';
import ProgramCard from '@/app/shared/components/ownership/ProgramCard';
import { setDisplayStepNavigation, setStep } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';

function EligiblePrograms() {
  const [selectedPrograms, setSelectedPrograms] = useState<ProgramOption[]>([]);
  const [eligiblePrograms, setEligiblePrograms] = useState<ProgramOption[]>([]);

  const dispatch = useApplicationDispatch();
  useEffect(() => {
    dispatch(setStep(1));
    dispatch(setDisplayStepNavigation(false));
  }, [dispatch]);

  useEffect(() => {
    const storedPrograms = localStorage.getItem('eligiblePrograms');
    if (storedPrograms) {
      const programNames = JSON.parse(storedPrograms) as string[];
      const programs = programNames.map(name => sbaProgramOptions.find(program => program.name === name)).filter(Boolean) as ProgramOption[];
      setEligiblePrograms(programs);
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

  return (
    <>
      <h1>Select Eligible Program for Application</h1>
      <Grid row gap>
        {eligiblePrograms.map((program, index) => (
          <Grid key={index} className='margin-bottom-2' desktop={{ col: 6 }} tablet={{ col: 12 }} mobile={{ col: 12 }}>
            <ProgramCard
              className={`height-full ${selectedPrograms.find(p => p.name === program.name) ? 'blue-bg' : ''}`}
              program={program.name}
              description={program.description}
              details={program.details}
              input={
                <input
                  className="custom-checkbox"
                  type="checkbox"
                  checked={selectedPrograms.some(p => p.name === program.name)}
                  onChange={() => handleCheckboxChange(program)}
                />
              }
            />
          </Grid>
        ))}
      </Grid>
      <div className='display-flex flex-justify'>
        <Link href='/application/ownership' className='usa-button usa-button--outline'>
          Back
        </Link>
        {selectedPrograms.length === 0 ? (
          <Button disabled type='button'>
            Next
          </Button>
        ) : (
          <Link href='/application/control-and-operations' className='usa-button'>
            Next
          </Link>
        )}
      </div>
    </>
  );
}
export default EligiblePrograms;
