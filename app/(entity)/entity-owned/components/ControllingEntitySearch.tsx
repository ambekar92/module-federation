import { BusinessEntity } from '@/app/api/parent-entity/types';
import { Button, ComboBox } from '@trussworks/react-uswds';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { EntityForm } from '../utils/schemas';
import { Step } from '../utils/types';
import { PARENT_ENTITY_ROUTE } from '@/app/constants/local-routes';

const ControllingEntitySearch = () => {
  const { watch, control, setValue } = useFormContext<EntityForm>();
  const [gettingEntities, setGettingEntities] = useState(false);
  const [entities, setEntities] = useState<BusinessEntity[]>([]);
  const controllingEntityType = watch('controllingEntityType');

  useEffect(() => {
    handleTypeChange();
    async function handleTypeChange() {
      setGettingEntities(true)
      try {
        const response = await fetch(`${PARENT_ENTITY_ROUTE}`, {
          method: 'POST',
          body: JSON.stringify({ entity_type: controllingEntityType }),
        });
        const data = await response.json();

        setEntities(Array.isArray(data.data) ?  data.data : []);
      } catch (error) {
        setEntities([]);
        console.error('Error getting entities:', error);
      } finally {
        setGettingEntities(false);
      }
    }
  }, [controllingEntityType]);

  const step = watch('step');

  return (
    <>
      {controllingEntityType &&
        <>
          <h3>Controlling Entity Search</h3>
          <p>Use this search to find your controlling entity. Enter the full or partial name of your controlling entity and select from the matching results.</p>
          <p style={{fontSize: '.8rem'}}>If your controlling entity does not appear in the search results, your may need to create a new controlling entity profile.</p>
          { step !== Step.NewEntityForm && <>
            <Controller
              control={control}
              name='entity'
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <ComboBox
                    disabled={gettingEntities}
                    name='controllingEntityType'
                    id="controllingEntitySearchSelect"
                    options={entities.map(e => ({ label: e.legal_business_name, value: e.legal_business_name }))}
                    onChange={onChange}
                  />
                )
              }}/>

            <Button
              onClick={() => setValue('step', Step.NewEntityForm)}
              className='margin-top-3'
              style={{ display: 'flex', marginLeft: 'auto' }}
              type='button' outline>Create New Controlling Entity</Button>
          </>}

        </>
      }
    </>
  )
}

export default ControllingEntitySearch
