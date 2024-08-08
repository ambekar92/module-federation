import ClientFirmUserDashboard from './components/ClientFirmUserDashboard';
import { Metadata, ResolvingMetadata } from 'next'
import { FIRM_APPLICATIONS_ROUTE } from '@/app/constants/routes'
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id
 
  // fetch data
  const product = await fetch(`${FIRM_APPLICATIONS_ROUTE}`).then((res) => res.json())
 console.log(product.created_at)
  // optionally access and extend (rather than replace) parent metadata

 
  return {
    title: product.name,
   
  }
}
 
export default async function FirmUserDashboard() {


  return(
    <> <ClientFirmUserDashboard /> <div></div></>)
}
