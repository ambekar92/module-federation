import { Suspense } from 'react';
import DocumentCategoriesTable from './components/DocumentCategoriesTable';
import Search from './components/Search';

const DocumentCategories = async ({searchParams}: any) => {
  return (
    <div>
      <h1>Document Categories</h1>
      <Search />
      <Suspense fallback={<div>Loading...</div>}>
        <DocumentCategoriesTable searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

export default DocumentCategories
