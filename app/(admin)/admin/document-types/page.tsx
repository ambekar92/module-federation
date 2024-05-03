import { Suspense } from 'react';
import DocumentTypesTable from './components/DocumentTypesTable';
import Search from './components/Search';

const DocumentTypes = async ({searchParams}: any) => {
  return (
    <div>
        <h1>Document Types</h1>
        <Search />
        <Suspense fallback={<div>Loading...</div>}>
          <DocumentTypesTable searchParams={searchParams} />
        </Suspense>
    </div>
  )
}

export default DocumentTypes