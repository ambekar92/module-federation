import { Show } from '@/app/shared/components/Show'
import { Checkbox, Grid } from '@trussworks/react-uswds'
import { useContext } from 'react'
import HeaderOverview from './HeaderOverview'
import SupervisorCtx from './supervisorContext'

const Header = () => {
    const supervisorCtx = useContext(SupervisorCtx)
  return (
    <>
        <Grid className="mobile:grid-col-12 desktop:grid-col-12 border-bottom-1px display-flex flex-align-center flex-row flex-justify">
          <h2 className='margin-right-2'>{supervisorCtx?.isSupervisor ? 'Analyst Overview' : 'My Tasks'}</h2>  
          <Checkbox id='supervisor-toggle' label={supervisorCtx?.isSupervisor ? 'User View' : 'Supervisor View'} name='supervisor-toggle'
          onChange={() => supervisorCtx?.setIsSupervisor(prev => !prev)}
          ></Checkbox>
        </Grid> 

        <Show>
            <Show.When isTrue={supervisorCtx?.isSupervisor}>
                <HeaderOverview />
            </Show.When>
        </Show>


    </>
  )
}

export default Header