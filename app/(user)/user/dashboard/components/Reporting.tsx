import { useSessionUCMS } from '@/app/lib/auth';
import { Role } from '@/app/shared/types/role';
import { isRole } from '@/middleware';
import { faker } from '@faker-js/faker';
import { Card, Collection, CollectionItem } from '@trussworks/react-uswds';

const Reporting = () => {
  const list =  Array(3).fill({}).map(el => ({name: faker.company.buzzNoun(), id: Math.random()}))

  const session = useSessionUCMS();
  if (!session.data || isRole(session.data?.permissions, Role.EXTERNAL)) {return null;}

  return (<>
    <h3>Reporting</h3>
    <Card gridLayout={{ desktop: { col: 3 } }}
      containerProps={{
        className: 'bg-base-lightest border-6'
      }}
    >
      <Collection color='base-lightest' style={{ paddingTop: 0 }} >
        {list.map((l, idx) => <CollectionItem key={l.id}
          style={{ border: 'none', marginTop: idx === 0 ? '0' : 'normal', paddingTop: idx === 0 ? '0' : 'normal' }}>
          {l.name}
        </CollectionItem>)}
      </Collection>
    </Card>
  </>
  )
}

export default Reporting
