import { DocumentParams, useDocuments } from '@/app/services/queries/document-service/useDocuments';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useParams, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { useCurrentApplication } from '../../firm/useApplicationData';
import { useContributorData } from '../../utils/useContributorData';

function ApplicationDocument() {
  const { section_questions } = useParams<{application_id: string, section_questions: string}>();
  const searchParams = useSearchParams();
  const title = section_questions.replace(/-/g, ' ')
    .replace(/\band\b/gi, '&')
    .replace(/(\b\w)/g, l => l.toUpperCase())
    .replace(/^\//, '')
    .replace(/Eight A/g, '8(a)')

  const { applicationData } = useCurrentApplication();
  const { navItems } = useContributorData(applicationData);
  const contributorId = useMemo(() => {
    const searchParamId = searchParams.get('contributor_id');
    if (!searchParamId) {return applicationData?.application_contributor?.[0]?.id || null;}

    const isValidContributor = applicationData?.application_contributor?.some(
      contributor => contributor.id === parseInt(searchParamId)
    );

    return isValidContributor ? searchParamId : null;
  }, [searchParams, applicationData]);

  const documentSectionId = useMemo(() => {
    for (const items of navItems) {
      if (!items) {continue;}
      const foundItem = items.find(item =>
        item.url.includes(`${contributorId}/${section_questions}`)
      );
      if (foundItem) {return foundItem.id;}
    }
    return null;
  }, [navItems, contributorId, section_questions]);

  const { data: documentsData, error: documentsError, isLoading: isLoadingDocuments } = useDocuments({
    [DocumentParams.application_contributor_id]: (documentSectionId && contributorId) ? contributorId : null,
    [DocumentParams.application_section_id]: documentSectionId ? documentSectionId : null,
  });

  if (documentsError) {
    return <p>Error loading documents</p>
  }

  if (!isLoadingDocuments && (!documentsData || documentsData.length === 0 || !Array.isArray(documentsData))) {
    return <p>No documents found</p>
  }

  if(isLoadingDocuments) {
    return <p>Loading...</p>
  }
  return (
    <>
      <div>
        <p className='margin-y-0' style={{ textTransform: 'uppercase', fontSize: '12px' }}>{title}</p>
        <div className='grid-row'>
          {documentsData?.map(document => (
            <div key={document.id} className='grid-col-12 flex-align-center margin-top-2'>
              <a
                className='flex-align-center display-flex text-base-darker hover:text-primary'
                style={{ textDecoration: 'none', fontWeight: 400, fontSize: '16px' }}
                href={document.signed_url} target="_blank" rel="noreferrer"
              >
                {document.file_name.includes('.pdf') ? <PictureAsPdfIcon /> : <InsertDriveFileIcon />}
                <span className='margin-left-05'>{document.file_name}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ApplicationDocument
