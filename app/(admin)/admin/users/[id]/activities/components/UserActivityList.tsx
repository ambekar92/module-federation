'use client'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Avatar } from '@mui/material';
import { Grid, Pagination, Search } from '@trussworks/react-uswds';
import Fuse from 'fuse.js';
import moment from 'moment';
import React from 'react';
import { IAction } from '../types';
import styles from './UserActivity.module.scss';
import { Show } from '@/app/shared/components/Show';
const PAGE_SIZE = 10;

const UserActivityList = ({ data }: { data: IAction[] }) => {
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState('');

    const fuse = new Fuse(data, { keys: ['verb', 'title', 'action.displayName', 'action.targetName'], threshold: 0.1 })
    const activity = search ? fuse.search(search).map((el) => el.item) : data;

    function handlePageCilck(_: unknown, p: number) {
        setPage(p)
    }
    function handlePageNext() {
        setPage(page + 1)
    }
    function handlePagePrev() {
        setPage(page - 1)
    }
    return (
        <div>
            <h1>Activity Stream</h1>
            <>
                <Search role='search' onSubmit={(e) => {
                    e.preventDefault();
                    setPage(1);
                    setSearch(((e.target as HTMLFormElement)[0] as HTMLInputElement).value);
                }} className={styles.search} />
            </>
            <hr style={{ margin: '2rem 0' }} />
            {activity?.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * (page - 1) + PAGE_SIZE).map((el, idx) => (
                <Accordion key={idx} role='region'>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Grid row gap={4}>
                            <p>{moment(el.published).format('mm/DD/yy hh:mm a')}</p>
                            <Avatar sx={{ bgcolor: '#3d3d3d' }}>{el.actor.displayName.slice(0,2)}</Avatar>
                            <p style={{ fontWeight: 'bold' }}>{el.actor.displayName}</p>
                            <p>{el.verb}</p>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p>{el.title}</p>
                    </AccordionDetails>
                </Accordion>
            ))}
            <Show>
                <Show.When isTrue={Math.ceil(activity?.length / PAGE_SIZE) > 0} >
                    <Pagination pathname={''} role='navigation'
                    currentPage={page}
                    totalPages={Math.ceil(activity?.length / PAGE_SIZE)}
                    onClickPageNumber={handlePageCilck}
                    onClickNext={handlePageNext}
                    onClickPrevious={handlePagePrev} />
                </Show.When>
            </Show>
        </div>
    )
}

export default UserActivityList