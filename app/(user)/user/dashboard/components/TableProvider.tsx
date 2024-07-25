'use client'
import { USER_TASK_DASHBOARD_ROUTE } from '@/app/constants/routes';
import { FIRM_EVALUATION_PAGE, buildRoute } from '@/app/constants/url';
import { useSessionUCMS } from '@/app/lib/auth';
import { fetcherGET } from '@/app/services/fetcher-legacy';
import { Show } from '@/app/shared/components/Show';
import TableHeader from '@/app/shared/components/table-header/TableHeader';
import TablePagination from '@/app/shared/components/table-pagination/TablePagination';
import {
  Button,
  Table
} from '@trussworks/react-uswds';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import styles from '../WorkloadDashboard.module.scss';
import { IColumn, PAGE_SIZE, Task, supervisorColumns, userColumns } from '../types';
import FirmInfoCell from './FirmInfoCell';
import Header from './Header';
// import { isRole } from '@/middleware';
import { Role } from '@/app/shared/types/role';
import Link from 'next/link';
import ActionMenuModal from '@/app/shared/components/modals/ActionMenuModal';
import dialogsConfig from '../../../../(evaluation)/components/utils/actionMenuData.json';

const TableProvider = ({ searchParams }: { searchParams: { sortColumn: keyof Task, sortOrder: 'asc' | 'desc', page: string } }) => {
  const sessionData = useSessionUCMS()
  const [columns, setColumns] = useState<IColumn[]>(supervisorColumns);
  const [showModal, setShowModal] = useState(false);

  const dialogConfig = dialogsConfig.data.find((item) => item.optionLabel === 'Analyst: Reassign User') as any

  const {data: tasks, isLoading} = useSWR<Task[]>(sessionData.data?.user_id ? `${USER_TASK_DASHBOARD_ROUTE}/${sessionData.data?.user_id}` : null, fetcherGET)
  useEffect(() => {
    if (!sessionData.data || sessionData.data.permissions?.length) {return;}
    if (isRole(sessionData.data.permissions, Role.EXTERNAL)) {
      setColumns(userColumns);
    } else {
      setColumns(supervisorColumns)
    }
  }, [sessionData]);

  function filteredTasks(): Task[] {
    return tasks?.slice((parseInt(searchParams.page) - 1) * PAGE_SIZE, (parseInt(searchParams.page) - 1) * PAGE_SIZE + PAGE_SIZE) as Task[]
  }

  function showReassignDialog() {
    setShowModal(true)
  }

  // temporary function to replace isRole from @/middleware. will swich back to the one from @/middleware once determined which user role corresponds to analyst
  function isRole(permissions: any, role: any) {
    return false;
  }

  function sortData(a: Task, b: Task) {
    const sortBy = searchParams.sortColumn ?? 'legal_business_name';
    const sortOrder = searchParams.sortOrder ?? 'asc';
    if (!isNaN(Number(a[sortBy]))) {
      return sortOrder === 'desc' ? Number(b[sortBy]) - Number(a[sortBy]) :  Number(a[sortBy]) - Number(b[sortBy])
    }
    return sortOrder === 'desc' ? ((a as Task)[sortBy] as string)?.localeCompare(b[sortBy] as string) : ((b as Task)[sortBy] as string)?.localeCompare(a[sortBy] as string)
  }

  const handleAction = () => {
    setShowModal(false)
  }

  const handleCancel = () => {
    setShowModal(false)
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
                  <span>
                    <Link href={buildRoute(FIRM_EVALUATION_PAGE, { application_id: task.application_id.toString() })}>
                      {task.legal_business_name}
                    </Link>
                  </span>
                  <FirmInfoCell task={task} />
                </div>
              </td>
              {/* TODO populate this once api returns this data  */}
              <td>{task.certifications.join(', ')}</td>
              <td>{task.application_type_name}</td>
              <td>{task?.days_in_queue}</td>
              <td>{task?.due_on && task?.due_on.split('T')[0]}</td>
              <Show>
                <Show.When isTrue={isRole(sessionData.data?.permissions, Role.EXTERNAL) }>
                  {/* TODO populate this once api returns this data */}
                  <td>N/A</td>
                </Show.When>
              </Show>
              <td>{task.status}</td>
              <Show.When isTrue={!isRole(sessionData.data?.permissions, Role.EXTERNAL)}>
                <td>{task.assigned_to.first_name} {task.assigned_to.last_name}</td>
                <td>
                  <Button type='button' onClick={showReassignDialog}>
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
      {dialogConfig && dialogConfig.length && <ActionMenuModal
        open={showModal}
        title={dialogConfig.title}
        actionLabel={dialogConfig.actionLabel}
        userIdType={dialogConfig.userIdType}
        modalType={dialogConfig.modalType}
        description={dialogConfig.description}
        steps={dialogConfig.steps}
        id={dialogConfig.id}
        table={dialogConfig.table as any}
        signature={dialogConfig.signature}
        upload={dialogConfig.upload}
        uploadStep={dialogConfig.uploadStep}
        notes={dialogConfig.notes as any}
        approvalLetter={dialogConfig.approvalLetter as any}
        handleAction={handleAction}
        handleCancel={handleCancel} process_id={0}
        />}
    </>
  )
}

export default TableProvider
