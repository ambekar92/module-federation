'use client'
import { useTaskTimers } from '@/app/services/queries/useTaskTimers'
import { Table } from '@trussworks/react-uswds'

const TaskTimers = () => {
    const { data, isLoading } = useTaskTimers()

    return (
        <div>
            <h1>Task Timers</h1>
            {isLoading && <p>Loading...</p>}
            {!isLoading && <>
                <p>Task timers represent the amount of time spent on each task. Time is rounded up to the nearest hour and/or day. </p>

                <Table bordered={true} fullWidth>
                    <thead>
                        <tr>
                            <th>Tasks</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 && data.map((taskTimer, index) => (
                            <tr key={index}>
                                <td>{taskTimer.name}</td>
                                <td>{taskTimer.time}</td>
                            </tr>
                        ))}
                        {(!data || data.length === 0) && <tr>
                            <td colSpan={4}>No task timers found.</td>
                        </tr>}
                    </tbody>
                </Table>
            </>}
        </div>
    )
}

export default TaskTimers