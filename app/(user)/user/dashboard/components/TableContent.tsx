import { FIRM_EVALUATION_PAGE, buildRoute } from '@/app/constants/url';
import { useDefaultUserTaskDashboard, useSelectedUserTaskDashboard } from '@/app/services/queries/evaluation-service/useUserTaskDashboard';
import { Show } from '@/app/shared/components/Show';
import TableHeader from '@/app/shared/components/table-header/TableHeader';
import TablePagination from '@/app/shared/components/table-pagination/TablePagination';
import { Role } from '@/app/shared/types/role';
import { formatProgramText } from '@/app/shared/utility/formatProgramText';
import { isRole } from '@/middleware';
import { Button, Table } from '@trussworks/react-uswds';
import humanizeString from 'humanize-string';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { fullName, sortData } from '../helpers';
import { useIsReviewersDashboard } from '../hooks/useIsReviewersDashboard';
import { DashboardSearchParams, IColumn, PAGE_SIZE, supervisorColumns, userColumns } from '../types';
import styles from '../WorkloadDashboard.module.scss';
import FirmInfoCell from './FirmInfoCell';
import { useSessionUCMS } from '@/app/lib/auth';

interface TableContentProps {
  searchParams: DashboardSearchParams;
  onReassign: (applicationId: number) => void;
}

const TableContent: React.FC<TableContentProps> = ({  searchParams, onReassign }) => {
  const isReviewersDashboard = useIsReviewersDashboard();
  const sessionData = useSessionUCMS();

  const [columns, setColumns] = useState<IColumn[]>(isReviewersDashboard ? supervisorColumns : userColumns);

  const {watch} = useFormContext();
  const selectedUserId = watch('userId');

  const {data: selectedTasks} = useSelectedUserTaskDashboard(selectedUserId ? Number(selectedUserId) : null);
  const {data: defaultTasks} = useDefaultUserTaskDashboard(!selectedUserId ? sessionData?.data?.permissions[sessionData?.data?.permissions.length - 1]?.slug : null);

  const tasks = selectedUserId ? selectedTasks : defaultTasks;

  useEffect(() => {
    if (!sessionData.data) {return;}
    if (isRole(sessionData.data.permissions, Role.INTERNAL) && isReviewersDashboard) {
      setColumns(supervisorColumns);
    } else {
      setColumns(userColumns);
    }
  }, [sessionData, sessionData?.data?.permissions?.length]);

  return (
    <>
      <Table scrollable bordered striped fullWidth>
        <TableHeader
          defaultSortColumn='legal_business_name'
          columns={columns}
        />
        <tbody>
          {tasks && tasks.length > 0 ? (
            tasks
              .sort((a, b) => sortData(a, b, searchParams))
              .slice((parseInt(searchParams.page) - 1) * PAGE_SIZE, (parseInt(searchParams.page) - 1) * PAGE_SIZE + PAGE_SIZE)
              .map((task) => (
                <tr className='text-base-darker' key={task.application_id}>
                  <td style={{backgroundColor: 'white', color: '#3d4551',}}>
                    <div className={styles.firmInfo}>
                      <span>
                        <Link href={buildRoute(FIRM_EVALUATION_PAGE, { application_id: task.application_id?.toString() })}>
                          {task.legal_business_name}
                        </Link>
                      </span>
                      <FirmInfoCell task={task} />
                    </div>
                  </td>
                  <td style={{backgroundColor: 'white', color: '#3d4551',}}>{formatProgramText(task.certifications?.join(', '))}</td>
                  <td style={{backgroundColor: 'white', color: '#3d4551',}}>
                    {(() => {
                      const text = humanizeString(task.application_type_name);
                      return formatProgramText(text)
                    })()}
                  </td>

                  {isRole(sessionData.data.permissions, Role.INTERNAL) && isReviewersDashboard ? (
                    <>
                      <td style={{backgroundColor: 'white', color: '#3d4551',}}>{task?.days_in_queue}</td>
                      <td style={{backgroundColor: 'white', color: '#3d4551',}}>{task.due_on ? moment(task.due_on).format('MM/DD/YYYY') : 'N/A'}</td>
                    </>
                  ) : (
                    <>
                      <td style={{backgroundColor: 'white', color: '#3d4551',}}>{task.submitted_on ? moment(task.submitted_on).format('MM/DD/YYYY') :  'N/A' }</td>
                      {/* <td style={{backgroundColor: 'white', color: '#3d4551',}}>N/A</td> */}
                      <td style={{backgroundColor: 'white', color: '#3d4551',}}>{task.due_on ? moment(task.due_on).format('MM/DD/YYYY') : 'N/A'}</td>
                      <td style={{backgroundColor: 'white', color: '#3d4551',}}>{task?.days_in_queue}</td>
                    </>
                  )}

                  <td style={{backgroundColor: 'white', color: '#3d4551',}}>{humanizeString(task?.application_workflow_state)}</td>

                  {isRole(sessionData.data.permissions, Role.INTERNAL) && isReviewersDashboard && (
                    <>
                      <td style={{backgroundColor: 'white', color: '#3d4551',}}>{fullName(task.assigned_to)}</td>
                      <td style={{backgroundColor: 'white', color: '#3d4551',}}>
                        <Button type='button' onClick={() => onReassign(task.application_id)}>
                          Re-Assign
                        </Button>
                      </td>
                    </>
                  )}
                </tr>
              ))
          ) : (
            <tr className='bg-white text-base-darker'>
              <td colSpan={columns.length} style={{ backgroundColor: 'white', color: '#3d4551', textAlign: 'center', padding: '50px 0' }}>
                No data
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {tasks && tasks.length > 0 && Math.ceil(tasks.length / PAGE_SIZE) > 1 && (
        <TablePagination totalPages={Math.ceil(tasks.length / PAGE_SIZE)} />
      )}
    </>
  );
};

export default TableContent;
