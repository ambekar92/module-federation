import React from 'react'
import dynamic from 'next/dynamic';

// Import the Attestation component dynamically and disable SSR
// NOTE: This is really just resolves the 'document not found error' will need to be changed once API is up -KJ
const CreateMessages = dynamic(() => import('./components/Messages'), {
  ssr: false
});

<CreateMessages/>

export default CreateMessages
