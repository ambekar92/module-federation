'use client'
import { APPLICATION_DOCUMENTS_ROUTE } from '@/app/constants/local-routes';
import { useSessionUCMS } from '@/app/lib/auth';
import fetcher from '@/app/services/fetcher';
import { DocumentsType } from '@/app/services/types/document';
import { useState } from 'react';
import useSWR from 'swr';
import styles from '../utils/DocumentsList.module.scss';
import DocsHeader from './DocsHeader';
import DocsTable from './DocsTable';
import Spinner from '@/app/shared/components/spinner/Spinner';

function DocumentsContainer() {
  const [menu, setMenu] = useState<HTMLElement | null>(null)
  const [mainMenu, setMainMenu] = useState(0)

  const session = useSessionUCMS();
  const userId = session?.data?.user.id;

  // Get Documents Data
  const { data: responseData, error: responseError, isLoading } = useSWR<DocumentsType>(
    `${APPLICATION_DOCUMENTS_ROUTE}?user_id=${userId}`
  )

  if(responseError) {
    return <h2>Error found, try again.</h2>
  }

  return (
    <div className={styles['documents-list']}>
      <DocsHeader mainMenu={mainMenu} setMainMenu={setMainMenu} setMenu={setMenu} menu={menu} />
      {isLoading && <Spinner center />}
      {responseData && <DocsTable documentsData={responseData} />}
    </div>
  )
}
export default DocumentsContainer
