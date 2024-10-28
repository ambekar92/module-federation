import { getOwnershipPropertyValue } from '@/app/(entity)/application/utils/getOwnershipPropertyValue'
import { QUESTIONNAIRE_ROUTE, USER_DEMOGRAPHICS_ROUTE } from '@/app/constants/local-routes'
import { UserDemographicsType } from '@/app/services/types/user-service/Demographics'
import { Question } from '@/app/shared/types/questionnaireTypes'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useCurrentApplication } from '../../firm/useApplicationData'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
type ExtendedDemographicsType = UserDemographicsType & {
  ownerPercent?: number;
}

function VaCert() {
  const [vets, setVets] = useState<ExtendedDemographicsType[]>([]);
  const { applicationData } = useCurrentApplication();

  const { data: userDemoData, error } = useSWR<UserDemographicsType[]>(
    applicationData ? `${USER_DEMOGRAPHICS_ROUTE}?application_id=${applicationData.id}` : null
  );

  const { data: ownerData, error: ownerError } = useSWR<Question[]>(
    applicationData ? `${QUESTIONNAIRE_ROUTE}/${applicationData?.application_contributor[0].id}/owner-and-management` : null
  );

  useEffect(() => {
    if (userDemoData && Array.isArray(userDemoData) && userDemoData.length > 0) {
      const ownerAnswers = ownerData?.[0]?.answer?.value?.answer || [];

      const processedVets = userDemoData.map(demo => {
        const matchingOwner = Array.isArray(ownerAnswers) && ownerAnswers.find((row: any) => {
          const firstName = getOwnershipPropertyValue(row, 'first_name_owner_and_management');
          const lastName = getOwnershipPropertyValue(row, 'last_name_owner_and_management');

          return (demo.first_name?.toLowerCase() === firstName?.toLowerCase()) ||
                 (demo.last_name?.toLowerCase() === lastName?.toLowerCase());
        });

        const ownerPercent = matchingOwner ?
          parseFloat(getOwnershipPropertyValue(matchingOwner, 'ownership_percentage_owner_and_management')) :
          undefined;

        return {
          ...demo,
          ownerPercent
        };
      });

      setVets(processedVets);
    }
  }, [ownerData, userDemoData]);

  if (error || ownerError || !vets || !vets.length) {
    return (
      <div className='grid-row margin-0'>
        <p>No data found.</p>
      </div>
    )
  }

  return (
    <>
      <div className='grid-row margin-0'>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            border: '1px solid #adadad',
            borderRadius: '4px',
            maxWidth: '100%',
            width: 'fit-content',
            overflowX: 'auto',
            marginTop: '20px',
            padding: '0 16px',
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell scope="col">Name</TableCell>
                <TableCell scope="col">Owner Type</TableCell>
                <TableCell scope="col">Reported Ownership %</TableCell>
                <TableCell scope="col">Reported Disability Rating</TableCell>
                <TableCell scope="col">VA Veteran Status</TableCell>
                <TableCell scope="col">Verified Veteran Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vets.map((row: ExtendedDemographicsType) => (
                <TableRow key={row.id}>
                  <TableCell scope="row">{row.first_name} {row.last_name}</TableCell>
                  <TableCell>Primary Qualified Owner</TableCell>
                  <TableCell>{row.ownerPercent ? `${row.ownerPercent}%` : 'N/A'}</TableCell>
                  <TableCell>{row.disability_rating}</TableCell>
                  <TableCell>{row.veteran_confirmation_status}</TableCell>
                  <TableCell>{row.veteran_verification_status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

export default VaCert
