'use client'
import { Suspense, useState } from 'react'
import { Grid } from '@trussworks/react-uswds'
import DocumentTypesTable from './components/DocumentTypesTable'
import Search from './components/Search'
import { ModalsAddUsers } from '../document-types/components/AddDocumentForm'

const DocumentTypes = async ({ searchParams }: any) => {
  const [rowCount, setRowCount] = useState(0)
  const [newRow, setNewRow] = useState([])
  const [loading, setLoading] = useState()
  return (

    <div>
      <h1>Document Types</h1>
      <Grid row>
        <Grid className="grid-col flex-10 ">
          <Search />
        </Grid>
        <Grid className="display-flex flex-row  flex-align-end margin-top-6">
          { (loading===false)?(<ModalsAddUsers rowCount={rowCount} onAddDocument={setNewRow} />):(<div>Loading...</div>)}
        </Grid>
      </Grid>
      <Suspense fallback={<div>Loading...</div>}>
        <DocumentTypesTable
          onRowCountChange={setRowCount}
          searchParams={searchParams}
          newRow={newRow}
          addDocumentLoad={setLoading}
        />
      </Suspense>
    </div>

  )
}

export default DocumentTypes
