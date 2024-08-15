import React from 'react';
import Link from 'next/link';
import { Button, Table } from '@trussworks/react-uswds';
import { FIRM_EVALUATION_PAGE, buildRoute } from '@/app/constants/url';
import { Show } from '@/app/shared/components/Show';
import TableHeader from '@/app/shared/components/table-header/TableHeader';
import TablePagination from '@/app/shared/components/table-pagination/TablePagination';
import { Role } from '@/app/shared/types/role';
import { isRole } from '@/middleware';
import styles from '../WorkloadDashboard.module.scss';
import { fullName, sortData } from '../helpers';
import { DashboardSearchParams, IColumn, PAGE_SIZE } from '../types';
import FirmInfoCell from './FirmInfoCell';
import { useCurrentPath } from '../hooks/useCurrentPath';
import humanizeString from 'humanize-string';
import { formatDate } from '@/app/shared/utility/formateDate';
import { formatProgramText } from '@/app/shared/utility/formatProgramText';

interface TableContentProps {
  tasks: any[];
  columns: IColumn[];
  searchParams: DashboardSearchParams;
  sessionData: any;
  onReassign: (applicationId: number) => void;
}

const TableContent: React.FC<TableContentProps> = ({ tasks, columns, searchParams, sessionData, onReassign }) => {
  const { isReviewersDashboard } = useCurrentPath();

  if(!tasks) {return}
  return (
    <>
      <Table scrollable bordered striped fullWidth>
        <TableHeader
          defaultSortColumn='legal_business_name'
          columns={columns}
          isReviewersDashboard={isReviewersDashboard}
        />
        <tbody>
          {tasks.length > 0 ? (
            tasks
              .sort((a, b) => sortData(a, b, searchParams))
              .slice((parseInt(searchParams.page) - 1) * PAGE_SIZE, (parseInt(searchParams.page) - 1) * PAGE_SIZE + PAGE_SIZE)
              .map((task) => (
                <tr key={task.application_id}>
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
                  <td>{formatProgramText(task.certifications?.join(', '))}</td>
                  <td>
                    {(() => {
                      const text = humanizeString(task.application_type_name);
                      return formatProgramText(text)
                    })()}
                  </td>
                  <td>{task?.days_in_queue}</td>
                  <td>{formatDate(task.due_on)}</td>
                  <Show>
                    <Show.When isTrue={isRole(sessionData.permissions, Role.EXTERNAL)}>
                      <td>N/A</td>
                    </Show.When>
                  </Show>
                  <td>{humanizeString(task?.application_workflow_state)}</td>
                  <Show.When isTrue={!isRole(sessionData.permissions, Role.EXTERNAL) && isReviewersDashboard}>
                    <td>{fullName(task.assigned_to)}</td>
                  </Show.When>
                  <Show.When isTrue={!isRole(sessionData.permissions, Role.EXTERNAL) && isReviewersDashboard}>
                    <td>
                      <Button type='button' onClick={() => onReassign(task.application_id)}>
                      	Re-Assign
                      </Button>
                    </td>
                  </Show.When>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: '50px 0' }}>
                No data
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {tasks.length > 0 && Math.ceil(tasks.length / PAGE_SIZE) > 1 && (
        <TablePagination totalPages={Math.ceil(tasks.length / PAGE_SIZE)} />
      )}
    </>
  );
};

export default TableContent;
