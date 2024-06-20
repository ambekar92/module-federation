'use client'
import Carousel from '@/app/shared/components/carousel/Carousel';
import Styles from '../../utils/HomePage.module.scss';
import Link from 'next/link';
import { homeCarouselData } from '../../utils/constants';

const linearGradient = 'linear-gradient(90deg, rgba(0, 0, 38) 0%, rgba(0, 0, 38, 0.7), rgba(26, 68, 128, 0.5) 100%)';

function HeaderCarousel() {
  const headerItems = homeCarouselData.map((data, index) => (
    <section className={'usa-hero width-full height-mobile'} key={index}
      style={{
        backgroundImage: data.backgroundImg
          ? `${linearGradient}, url(${data.backgroundImg})`
          : `${linearGradient}, url('./_next/static/media/fdfa1c365bb151847b2c.75e812a3.jpg')`,
      }}
      aria-label={data.ariaLabel}
    >
      <div className='padding-2 padding-bottom-8 margin-0 height-full display-flex flex-column flex-justify'>
        <>
          <div>
            <h1 className="usa-hero__heading">
              <span className="usa-hero__heading--alt">{data.hero}</span>
            </h1>
            <p className={`maxw-tablet ${Styles['hero-para']}`}>{data.para}</p>
          </div>

          <div>
            <Link className="usa-button" href={data.linkHref}>
              {data.linkText}
            </Link>
          </div>
        </>
      </div>
    </section>
  ))
  return (
    <Carousel slideFrom='right' items={headerItems} />
  );
}

export default HeaderCarousel;
