import { faker } from '@faker-js/faker';
import UserActivityList from './components/UserActivityList';
import { ActivityItem } from './types';

const page = async ({params: {id}}: {params: {id: string}}) => {
  
    const { data } = await getData(id)
   
  return (
    <UserActivityList data={data} />
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

  // temp data till api has some data
    const data: ActivityItem[] = 
    Array(100).fill({}).map((_, i) => ({
        dateTime: new Date().toISOString(), 
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        title: faker.lorem.words(13),
        description: faker.lorem.words(50)
    }));
  
   return { data }
  }

export default page

