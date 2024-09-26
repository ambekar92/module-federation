'use client'
import { useSender } from '@/app/services/queries/communication-service/useSender';
import { useThreads } from '@/app/services/queries/communication-service/useThreads';
import { Card } from '@trussworks/react-uswds';
import { CSSProperties } from 'react';

const flexStyles: CSSProperties  = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  lineHeight: '1rem',
  padding: '1rem',
  gap: '1rem',
  borderBottom: '1px solid #e1e1e1'
}

const EmailContent = () => {

  const {data, isLoading} = useThreads();
  // const {data: sender} = useSender();

  return (
    <Card style={{height: '100vh'}}>
      {data && <><div>

        {/* commenting To field out temporarily till api is finalized */}
        {/* <div style={flexStyles}>
                <strong>To:</strong><span className='text-base'>{data?.[0]?.messages?.[0]?.sender.display_name}</span>
            </div> */}
        {/* <div style={flexStyles}>
          <strong>From:</strong><span className='text-base'>{sender?.email}</span>
        </div> */}
        <div style={flexStyles}>
          <strong>Subject:</strong><span className='text-base'>{data?.[0]?.subject}</span>
        </div>
      </div>
      <div style={{padding: '1rem'}}>
        <p>
          {data?.[0]?.messages?.[0]?.content}
        </p>

      </div> </>}
      {
        !data && !isLoading && <p>This message no longer exists...</p>
      }
    </Card>
  )
}

export default EmailContent
