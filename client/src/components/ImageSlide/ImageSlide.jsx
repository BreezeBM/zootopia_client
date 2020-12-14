import { React, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import EachSlide from '../EachSlide/EachSlide';

const ImageSlide = ({ imageUrls }) => {
  const [totalSlides, setTotalSlides] = useState(2);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const nextSlide = () => {
    if (currentSlide >= totalSlides) {
      // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(totalSlides);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 65rem)');
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    if (mediaQuery.matches) {
      slideRef.current.style.transform = `translateX(-${currentSlide}00vw)`;
    } else {
      slideRef.current.style.transform = `translateX(${-25 * currentSlide}vw)`;
    }
  }, [currentSlide]);

  useEffect(() => {
    const len = imageUrls.filter((image) => {
      return image !== null;
    }).length;
    if (len === 2) setTotalSlides(1);
    if (len === 1) setTotalSlides(0);
  }, [imageUrls]);

  return (
    <Container>
      {totalSlides >= 2 ? (
        <>
          <Button onClick={prevSlide} style={{ left: '0.5rem' }}>
            <i className="fas fa-chevron-left" />
          </Button>
          <Button onClick={nextSlide} style={{ right: '0.5rem' }}>
            <i className="fas fa-chevron-right" />
          </Button>
        </>
      ) : null}

      <SliderContainer ref={slideRef}>
        {imageUrls.map((image) => {
          return <EachSlide imageSrc={image} />;
        })}
      </SliderContainer>
    </Container>
  );
};

export default ImageSlide;

// ** css styled definitions **
const Container = styled.div`
  width: 25vw;
  height: 25rem;
  overflow: hidden;
  position: relative;

  @media (max-width: 65rem) {
    width: 100vw;
  }
`;

const Button = styled.button`
  all: unset;
  z-index: 3;
  top: 45%;
  position: absolute;
  font-weight: bold;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  &:hover {
    color: grey;
  }
  @media (max-width: 65rem) {
    opacity: 0.5;
    &:hover {
      color: white;
    }
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  display: flex;
`;
// ** css styled definitions **
