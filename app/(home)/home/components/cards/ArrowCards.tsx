import { Grid } from '@trussworks/react-uswds'
import {Link} from '@trussworks/react-uswds'
import Styles from '../../utils/HomePage.module.scss';
import { arrowCardData } from './constants';

function ArrowCards() {
  return (
    <Grid row className='flex-no-wrap padding-2 bg-white'>
      <>
        {arrowCardData.map((data, index) => (
          <Grid key={index} col={4} className={`margin-x-0 ${Styles[data.class]} ${Styles['arrow-box']} maxh-full`}>
            <div className={Styles['arrow-box-content']}>
              <Link  href={`${data.link}`}
              variant="unstyled" className=""
           >
              {/* <span className={Styles['arrow-box_number']}>{index+1}</span> */}
              <img
                src={'/images/image-placeholder.png'}
                className='width-full'
                alt="A placeholder image"
                style={{
                  backgroundImage: `linear-gradient(90deg, rgba(204, 0, 0, 0.59), rgba(204, 0, 0, 0.0)), url(${data.img})`,
                  backgroundPosition: 'top',
                  backgroundSize: 'cover',
                }}
              /></Link>

              <div className={Styles['arrow-box_text']}>
                <div className='padding-top-2'>
                  <h3>{data.title}</h3>
                  <p>{data.text}</p>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </>
    </Grid>
  )
}
export default ArrowCards
