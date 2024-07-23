import React from 'react'
import dynamic from 'next/dynamic';

// Import the Attestation component dynamically and disable SSR
// NOTE: This is really just resolves the 'document not found error' will need to be changed once API is up -KJ
const OrganizeUsers = dynamic(() => import('./components/UCPRolesPermission'), {
  ssr:false
});
<OrganizeUsers />
export default OrganizeUsers
