import { Grid } from '@trussworks/react-uswds'
import { informationCardData } from './constants'

function StatCards() {
  return (
    <Grid row gap='md'>
      {informationCardData.map((card, index) => (
        <Grid col={4} key={index} className='text-center'>
          <div className='bg-white radius-lg border-primary-light border-1px padding-4 display-flex flex-align-center flex-column'>
            <h3 className='text-size-2xl margin-bottom-1 margin-top-0'>{card.statNumber}</h3>
            <span className='line-height-base'>
              {card.statDetail}<br/>
              <strong>Small Businesses</strong>
            </span>
          </div>
        </Grid>
      ))}
    </Grid>
  )
}
export default StatCards
