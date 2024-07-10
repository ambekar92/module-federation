import { Grid } from '@trussworks/react-uswds'
import { Dispatch, SetStateAction, useState } from 'react'
import InitialsCircle from '../../../../(admin)/admin/users/components/AccountCircle'
import { InboxItem } from '../../types'
import styles from '../Messages.module.scss'
import moment from 'moment'

const EmailListItem = ({ email, isFocused, setFocusedEmailId }: { email: InboxItem, isFocused: boolean, setFocusedEmailId: Dispatch<SetStateAction<string>> }) => {
    const [read, setRead] = useState<boolean>(email.read);
    return (
        <div
            className={'cursor-pointer position-relative'}
            onClick={() => { setFocusedEmailId(email.uuid); setRead(true) }}>
            <div className={isFocused ? styles['email-focused'] : ''} style={{overflow: 'hidden'}}>
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
                                <InitialsCircle name={email.sender} />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid col={9}>
                        <p className={`${styles['name-text']} text-primary margin-y-0`}>
                            {email.sender}
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