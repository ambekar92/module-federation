import { axiosInstance } from '@/app/services/axiosInstance';
import UserActivityList from './components/UserActivityList';
import { ActivityResponse } from './types';

const page = async ({params: {id}}: {params: {id: string}}) => {
  const  data: ActivityResponse  = await getData(id);
  return (
    <UserActivityList data={data?.actions} />
  )
}

async function getData(id: string) {
  try {
    const res = await axiosInstance.get(`https://ucms-internal-api.demo.sba-one.net/api/v1/activities/user/${id}`);
    if (res.status !== 200) {throw new Error('error')}
    const data = await res.data;
    return data;
  } catch (e) {
    console.error(e)
  }

}

export default page
