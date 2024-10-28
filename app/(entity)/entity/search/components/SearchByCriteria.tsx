'use client'
import { ENTITIES_ROUTE } from '@/app/constants/local-routes';
import Combobox from '@/app/shared/form-builder/form-controls/Combobox';
import Input from '@/app/shared/form-builder/form-controls/Input';
import { Alert, Button } from '@trussworks/react-uswds';
import axios from 'axios';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Columns, SearchEntityType } from './schema';
import { decryptApiResponse } from '@/app/shared/utility/decryptApiResponse';

const SearchByCriteria = () => {
  const {getValues, watch, setValue} = useFormContext<SearchEntityType>();

  const searchCriteria = watch('searchCriteria') || getValues('searchCriteria');
  const searchValue = watch('searchValue') || getValues('searchValue');
  const error = watch('error') || getValues('error');
  const loading = watch('loading') || getValues('loading');

  useEffect(() => {
    setValue('searchCriteria', Columns.UEI);
  }, [])

  async function searchEntity() {
    setValue('loading', true);
    setValue('error', false);
    const values = getValues();
    const uei = values.searchCriteria === Columns.UEI ? values.searchValue : '';
    const businessName = values.searchCriteria === Columns.BUSINESS_NAME ? values.searchValue : '';
    try {
      const response = await axios.post(ENTITIES_ROUTE, {sam_entity_uei: uei, sam_entity_legal_business_name: businessName});
      setValue('entities', decryptApiResponse(response, '[]'));
      setValue('page', 1);
    } catch(e) {
      setValue('error', true);
      console.error(e);
    }  finally {
      setValue('loading', false);
    }
  }

  return (
    <div>
      {<div style={{ display: 'flex', gap: '.5rem', alignItems: 'center', width: '50%' }}>
        <div style={{ display: 'flex', width: '90%' }}>
          <div style={{ width: '18rem' }}>
            <Combobox<SearchEntityType>
              options={[
                { value: Columns.UEI, label: Columns.UEI },
                { value: Columns.BUSINESS_NAME, label: Columns.BUSINESS_NAME },
              ]}
              defaultValue={Columns.UEI}
              name={'searchCriteria'} />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <div style={{ width: '300px' }}>
              <Input<SearchEntityType> label='' name='searchValue' />
            </div>
            <Button
              onClick={searchEntity}
              style={{ borderRadius: '0 3px 3px 0', height: '2.5rem' }}
              disabled={!searchCriteria || !searchValue}
              type='button'>Search</Button>
          </div>
        </div>
      </div>}
      {error && <Alert type="error" heading="No Results Found" headingLevel="h4">
            There was an error fetching the data. Please try again.
          </Alert>}
        {loading && <p>Loading...</p>}
    </div>
  )
}

export default SearchByCriteria
