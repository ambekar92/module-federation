'use client'
import { useSearchParams, useParams } from 'next/navigation';
import FirmAppDoneLayout from '@/app/(evaluation)/components/done/FirmAppDoneLayout';
import { firmDoneData } from '@/app/(evaluation)/components/done/constants';

function FirmApplicationDonePage() {
  const searchParams = useSearchParams();
  const params = useParams<{application_id: string}>();
  const name = searchParams.get('name');
  // Finds the data with the name that matches searchParams
  const data = firmDoneData.find(item => item.name === name);

  if (!data) {
    return <div>Invalid name parameter</div>;
  }

  return (
    <>
      <FirmAppDoneLayout
        header={data.header}
        bodyText={data.body}
        buttonText={data.buttonText}
        buttonLink={data.buttonLink}
        alertText={data.alertText}
        applicationId={params.application_id}
      />
    </>
  );
}

export default FirmApplicationDonePage;
