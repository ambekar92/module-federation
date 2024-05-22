import React from 'react';
import dynamic from 'next/dynamic';

// Import the Attestation component dynamically and disable SSR
// TODO: This is really just to allow the build to work will need to be fixed once API is up -KJ
const Attestation = dynamic(() => import('./components/Attestation'), {
  ssr: false
});

const AttestationPage = () => {
  return (
    <Attestation />
  )
}
export default AttestationPage
