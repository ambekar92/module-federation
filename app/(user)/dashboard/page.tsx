import { getServerSession, Session } from 'next-auth'
import ClientFirmUserDashboard from './components/ClientFirmUserDashboard';

export default async function FirmUserDashboard() {
  const session: Session | null = await getServerSession()

  // temp
  return <ClientFirmUserDashboard session={session} />
}
