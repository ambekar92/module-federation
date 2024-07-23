import { TASK_TIMERS_ROUTE } from "@/app/constants/routes";
import useSWR from "swr";
import { TaskTimer } from "../types/TaskTimer";

export function useTaskTimers() {
    //TODO update local fetcher to fetcher from services/fetcher.ts once refactor pr: pull/486 is merged [mdev]
    return useSWR<TaskTimer[]>(TASK_TIMERS_ROUTE, fetcher)
}

//TODO using this fetcher function as api does not yet exist, so mocking the response for now [mdev]
export const fetcher = async <T>(url: string): Promise<T> => {
    return new Promise(resolve => setTimeout(() => resolve(mockTaskTimers as unknown as T), 1500) )
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