'use client'
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import EightaQuestions from '../fragments/EightaQuestions';
import IndividualQuestions from '../fragments/IndividualQuestions';

// Import the Attestation component dynamically and disable SSR
// NOTE: This is really just to allow the build to work will need to be fixed once API is up -KJ
const Attestation = dynamic(() => import('../fragments/Attestation'), {
  ssr: false
});

interface AdditionalInfoPageProps {
  params: {
    section?: string;
  };
}

const AdditionalInformationPage: React.FC<AdditionalInfoPageProps> = ({ params: { section } }) => {
  const searchParams = useSearchParams();
  const stepParam = searchParams.get('step');
  const step = stepParam ? parseInt(stepParam, 10) : 0;

  return (
    <>
      {section === 'individual' && <IndividualQuestions step={step} />}
      {section === 'eighta' && <EightaQuestions step={step} />}
      {section === 'attestation' && <Attestation />}
    </>
  );
};

export default AdditionalInformationPage;
