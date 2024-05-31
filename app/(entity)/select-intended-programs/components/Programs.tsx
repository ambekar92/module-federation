'use client'
import { Button, Grid } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useState } from 'react';
import { ProgramOption, sbaProgramOptions } from '../../../constants/sba-programs';
import ProgramCard from '../../../shared/components/ownership/ProgramCard';

function Programs() {
  const [selectedPrograms, setSelectedPrograms] = useState<ProgramOption[]>([]);

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
      <h1>Select Intended Program(s) for Application</h1>
      <Grid row gap>
        {sbaProgramOptions.map((program, index) => (
          <Grid key={index} className='margin-bottom-2' desktop={{ col: 6 }} tablet={{ col: 12 }}  mobile={{ col: 12 }}>
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
                  onChange={(e) => {
                    e.stopPropagation();
                    handleCheckboxChange(program);
                  }}
                />
              }
              onClick={() => handleCardClick(program)}
            />
          </Grid>
        ))}
      </Grid>
      <div className='display-flex flex-justify'>
        <Link href='/add-delegate' className='usa-button usa-button--outline'>
					Back
        </Link>
        {selectedPrograms.length === 0
          ? (
            <Button disabled type='button'>
							Next
            </Button>
          ) : (
            <Link href='/application/ownership' className='usa-button'>
							Next
        		</Link>
          )}
      </div>
    </>
  )
}
export default Programs
