'use client'
import { useExtendedmessages } from '@/app/services/queries/communication-service/useExtendedmessages'
import Spinner from '@/app/shared/components/spinner/Spinner'
import { Alert, Button, Table } from '@trussworks/react-uswds'
import moment from 'moment'
import { useState } from 'react'
import RichTextMessageContent from './RichTextMessageContent'

const MessagesPage = () => {
  const {data, isLoading, error} = useExtendedmessages();
  const [messageViewed, setMessageViewed] = useState<number | null>(null);

  if (isLoading) {return <Spinner />}
  if (error) {return <Alert headingLevel='h1' type="error">An error occurred while loading messages</Alert>}

  return (
    <div>
      <h1>Messages</h1>
      <Table bordered fullWidth={true}>
        <thead>
          <tr>
            <th>Received</th>
            <th>Subject</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {(!data || data.length === 0) && <tr><td colSpan={3}>No messages</td></tr>}
          {data && data.length > 0 && data.map((message) => {
            return (
              <>
                <tr key={message.id}>
                  <td>{moment(message.sent_at).format('MM/DD/YYYY hh:mm a')}</td>
                  <td>{message.subject}</td>
                  <td style={{width: '2rem'}}>
                    <Button style={{ fontSize: '.7rem', margin: '1rem 0', marginRight: '.5rem' }} type='button' outline
                      onClick={() => setMessageViewed(messageViewed === message.id ? null : message.id)}>
                      {messageViewed === message.id ? 'Hide' : 'View'}
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td color='white' colSpan={3} style={{ padding: '1rem', display: messageViewed === message.id ? '' : 'none' }}>
                    <RichTextMessageContent content={message.content} />
                  </td>
                </tr>
              </>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default MessagesPage
