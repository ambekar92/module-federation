'use client'
import { Show } from '@/app/shared/components/Show';
import TableHeader from '@/app/shared/components/table-header/TableHeader';
import TablePagination from '@/app/shared/components/table-pagination/TablePagination';
import {
    Button,
    Table
} from '@trussworks/react-uswds';
import { getSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import styles from '../WorkloadDashboard.module.scss';
import { getSupervisorDashboardData, getUserDashboardData } from '../mockData';
import { IColumn, PAGE_SIZE, SupervisorTask, Task, UserTask, supervisorColumns, userColumns } from '../types';
import FirmInfoCell from './FirmInfoCell';
import Header from './Header';
import SupervisorCtx from './supervisorContext';

const TableProvider = ({ searchParams }: { searchParams: { sortColumn: keyof Task, sortOrder: 'asc' | 'desc', page: string } }) => {
    const sessionData = getSession() // expect to get a role from this
    const supervisorCtx = useContext(SupervisorCtx)
    const [columns, setColumns] = useState<IColumn[]>([]);

    const [tasks, setTasks] = useState<any[]>([]);

    useEffect(() => {
        switch (supervisorCtx?.isSupervisor) {
            case true:
                setColumns(supervisorColumns)
                setTasks(getSupervisorDashboardData(400).sort(sortData)) as unknown as (Task & SupervisorTask);
                supervisorCtx?.setIsSupervisor(true)
                break;
            case false:
                setColumns(userColumns);
                setTasks(getUserDashboardData(400).sort(sortData)) as unknown as (Task & UserTask);
                supervisorCtx?.setIsSupervisor(false)
                break;
            default:
                break;
        }
    }, [supervisorCtx?.isSupervisor]);

    function filteredTasks() {
        return tasks?.slice((parseInt(searchParams.page) - 1) * PAGE_SIZE, (parseInt(searchParams.page) - 1) * PAGE_SIZE + PAGE_SIZE)
    }

    function sortData(a: Task, b: Task) {
        const sortBy = searchParams.sortColumn ?? 'firmName';
        const sortOrder = searchParams.sortOrder ?? 'asc';
        if (!isNaN(Number(a[sortBy]))) {
            return sortOrder === 'desc' ? Number(b[sortBy]) - Number(a[sortBy]) :  Number(a[sortBy]) - Number(b[sortBy]) 
        }
        return sortOrder === 'desc' ? (a as Task)[sortBy]?.localeCompare(b[sortBy]) : (b as Task)[sortBy]?.localeCompare(a[sortBy])
    }

    return (
        <>
            <Header />
        <Table scrollable bordered striped fullWidth>
        <TableHeader
            defaultSortColumn='firmName'
            columns={columns} />
            <tbody>
                {filteredTasks().sort(sortData).map((task) => (
                    <tr key={task.id}>
                        <td>
                            <div className={styles.firmInfo}>
                                <span>{task.firmName}</span>
                                <FirmInfoCell task={task} />
                            </div>
                        </td>
                        <td>{task.certification}</td>
                        <td>{task.applicationType}</td>
                        <td>{task.daysInQueue}</td>
                        <td>{task.dueOn}</td>
                        <Show>
                            <Show.When isTrue={!supervisorCtx?.isSupervisor}>
                                <td>{task.submittedOn}</td>
                            </Show.When>
                        </Show>
                        <td>{task.status}</td>
                        <Show.When isTrue={supervisorCtx?.isSupervisor}>
                                <td>{(task as Task & SupervisorTask).assignedTo}</td>
                                <td>
                                    <Button type='button'>
                                    {(task as Task & SupervisorTask).takeAction}

                                    </Button>
                                    </td>
                            </Show.When>
                    </tr>
                ))}
            </tbody>
        </Table>
        {Math.ceil(tasks?.length / PAGE_SIZE) > 1 && <TablePagination totalPages={Math.ceil(tasks?.length / PAGE_SIZE)} />}
        </>
    )
}

export default TableProvider