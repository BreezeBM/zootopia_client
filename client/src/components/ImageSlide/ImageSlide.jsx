import { React, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import EachSlide from '../EachSlide/EachSlide';

const ImageSlide = ({ imageUrls }) => {
  const TOTAL_SLIDES = 2;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
  }, [currentSlide]);

  return (
    <Container>
      <Button onClick={prevSlide} style={{ left: '0.5rem' }}>
        <i className="fas fa-chevron-left" />
      </Button>
      <Button onClick={nextSlide} style={{ right: '0.5rem' }}>
        <i className="fas fa-chevron-right" />
      </Button>
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
  width: 59%;
  overflow: hidden;
  position: relative;
`;

const Button = styled.button`
  all: unset;
  z-index: 3;
  position: absolute;
  top: 45%;
  font-weight: bold;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  &:hover {
    color: grey;
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  display: flex; //이미지들을 가로로 나열합니다.
`;
// ** css styled definitions **
