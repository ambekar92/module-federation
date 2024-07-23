'use client'
import { Grid } from '@trussworks/react-uswds'
import moment from 'moment'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from '../Messages.module.scss'
import { InboxItem } from '@/app/services/types/communication-service/Inbox'
import { Avatar } from '@mui/material'
import { useThreads } from '@/app/services/queries/communication-service/useThreads'

const EmailListItem = ({ email}: { email: InboxItem}) => {
    const [read, setRead] = useState<boolean>(email.total_unread === 0);
    const router = useRouter();
    const params = useParams<{ messageId: string }>();

    useEffect(() => {
        if (!params || !params.messageId) return;
        if (params.messageId === email.uuid) {
            setRead(true);
        }

    }, [params?.messageId])

    function onMessageClick() {
        setRead(true);
        router.push(`/messages/${email.uuid}`)
    }
    return (
        <div
            className={'cursor-pointer position-relative'}
            onClick={onMessageClick}>
            <div className={params.messageId === email.uuid ? styles['email-focused'] : ''} style={{overflow: 'hidden'}}>
                <Grid row className="flex-align-center">
                    <Grid col={3} className="display-flex">
                        <Grid col={2}>
                            <div className={`${styles['email-dot-icon']}`}>
                                {
                                    read === false && (
                                        <img
                                            data-testid="emailList-test-list"
                                            className="logo_sm margin-right-05"
                                            src="/messageIcons/sba_dot_circle.png"
                                            alt="read_mail"
                                        />
                                    )
                                }
                            </div>
                        </Grid>
                        <Grid col={10}>
                            <div className={styles['email-icon']}>
                                <Avatar>{email.sender.display_name?.split(' ')?.map(n => n[0]).join('')}</Avatar>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid col={9}>
                        <p className={`${styles['name-text']} text-primary margin-y-0`}>
                            {email.sender.display_name}
                        </p>
                        <p data-testid="email-subject"
                            className={`text-bold margin-top-0 margin-bottom-05`}
                        >
                            {email.subject}
                        </p>
                        <div className={`${styles['name-mail']} margin-y-0`}>
                            {moment(email.sent_at).format('MM/DD/yyyy, hh:mm a')}
                        </div>
                    </Grid>
                </Grid>
            </div>

        </div>
    )
}

export default EmailListItem