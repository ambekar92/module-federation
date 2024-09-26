'use client'
import { Show } from '@/app/shared/components/Show';
import { Alert } from '@trussworks/react-uswds';
import Programs from './components/Programs';
import WhatsNext from './components/WhatsNext';
import Resources from './components/Resources';
import { useFormContext } from 'react-hook-form';
import { programs } from './programs';
import { useEffect, useState } from 'react';
import { Program } from './types';

const ResultsPage = () => {
  const {getValues} = useFormContext();
  const [eligiblePrograms, setEligiblePrograms] = useState<Program[]>([]);

  useEffect(() => {
    const values = getValues();
    if (values && Object.keys(values).length > 0) {
      const progms = programs.filter(program => {
        const rules = program.rules;
        let isEligible = true;

        for (const key in rules) {
          for (const rule in rules[key]) {
            const programRule = rules[key][rule];
            const userResponse = values[key]?.[rule];

            if (program.title === 'HUBZone' && rule === 'underFinancialLimits') {continue;}

            if (programRule !== userResponse) {
              isEligible = false;
              break;
            }
          }
          if (!isEligible) {break;}
        }

        return isEligible;
      });
      setEligiblePrograms(progms);
    }
  }, [getValues]);

  return (
    <>
      <header>
        <h1>Results</h1>
      </header>
      <main>
        <Show>
          <Show.When isTrue={eligiblePrograms.length > 0}>
            <Alert type='success' headingLevel='h2' heading='You May Be Eligible'>
              <span>Based on your responses, you may be eligible for the following SBA Certification Programs.</span>
            </Alert>
            <Programs programs={eligiblePrograms} />
            <WhatsNext />
          </Show.When>
          <Show.Otherwise>
            <Alert type='warning' headingLevel='h2' heading='You May Not Be Eligible'>
              <span>Based on your responses, you may not be eligible for any SBA Certification Programs. Review the eligibility criteria detailed <a target='_blank' href='https://www.sba.gov/federal-contracting/contracting-assistance-programs/8a-business-development-program#section-header-4' rel="noreferrer">here</a>.</span>
            </Alert>
            <h2>Here&apos;s why you may be not be eligible</h2>
            <ul>
              <li>Be at least 51% owned and controlled by U.S. citizens</li>
              <li>In order to participate in the SBA Certification Program, the owner(s) of the business must not have been debarred or suspended by a federal entity.</li>
              <li>You must own and control a small business in the U.S. to participate in the SBA Certification Program.</li>
              <li>Please ensure your SAM.gov account is active and current before applying for the SBA Certification Program.</li>
            </ul>
            <Resources />
          </Show.Otherwise>
        </Show>
      </main>
    </>
  )
}

export default ResultsPage
