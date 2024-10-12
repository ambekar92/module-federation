import { INBOX_ROUTE } from '@/app/constants/local-routes'
import { useSessionUCMS } from '@/app/lib/auth'
import { useInbox } from '@/app/services/queries/communication-service/useInbox'
import { InboxItem, InboxResponse } from '@/app/services/types/communication-service/Inbox'
import Spinner from '@/app/shared/components/spinner/Spinner'
import axios from 'axios'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import styles from '../Messages.module.scss'
import EmailListItem from './EmailListItem'
import React from 'react'

const InboxEmailList = () => {
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [loadedEmails, setLoadedEmails] = useState<InboxItem[]>([])
  const session = useSessionUCMS();
  const {data, isLoading} = useInbox()

  useEffect(() => {
    if (data && data.results) {
      setLoadedEmails(prevEmails => {
        const newEmails = data.results.filter(newEmail =>
          !prevEmails.some(existingEmail => existingEmail.uuid === newEmail.uuid)
        );
        return [...prevEmails, ...newEmails];
      });
      setHasMore(data.pagination.next_page !== null);
    }
  }, [data])

  async function fetchMoreData() {
    setPage(curr => curr + 1);
    const response = await axios.get<InboxResponse>(
      `${session.data?.user_id ? `${INBOX_ROUTE}/${session.data?.user_id}` : ''}`
    );
    setHasMore(response.data.pagination.next_page !== null);
    setLoadedEmails(prevEmails => {
      const newEmails = response.data.results.filter(newEmail =>
        !prevEmails.some(existingEmail => existingEmail.uuid === newEmail.uuid)
      );
      return [...prevEmails, ...newEmails];
    });
  }

  if(!data?.results) {
    return <Spinner center />
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <InfiniteScroll
        style={{
          overflowX: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
        height="100%"
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Spinner center />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>All emails loaded</b>
          </p>
        }
        dataLength={loadedEmails.length}
      >
        {loadedEmails.map((email: InboxItem, idx: number) => (
          <React.Fragment key={email.uuid}>
            <EmailListItem email={email} />
            {idx < (loadedEmails.length-1) && <div className={styles.line}></div>}
          </React.Fragment>
        ))}
        {!isLoading && loadedEmails.length === 0 && <p>No emails found</p>}
      </InfiniteScroll>
    </div>
  )
}

export default InboxEmailList
