import React from 'react';
import styled from 'styled-components';

const IMG = styled.img`
  width: 25vw;
  height: 25rem;
  @media (max-width: 65rem) {
    width: 100vw;
  }
`;

const EachSlide = ({ imageSrc }) => {
  return (
    <div>
      <IMG src={imageSrc} alt="slide img" />
    </div>
  );
};

export default EachSlide;
