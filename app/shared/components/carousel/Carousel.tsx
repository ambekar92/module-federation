import { Button, ButtonGroup } from '@trussworks/react-uswds';
import React, { useEffect, useState, useMemo } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface CarouselProps {
  items: React.ReactNode[];
  slideFrom: 'left' | 'right';
}

const Carousel: React.FC<CarouselProps> = ({ items, slideFrom }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isPaused) {return;}

    const interval = setInterval(() => {
      nextSlide();
      setProgress(0);
    }, 5000);

    const progressInterval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress < 100) {return oldProgress + 20;}
        clearInterval(progressInterval);
        return 100;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isPaused]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const slideEffect = slideFrom === 'left' ? 'slide-in-left' : 'slide-in-right';

  const dots = useMemo(() => {
    return items.map((_, i) => (
      <div
        key={i}
        className={`dot opacity-80 ${i === currentIndex ? 'active' : ''}`}
        onClick={() => {
          setCurrentIndex(i);
          setProgress(0);
        }}
      />
    ));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, currentIndex]);

  return (
    <div className="carousel-container">
      <div className={`carousel-slide ${slideEffect}`}>
        {items[currentIndex]}

        <ButtonGroup className='carousel-nav'>
          <Button unstyled type='button' onClick={prevSlide}>
            <img src='/icons/previous-arrow.svg' alt='previous hero navigation arrow'/>
          </Button>

          <div className='carousel-nav_progress'>
            <Button unstyled className='padding-left-05' type="button" onClick={() => setIsPaused(!isPaused)} style={{opacity: '80%'}}>
              {isPaused
                ? <img className='height-205 margin-top-1px' src={'/icons/pause.svg'} alt='Play and pause buttons for progress bar' />
                : <PlayArrowIcon className='height-205 margin-top-1px text-white' style={{width: '18px'}} />
              }

            </Button>

            <div className="carousel-indicators">
              {dots}
            </div>
          </div>

          <Button unstyled type='button' onClick={nextSlide}>
            <img src='/icons/next-arrow.svg' alt='next hero navigation arrow'/>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Carousel;
