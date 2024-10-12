'use client'
import { CREATE_USER_TO_USER_MESSAGE_ROUTE, NOTIFYING_READ_MESSAGE_ROUTE } from '@/app/constants/local-routes';
import { useSessionUCMS } from '@/app/lib/auth';
import { useUserThreads } from '@/app/services/queries/communication-service/useUserThreads';
import RichText from '@/app/shared/form-builder/form-controls/rich-text/RichText';
import { stripHtmlTags } from '@/app/shared/utility/stripHtmlTags';
import { zodResolver } from '@hookform/resolvers/zod';
import SendIcon from '@mui/icons-material/Send';
import { Alert, Button, Card } from '@trussworks/react-uswds';
import axios from 'axios';
import { CSSProperties, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { EmailContentReplyType, schema } from './email-folders/schema';
import React from 'react';
import { da } from '@faker-js/faker';

const flexStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  lineHeight: '1rem',
  padding: '1rem',
  gap: '1rem',
  borderBottom: '1px solid #e1e1e1'
}

const EmailContent = () => {
  const { data: session } = useSessionUCMS();
  const { data, isLoading, mutate } = useUserThreads();
  const [alertStatus, setAlertStatus] = useState<'success' | 'error' | null>(null);

  const methods = useForm<EmailContentReplyType>({
    resolver: zodResolver(schema),
    defaultValues: {
      response_body: ''
    }
  })

  useEffect(() => {
    const markAsRead = async () => {
      if(data && data[0]) {
        try {
          const payload = {
            id: data[0].messages[0].id,
          }
          await axios.put(NOTIFYING_READ_MESSAGE_ROUTE, payload);
        } catch (error) {
          if(process.env.NEXT_PUBLIC_DEBUG_MODE === 'true') {
            console.error('Failed to mark message as read:', error);
          }
        }
      }
    }

    markAsRead();
  }, [data]);

  async function onSubmit(formData: EmailContentReplyType) {
    if (stripHtmlTags(formData.response_body).trim().length === 0) {
      methods.setError('response_body', {message: 'Email reply cannot be empty'});
      return;
    }
    try {
      if(data?.[0]?.messages?.[0] && session?.user?.id) {
        const payload = {
          user_from_id: session?.user?.id,
          content: formData.response_body,
          subject: 'Re: ' + data?.[0]?.subject,
          user_to_id: data?.[0]?.messages?.[0]?.sender,
          thread_id: data?.[0]?.messages?.[0]?.thread,
        }
        const response = await axios.post(CREATE_USER_TO_USER_MESSAGE_ROUTE, payload);
        if(response && response.data && response.status === 200) {
          methods.reset();
          mutate();
          setAlertStatus('success');
        }
      } else {
        setAlertStatus('error');
        throw new Error('Failed to send email');
      }
    } catch (error) {
      if(process.env.NEXT_PUBLIC_DEBUG_MODE === 'true') {
        console.error('Failed to send email:', error);
      }
      setAlertStatus('error');
    }
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if(!data || data?.length === 0 && !isLoading) {
    return <p>No Message found...</p>
  }

  return (
    <>
      <Card>
        {data && Array.isArray(data) && data.length > 0 &&
				<>
				  {data?.[0].messages.map((message, index) => (
				    <>
				      <div className='margin-top-0' key={index}>
				        <div style={flexStyles} className='margin-top-0'>
				          <strong>Subject:</strong><span className='text-base'>{index > 0 ? 'RE: ' : ''}{data?.[0]?.subject}</span>
				        </div>
				      </div>
				      <div style={{padding: '1rem'}} className={`${index < data[0].messages.length - 1 && 'border-bottom-1px'} border-base-lighter`} dangerouslySetInnerHTML={{ __html: message.content }}></div>
				    </>
				  ))}
				</>
        }
        {
          !data && !isLoading && <p>This message no longer exists...</p>
        }
      </Card>
      {alertStatus === 'success' && (
        <Alert headingLevel='h3' type="success" heading="Success">
          Your email reply was sent successfully.
        </Alert>
      )}
      {alertStatus === 'error' && (
        <Alert headingLevel='h3' type="error" heading="Error">
          Failed to send email reply. Please try again.
        </Alert>
      )}
      <div className='margin-top-2 padding-x-1'>
        <FormProvider {...methods}>
          <div style={{position: 'relative'}}>
            <RichText<EmailContentReplyType>
              name={'response_body'}
              itemId={Math.random()}
              required={false}
            />
            <Button unstyled
              type="submit"
              disabled={!methods.formState.isValid}
              style={{
                position: 'absolute',
                right: '2rem',
                bottom: '0.5rem',
              }}
            >
              <SendIcon
                className='cursor-pointer hover:text-primary'
                onClick={methods.handleSubmit(onSubmit)}
              />
            </Button>
          </div>
        </FormProvider>
      </div>
    </>
  )
}

export default EmailContent
