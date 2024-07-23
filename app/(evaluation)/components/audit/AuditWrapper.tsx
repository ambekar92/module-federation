'use client'
import React, { useEffect, useState } from 'react'
import Audit from './Audit';
import { Pagination } from '@trussworks/react-uswds';
import { useAudit } from '@/app/services/queries/useAudit';

const AuditWrapper = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const { isLoading, data } = useAudit(page, pageSize);

    useEffect(() => {
        if (data && data.pageSize) setPageSize(data.pageSize)
    }, [data])

    function onNext() {
        setPage(p => p + 1)
    }
    function onPrevious() {
        setPage(p => p - 1)
    }
    function onPageNumber(e: any, number: number) {
        setPage(number);
    }
    function onPageSizeChange(e: any) {
        setPageSize(e.target.value);
        setPage(1)
    }

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <Audit page={page} pageSize={pageSize} />
            { data && data.items.length > 0 &&
                <>
                    <div style={{ float: 'left' }}>
                        <label htmlFor='page-size'>Rows per view:</label>
                        <select
                            onChange={onPageSizeChange}
                            id='page-size'
                            name='page-size'
                            value={pageSize}
                            style={{ width: '6rem', display: 'block', marginTop: '.5rem' }}>
                            <option value='5'>5</option>
                            <option value='10'>10</option>
                            <option value='15'>15</option>
                            <option value='20'>20</option>
                        </select>
                    </div>
                    <Pagination
                        style={{ background: 'transparent' }}
                        currentPage={page}
                        maxSlots={7}
                        onClickNext={onNext}
                        onClickPageNumber={(e, n) => onPageNumber(e, n)}
                        onClickPrevious={onPrevious}
                        totalPages={40} pathname={''} />
                </>
            }
        </div>
    )
}

export default AuditWrapper