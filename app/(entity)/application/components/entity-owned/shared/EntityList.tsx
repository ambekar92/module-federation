import { CustomTable } from '@/app/shared/components/CustomTable'
import { EntityFormType } from '../schema'

const EntityList = ({
  entities,
  handleEdit,
  handleDelete,
}: {
  entities: EntityFormType[]
  handleEdit: (index: number) => void
  handleDelete: () => void
}) => {
  const entityHeaders = [
    { id: 'entityType', headerName: 'Entity Type' },
    { id: 'entityName', headerName: 'Entity Name' },
    { id: 'contactInfo', headerName: 'Contact Information' },
    { id: 'contactLoc', headerName: 'Contact Location' },
  ]

  const entityRows = entities.map((entity, index) => ({
    id: index,
    entityType: entity.entityType,
    entityName: entity.entityName,
    contactInfo: `${entity.firstName} ${entity.middleName ?? ''} ${entity.lastName}, email: ${entity.contactInfo.email}, phone: ${entity.contactInfo.phoneNumber}`,
    contactLoc: `${entity.contactLocation.mailingAddress}, ${entity.contactLocation.city} ${entity.contactLocation.state} ${entity.contactLocation.zip}`,
  }))

  return (
    <>
      {entityRows.length > 0 && (
        <>
          <h3>Controlling Entity</h3>
          <CustomTable
            header={entityHeaders}
            rows={entityRows}
            editable={true}
            remove={true}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}
    </>
  )
}

export default EntityList
