import UserActivityList from './components/UserActivityList';
import { ActivityResponse } from './types';

const page = async ({params: {id}}: {params: {id: string}}) => {
    const  data: ActivityResponse  = await getData(id);
  return (
    <UserActivityList data={data?.actions} />
  )
}

export async function getData(id: string) {
  try {
    const res = await fetch(`https://ucms-internal-api.demo.sba-one.net/api/v1/activities/user/${id}`);
    if (res.status !== 200) throw new Error('error')
    const data = await res.json();
    return data; 
  } catch (e) {
    console.error(e)
  }

  }

export default page

