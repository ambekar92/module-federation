'use client'
import React, { useEffect, useState, CSSProperties } from 'react'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import { Table } from '@trussworks/react-uswds'
import { ENTITIES_ROUTE } from '@/app/constants/routes'
import { fetcherGET } from '@/app/services/fetcher-legacy'

const Primary = () => {
  const leftColStyles: CSSProperties = {
    background: '#dfe1e2',
    fontWeight: 800,
    width: '30%',
  }
  const { data, error } = useSWR<any>(
    `${ENTITIES_ROUTE}?id=${useParams().entity_id}`,
    fetcherGET,
  )
  const [entityData, setEntityData] = useState([])

  useEffect(() => {
    if (data) {
      setEntityData(data)
    }
  }, [data])

  return (
    <>
      <h2>Primary</h2>
      <Table bordered fullWidth>
        <tbody>
          <tr>
            <td data-testid="business-name" style={leftColStyles}>
              Business Name
            </td>
            <td>
              {entityData.length > 0 &&
                entityData[0]['sam_entity']['legal_business_name']}
            </td>
          </tr>
          <tr>
            <td data-testid="dba" style={leftColStyles}>
              DBA
            </td>
            <td>
              {entityData.length > 0 && entityData[0]['sam_entity']['dba_name']}
            </td>
          </tr>
          <tr>
            <td data-testid="uei" style={leftColStyles}>
              UEI
            </td>
            <td>
              {entityData.length > 0 && entityData[0]['sam_entity']['uei']}
            </td>
          </tr>
          <tr>
            <td data-testid="address" style={leftColStyles}>
              Address
            </td>
            <td>
              {entityData.length > 0 &&
                entityData[0]['sam_entity']['physical_address_1']}
            </td>
          </tr>
          <tr>
            <td data-testid="entity-type" style={leftColStyles}>
              Entity Type
            </td>
            <td>{entityData.length > 0 && entityData[0]['type']}</td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default Primary
