import TableHeader from '@/app/shared/components/table-header/TableHeader';
import TablePagination from '@/app/shared/components/table-pagination/TablePagination';
import {
  Grid,
  Table
} from '@trussworks/react-uswds';
import styles from './WorkloadDashboard.module.scss';
import FirmInfoCell from './components/FirmInfoCell';
import { getDashboardData } from './mockData';
import { Task, columns } from './types';
import OpenAssignments from './components/OpenAssignments';
import Productivity from './components/Productivity';

const PAGE_SIZE = 20;

const UserDashboard = ({ searchParams }: {searchParams: {sortColumn: keyof Task, sortOrder: 'asc' | 'desc', page: string}}) => {
  const tasks = getDashboardData(400).sort(sortData) as unknown as Task[];

  function sortData(a: Task, b: Task) {
    const sortBy = searchParams.sortColumn ?? 'firmName';
    const sortOrder = searchParams.sortOrder ?? 'asc';
    return sortOrder === 'desc' ? (a as Task)[sortBy].localeCompare(b[sortBy]) : (b as Task)[sortBy].localeCompare(a[sortBy])
  }

  function filteredTasks(): Task[] {
    return tasks?.slice((parseInt(searchParams.page) - 1) * PAGE_SIZE, (parseInt(searchParams.page)-1) * PAGE_SIZE + PAGE_SIZE)
  }

  return (
    <div>
      <Grid row gap="md">
        <Grid className="mobile:grid-col-12 desktop:grid-col-8 border-bottom-1px">
          <h2>My Tasks</h2>
        </Grid>
        <Grid className="mobile:grid-col-12 desktop:grid-col-8">
          <Table scrollable bordered striped>
            <TableHeader
              defaultSortColumn='firmName'
              columns={columns} />
            <tbody>
              {filteredTasks().map((task) => (
                <tr key={task.id}>
                  <td>
                    <div className={styles.firmInfo}>
                      <span>{task.firmName}</span>
                      <FirmInfoCell task={task}/>
                    </div>
                  </td>
                  <td>{task.certification}</td>
                  <td>{task.applicationType}</td>
                  <td>{task.submittedOn}</td>
                  <td>{task.dueOn}</td>
                  <td>{task.daysInQueue}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {Math.ceil(tasks?.length / PAGE_SIZE) > 1 && <TablePagination totalPages={Math.ceil(tasks?.length / PAGE_SIZE)} />}
        </Grid>
        <Grid className="mobile:grid-col-12 desktop:grid-col-4">
          <div>
            <OpenAssignments />
          </div>

          <div>
            <Productivity />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default UserDashboard
