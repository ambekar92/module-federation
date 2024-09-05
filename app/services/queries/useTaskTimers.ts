import { TASK_TIMERS_ROUTE } from '@/app/constants/routes';
import useSWR from 'swr';
import { TaskTimer } from '../types/TaskTimer';
import fetcher from '../fetcher';

export function useTaskTimers() {
  return useSWR<TaskTimer[]>(TASK_TIMERS_ROUTE)
}

// TODO mock task timers  - remove when api is ready [mdev]
const mockTaskTimers: TaskTimer[] = [
  {
    name: 'Task 1',
    time: '3 hours'
  },
  {
    name: 'Task 2',
    time: '10 days'
  },
  {
    name: 'Task 3',
    time: '43 seconds'
  },
  {
    name: 'Task 4',
    time: '1 hour'
  },
  {
    name: 'Task 5',
    time: '1 week'
  },
  {
    name: 'Task 6',
    time: '1 month'
  }

]
