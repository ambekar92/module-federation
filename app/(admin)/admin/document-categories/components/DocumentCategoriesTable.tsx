import { Table } from '@trussworks/react-uswds';
import { documentCategories } from '../tmp';
import TableHeader from './TableHeader';
import TablePagination from './TablePagination';

const PAGE_SIZE = 50;

interface IDocument {
  id: number;
  name: string;
  description: string;
}

async function getData() {
  let data;
  await new Promise((resolve) => setTimeout(() => resolve(documentCategories), 0)).then(res => {
    data = res})
  return data
}

const DocumentCategoriesTable = async ({ searchParams }: { searchParams: { sortColumn: 'name' | 'description', sortOrder: 'asc' | 'desc', q: string, page: string } }) => {
  const data = await getData().then(res => {
    return (res as unknown as IDocument[]).sort((a, b) => searchParams.sortColumn === 'name' && searchParams.sortOrder === 'asc' ? a.name.localeCompare(b.name) :
      searchParams.sortColumn === 'name' && searchParams.sortOrder === 'desc' ? b.name.localeCompare(a.name) :
        searchParams.sortColumn === 'description' && searchParams.sortOrder === 'asc' ? a.description.localeCompare(b.description) :
          searchParams.sortColumn === 'description' && searchParams.sortOrder === 'desc' ? b.description.localeCompare(a.description) : 0)
          .filter(item => item.name.toLowerCase().includes((searchParams.q ?? '').toLowerCase()))
          
  }) as unknown as IDocument[];
  return (
    <>
      <Table bordered fullWidth={true}>
        <TableHeader />
        <tbody>
          {data?.slice((parseInt(searchParams.page) - 1) * PAGE_SIZE, (parseInt(searchParams.page)-1) * PAGE_SIZE + PAGE_SIZE).map((item: any) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {Math.ceil(data?.length / PAGE_SIZE) > 1 && <TablePagination total={Math.ceil(data?.length / PAGE_SIZE)} />}
    </>
  )
}

export default DocumentCategoriesTable