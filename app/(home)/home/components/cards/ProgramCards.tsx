import { Grid } from '@trussworks/react-uswds'
import { programCardData } from './constants'
import { Link } from '@trussworks/react-uswds'

function ProgramCards() {
  return (
    <Grid row gap="md">
      {programCardData.map((card, index) => (
        <Grid col={4} className="margin-top-2" key={index}>
          <Link href={`${card.link}`} style={{ textDecoration: 'none' }}>
            <div className="bg-white radius-lg line-height-base border-primary-light border-1px padding-2 display-flex flex-column">
              <span className="text-size-xs text-base">{card.subTitle}</span>
              <p
                className="text-size-md margin-y-2px"
                style={{ fontWeight: 600, color: 'black' }}
              >
                {card.title}
              </p>
            </div>
          </Link>{' '}
        </Grid>
      ))}
    </Grid>
  )
}
export default ProgramCards
