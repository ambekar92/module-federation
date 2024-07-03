'use client'
import { USER_TASK_DASHBOARD } from '@/app/constants/routes';
import { Show } from '@/app/shared/components/Show';
import TableHeader from '@/app/shared/components/table-header/TableHeader';
import TablePagination from '@/app/shared/components/table-pagination/TablePagination';
import {
    Button,
    Table
} from '@trussworks/react-uswds';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from '../WorkloadDashboard.module.scss';
import { IColumn, PAGE_SIZE, Task, supervisorColumns, userColumns } from '../types';
import FirmInfoCell from './FirmInfoCell';
import Header from './Header';
import useSWR from 'swr';
import { fetcherGET } from '@/app/services/fetcher';

const TableProvider = ({ searchParams }: { searchParams: { sortColumn: keyof Task, sortOrder: 'asc' | 'desc', page: string } }) => {
    const sessionData = useSession()
    const [columns, setColumns] = useState<IColumn[]>([]);

    // no data is returned from the api atm, uncomment the below lines to test UI - [mdev]
    // const isLoading = false;
    // const tasks = [
    //     {
    //       "status": "Active",
    //       "assignment_date": "11/11/2021",
    //       "days_in_queue": 10,
    //       "application_id": 30,
    //       "application_type_id": 3,
    //       "entity_id": 5,
    //       "uei": "3ioiweoie",
    //       "legal_business_name": "XYZ Corp",
    //       "due_on": "12/11/2021",
    //       "submitted_on": "11/11/2021",
    //       "assigned_to": "John Doe"
    //     },
    //     {
    //       "status": "Past due",
    //       "assignment_date": "11/23/2021",
    //       "days_in_queue": 43,
    //       "application_id": 21,
    //       "application_type_id": 2,
    //       "entity_id": 90,
    //       "uei": "UIS",
    //       "legal_business_name": "Some Company Name",
    //       "due_on": "11/11/2021",
    //       "submitted_on": "11/11/2021",
    //       "assigned_to": "John Smith"
    //     }
    //   ]

    
    // no data is returned from the api atm, comment out the below line to test UI [mdev]
      const {data: tasks, isLoading} = useSWR<Task[]>(`${USER_TASK_DASHBOARD}/${sessionData.data?.user_id}`, fetcherGET)

      useEffect(() => {
        if (!sessionData.data) return;
        if (sessionData.data.permissions[0].slug === 'external_user') {
            setColumns(userColumns);
        } else {
            setColumns(supervisorColumns)
        }
    }, [sessionData]);

    function filteredTasks(): Task[] {
        return tasks?.slice((parseInt(searchParams.page) - 1) * PAGE_SIZE, (parseInt(searchParams.page) - 1) * PAGE_SIZE + PAGE_SIZE) as Task[]
    }

    function sortData(a: Task, b: Task) {
        const sortBy = searchParams.sortColumn ?? 'legal_business_name';
        const sortOrder = searchParams.sortOrder ?? 'asc';
        if (!isNaN(Number(a[sortBy]))) {
            return sortOrder === 'desc' ? Number(b[sortBy]) - Number(a[sortBy]) :  Number(a[sortBy]) - Number(b[sortBy]) 
        } 
        return sortOrder === 'desc' ? ((a as Task)[sortBy] as string)?.localeCompare(b[sortBy] as string) : ((b as Task)[sortBy] as string)?.localeCompare(a[sortBy] as string)
    }

    return (
        <>
        <Header />
        {isLoading && <p>Loading...</p>}
       
        <Table scrollable bordered striped fullWidth>
        {!isLoading && <TableHeader
            defaultSortColumn='legal_business_name'
            columns={columns} />}
        
         {tasks && tasks.length && <tbody>
            {filteredTasks().sort(sortData).map((task) => (
                <tr key={task.entity_id}>
                    <td>
                        <div className={styles.firmInfo}>
                            <span>{task.legal_business_name}</span>
                            <FirmInfoCell task={task} />
                        </div>
                    </td>
                    {/* TODO populate this once api returns this data  */}
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>{task.days_in_queue}</td>
                    <td>{task.due_on}</td>
                    <Show>
                        <Show.When isTrue={sessionData.data?.permissions[0].slug === "external_user" }>
                            {/* TODO populate this once api returns this data */}
                            <td>N/A</td>
                        </Show.When>
                    </Show>
                    <td>{task.status}</td>
                    <Show.When isTrue={sessionData.data?.permissions[0].slug !== "external_user"}>
                            <td>{(task as Task).assigned_to}</td>
                            <td>
                                <Button type='button'>
                                Re-Assign
                                </Button>
                                </td>
                        </Show.When>
                </tr>
            ))}
        </tbody>}
        
        </Table>
        {(!tasks || !tasks.length) && <tbody>
            <tr style={{ width: '100%',display: 'inline-block', textAlign: 'center', height: '200px'}}>
            No data
            </tr>
            </tbody>}

        {tasks && tasks.length && Math.ceil(tasks?.length / PAGE_SIZE) > 1 && <TablePagination totalPages={Math.ceil(tasks?.length / PAGE_SIZE)} />}
        </>
    )
}

export default TableProvider