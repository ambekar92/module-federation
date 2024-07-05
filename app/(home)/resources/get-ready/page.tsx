import React from 'react'

import dynamic from 'next/dynamic';

// Import the Attestation component dynamically and disable SSR
// NOTE: This is really just resolves the 'document not found error' will need to be changed once API is up -KJ
const Steps = dynamic(() => import('./Steps'), {
  ssr:false
});
<Steps />
export default Steps
