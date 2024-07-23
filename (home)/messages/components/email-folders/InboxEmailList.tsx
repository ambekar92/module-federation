import { useSessionUCMS } from '@/app/lib/auth'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import styles from '../Messages.module.scss'
import { mock_inbox_emails, useMockInboxEmails } from '../mock-inbox-emails'
import EmailListItem from './EmailListItem'
import { InboxItem, InboxResponse } from '@/app/services/types/communication-service/Inbox'
import { useInbox } from '@/app/services/queries/communication-service/useInbox'
import { axiosInstance } from '@/app/services/fetcher'
import { INBOX_ROUTE } from '@/app/constants/routes'

const InboxEmailList = () => {
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [height, setHeight] = useState<number>(100);
  const [page, setPage] = useState<number>(1);
  const [loadedEmails, setLoadedEmails] = useState<InboxItem[]>([])

  const session = useSessionUCMS();
  // const { data, isLoading } = useSWR<InboxResponse>(`${session.data?.user_id ? `${INBOX_ROUTE}/${session.data?.user_id}?page=1` : ''}`, fetcherGET);
  const  {data, isLoading}  = useInbox()
  // const  {data, isLoading}  = useMockInboxEmails()


  useEffect(() => {
    if (data) {
      setLoadedEmails([...loadedEmails, ...data.results])
      setHasMore(data.pagination.next_page !== null);
      if (data.results.length > 20) {
        setHeight(750)
      }
      else if (data.results.length >= 10) {
        setHeight(500)
      } else {
        setHeight(200)
      }
    }
  }, [data])

  async function fetchMoreData() {
    setPage(curr => curr + 1)
    const response = await axiosInstance.get<InboxResponse>(`${session.data?.user_id ? `${INBOX_ROUTE}/${session.data?.user_id}` : ''}`);
    setHasMore(response.data.pagination.next_page !== null)
    setLoadedEmails(prev => [...prev, ...response.data.results])
    
    // const response = await axiosInstance.get<InboxResponse>(`${session.data?.user_id ? `${INBOX_ROUTE}/20` : ''}`);
    // const response = await new Promise(res => setTimeout(() => res(mock_inbox_emails as any) , 1000)) as InboxResponse
    // setHasMore(page < 3)
    // setLoadedEmails(prev => [...prev, ...response.results])
  }

  return (
    <InfiniteScroll 
      style={{overflowX: 'hidden'}}
      height={height}
      next={fetchMoreData} 
      hasMore={hasMore} 
      loader={<p>Loading...</p>} 
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>All emails loaded</b>
        </p>
      }
      dataLength={loadedEmails.length} >
      {loadedEmails.length > 0 && loadedEmails.map((email: InboxItem, idx: number) => (
        <>
        <EmailListItem email={email}  key={email.uuid} />
        {idx < (loadedEmails.length-1) && <div className={styles.line}></div>}
        </>
      ))}
      {!isLoading && loadedEmails.length === 0 && <p>No emails found</p>}
    </InfiniteScroll>
  )
}

export default InboxEmailList
