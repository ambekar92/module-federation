'use client'
import ReassignUserModal from '@/app/(evaluation)/components/modals/reassign-user-modal/ReassignUserModal';
import { ReassignType } from '@/app/(evaluation)/components/modals/reassign-user-modal/types';
import { FIRM_EVALUATION_PAGE, buildRoute } from '@/app/constants/url';
import { useSessionUCMS } from '@/app/lib/auth';
import { useUserTaskDashboard } from '@/app/services/queries/evaluation-service/useUserTaskDashboard';
import { Show } from '@/app/shared/components/Show';
import TableHeader from '@/app/shared/components/table-header/TableHeader';
import TablePagination from '@/app/shared/components/table-pagination/TablePagination';
import { Role } from '@/app/shared/types/role';
import { isRole } from '@/middleware';
import {
  Button,
  ModalRef,
  Table
} from '@trussworks/react-uswds';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styles from '../WorkloadDashboard.module.scss';
import { fullName, sortData } from '../helpers';
import { DashboardSearchParams, IColumn, PAGE_SIZE, supervisorColumns, userColumns } from '../types';
import FirmInfoCell from './FirmInfoCell';
import Header from './Header';

const TableProvider = ({ searchParams }: {searchParams: DashboardSearchParams}) => {
  const sessionData = useSessionUCMS()
  const [columns, setColumns] = useState<IColumn[]>(supervisorColumns);
  const {data: tasks, isLoading} = useUserTaskDashboard();
  const router = useRouter();
  const modalRef = useRef<ModalRef | null>(null);
  
  useEffect(() => {
    if (!sessionData.data) {return;}
    if (isRole(sessionData.data.permissions, Role.EXTERNAL)) {
      setColumns(userColumns);
    } else {
      setColumns(supervisorColumns)
    }
  }, [sessionData, sessionData?.data?.permissions?.length]);

  function onReassign(applicationId: number) {
    const endIdx = window.location.href.indexOf('&application_id') > -1 ? window.location.href.indexOf('&application_id') : window.location.href.length;
    const currentUrl = window.location.href.substring(0, endIdx);
    router.push(`${currentUrl}&application_id=${applicationId.toString()}`, {scroll: false});
    modalRef.current?.toggleModal();
  }

  return (
    <>
      <Header />
      {isLoading && <p>Loading...</p>}

      <Table scrollable bordered striped fullWidth>
        {!isLoading && <TableHeader
          defaultSortColumn='legal_business_name'
          columns={columns} />}

        {tasks && tasks.length > 0 && <tbody>
          {tasks.sort((a,b) => sortData(a, b, searchParams)).slice((parseInt(searchParams.page) - 1) * PAGE_SIZE, (parseInt(searchParams.page) - 1) * PAGE_SIZE + PAGE_SIZE).map((task) => (
            //TODO set key to a unique value. current data does not have unique id, so using assignment_date as key
            <tr key={task.assignment_date}> 
              <td>
                <div className={styles.firmInfo}>
                  <span>
                    <Link href={buildRoute(FIRM_EVALUATION_PAGE, { application_id: task.application_id?.toString() })}>
                      {task.legal_business_name}
                    </Link>
                  </span>
                  <FirmInfoCell task={task} />
                </div>
              </td>
              <td>{task.certifications?.join(', ')}</td>
              <td>{task.application_type_name}</td>
              <td>{task?.days_in_queue}</td>
              <td>{moment(task.due_on).format('MMM/DD/yy')}</td>
              <Show>
                <Show.When isTrue={isRole(sessionData.data?.permissions, Role.EXTERNAL) }>
                  <td>N/A</td>
                </Show.When>
              </Show>
              <td>{task.status}</td>
              <Show.When isTrue={!isRole(sessionData.data?.permissions, Role.EXTERNAL)}>
                <td>{fullName(task.assigned_to)}</td>
              </Show.When>
              <td>
                  <Button type='button' onClick={()=> onReassign(task.application_id)}>
                  	Re-Assign
                  </Button>
              </td>
            </tr>
          ))}
        </tbody>}

      </Table>
      {(!tasks || !tasks.length) && <tbody>
        <tr style={{ width: '100%',display: 'inline-block', textAlign: 'center', height: '200px'}}>
            No data
        </tr>
      </tbody>}

      {tasks && tasks.length > 0 && Math.ceil(tasks?.length / PAGE_SIZE) > 1 && <TablePagination totalPages={Math.ceil(tasks?.length / PAGE_SIZE)} />}
     <ReassignUserModal modalRef={modalRef} reassignType={ReassignType.REASSIGN_ANALYST} applicationId={Number(searchParams.application_id)} />
    </>
  )
}

export default TableProvider
