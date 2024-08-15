'use client'
import { GET_DOCUMENTS } from '@/app/constants/routes';
import { useSessionUCMS } from '@/app/lib/auth';
import fetcher from '@/app/services/fetcher';
import { DocumentsType } from '@/app/services/types/document';
import { useState } from 'react';
import useSWR from 'swr';
import styles from '../utils/DocumentsList.module.scss';
import DocsHeader from './DocsHeader';
import DocsTable from './DocsTable';

function DocumentsContainer() {
  const [menu, setMenu] = useState<HTMLElement | null>(null)
  const [mainMenu, setMainMenu] = useState(0)

  const session = useSessionUCMS();
  const userId = session?.data?.user.id;

  // Get Documents Data
  const { data: responseData, error: responseError, isLoading } = useSWR<DocumentsType>(
    userId
      ? `${GET_DOCUMENTS}/?user_id=${userId}`
      // ? `${GET_DOCUMENTS}/?user_id=8`
      : null,
    fetcher,
  )

  if(responseError) {
    return <h2>Error found, try again.</h2>
  }

  return (
    <div className={styles['documents-list']}>
      <DocsHeader mainMenu={mainMenu} setMainMenu={setMainMenu} setMenu={setMenu} menu={menu} />
      {isLoading && <h2>Loading...</h2>}
      {responseData && <DocsTable documentsData={responseData} />}
    </div>
  )
}
export default DocumentsContainer
