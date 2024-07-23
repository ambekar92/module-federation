'use client'
import styles from '../utils/DocumentsList.module.scss';
import { useState } from 'react';
import { useApplicationId } from '@/app/shared/hooks/useApplicationIdResult';
import { GET_DOCUMENTS } from '@/app/constants/routes';
import { fetcherGET } from '@/app/services/fetcher';
import { DocumentsType } from '@/app/services/types/document';
import useSWR from 'swr';
import DocsHeader from './DocsHeader';
import DocsTable from './DocsTable';

function DocumentsContainer() {
  const [menu, setMenu] = useState<HTMLElement | null>(null)
  const [mainMenu, setMainMenu] = useState(0)

  const { userId } = useApplicationId()

  // Get Documents Data
  const { data: responseData, error: responseError, isLoading } = useSWR(
    userId
      ? `${GET_DOCUMENTS}/?user_id=${userId}`
      // ? `${GET_DOCUMENTS}/?user_id=8`
      : null,
    fetcherGET<DocumentsType>,
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
