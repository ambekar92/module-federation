'use client'
import React from 'react'
import Programs from '../components/Programs'
import { useParams } from 'next/navigation';

function SelectIndentedProgramsPage() {
  const params = useParams();
  const applicationId = parseInt(params.application_id as string, 10);

  return (
    <Programs applicationId={applicationId} />
  )
}
export default SelectIndentedProgramsPage
