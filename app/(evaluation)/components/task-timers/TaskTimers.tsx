'use client'
import { useSessionUCMS } from '@/app/lib/auth';
import { IRTFRequestItem } from '@/app/services/types/evaluation-service/RTFItems';
import { calculateTimeDifference, convertSeconds } from '@/app/shared/utility/convertSeconds';
import { getUserRole } from '@/app/shared/utility/getUserRole';
import { Accordion, Alert, Table } from '@trussworks/react-uswds';
import { AccordionItemProps } from '@trussworks/react-uswds/lib/components/Accordion/Accordion';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRtfRequestData } from '../rtf-rfi/hooks/useRtfRequestData';
import Spinner from '@/app/shared/components/spinner/Spinner';

const TaskTimers = () => {
  const params = useParams<{application_id: string}>();
  const sessionData = useSessionUCMS()
  const userRole = getUserRole(sessionData?.data?.permissions || []);
  const [ tasks, setTasks ] = useState<IRTFRequestItem[]>();
  const { requestData, isLoading, hasError: hasRfiError } = useRtfRequestData(params.application_id, userRole);

  useEffect(() => {
    requestData && requestData.length > 0 && setTasks(requestData)
  }, [requestData]);

  if(hasRfiError) {
    return <Alert headingLevel='h4' type="error" heading="">Error loading Task Timers</Alert>;
  }

  const taskDropdownItems: AccordionItemProps[] = tasks?.map((task, index) => ({
    id: task.id.toString(),
    title: userRole === 'screener' ? 'Return to Business' : 'Request for Information',
    content: (
      <Table bordered={true} fullWidth>
        <thead>
          <tr>
            <th>Tasks</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {task && task.items.length > 0 && task.items.map((taskTimer, index) => (
            <tr key={index}>
              <td>{taskTimer.request}</td>
              <td>
                {task.closed
                  ? calculateTimeDifference(task.opened, task.closed)
                  : convertSeconds(parseInt(task.total_seconds))
                }
              </td>
            </tr>
          ))}
          {(!requestData || requestData.length === 0 || tasks.length === 0) && <tr>
            <td colSpan={4}>No task timers found.</td>
          </tr>}
        </tbody>
      </Table>
    ),
    expanded: index === 0 ? true : false,
    headingLevel: 'h2',
  })) ?? [{
    id: '007',
    title: userRole === 'screener' ? 'Return to Business' : 'Request for Information',
    content: (
      <Table bordered={true} fullWidth>
        <thead>
          <tr>
            <th>Tasks</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={4}>No task timers found.</td>
          </tr>
        </tbody>
      </Table>
    ),
    expanded: true,
    headingLevel: 'h2',
  }];

  return (
    <div>
      <h1>Task Timers</h1>
      {isLoading && <Spinner center />}
      {!isLoading && (
        <>
          <p>Task timers represent the amount of time spent on each task. Time is rounded up to the nearest hour and/or day.</p>
          <Accordion items={taskDropdownItems} multiselectable={true} />
        </>
      )}
    </div>
  )
}

export default TaskTimers
