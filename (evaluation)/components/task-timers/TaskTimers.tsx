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
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem aperiam dolorem quibusdam error veritatis sit laudantium! Possimus, deleniti autem. Voluptate repellat veritatis facere eos suscipit consectetur fugit impedit distinctio necessitatibus?</p>

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