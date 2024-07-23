import { getServerSession, Session } from 'next-auth'
import ClientFirmUserDashboard from './components/ClientFirmUserDashboard';

export default async function FirmUserDashboard() {
  return <ClientFirmUserDashboard />
}
