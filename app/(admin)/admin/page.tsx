import { getSessionServer } from '@/app/lib/auth'

const AdminPage = async () => {
  await getSessionServer()
  return <div>Admin Page</div>
}

export default AdminPage
