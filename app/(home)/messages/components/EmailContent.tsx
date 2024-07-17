'use client'
import { Card } from '@trussworks/react-uswds';
import { useParams } from 'next/navigation'
import React, { CSSProperties, useEffect, useState } from 'react';
import { mock_inbox_emails } from './mock-inbox-emails';
import { InboxItem } from '../types';

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
    const params = useParams<{messageId: string}>();
    const [email, setEmail] = useState<InboxItem | null>(null);

    useEffect(() => {
        if (!params.messageId) return;
        const found = mock_inbox_emails.results.find(e => e.uuid === params.messageId);
        if (!found) return;
        setEmail(found);
    }, [params.messageId])


  return (
    <Card style={{height: '100vh'}}>
        <div>
            <div style={flexStyles}>
                <strong>To:</strong><span className='text-base'>{email?.to}</span>
            </div>
            <div style={flexStyles}>
                <strong>From:</strong><span className='text-base'>{email?.sender}</span>
            </div>
            <div style={flexStyles}>
                <strong>Subject:</strong><span className='text-base'>{email?.subject}</span>
            </div>
        </div>
        <div style={{padding: '1rem'}}>
            <p>
                {email?.last_message}
            </p>
        </div>
    </Card>
  )
}

export default EmailContent