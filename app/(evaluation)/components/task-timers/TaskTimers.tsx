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
  const params = useParams<{ application_id: string }>();
  const sessionData = useSessionUCMS()
  const userRole = getUserRole(sessionData?.data?.permissions || []);
  const [tasks, setTasks] = useState<IRTFRequestItem[]>();
  const { requestData, isLoading, hasError: hasRfiError } = useRtfRequestData(params.application_id, userRole);

  useEffect(() => {
    requestData && requestData.length > 0 && setTasks(requestData)
  }, [requestData]);

  if (hasRfiError) {
    return <p>{hasRfiError}</p>
  }

  const taskData = [
    { id: '1', task: 'Time with Business (initial submission)', time: '3 hours' },
    { id: '2', task: 'Time in First Level Review', time: '12 Days' },
    { id: '3', task: 'Time in Next Level Review', time: '5 hours' },
    { id: '4', task: 'Time in Final Review', time: '1 hour' },
    { id: '5', task: 'Time with Business (Return To Business)', time: '2 hours' }
  ];

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
          {/* <Accordion items={taskDropdownItems} multiselectable={true} /> */}
          <Table bordered={true} fullWidth>
            <thead>
              <tr>
                <th>Tasks</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {taskData.map((task) => (
                <tr key={task.id}>
                  <td>{task.task}</td>
                  <td>{task.time}</td>
                </tr>
              ))}
            </tbody>
          </Table>

        </>
      )}
    </div>
  )
}

export default TaskTimers
