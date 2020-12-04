import React from 'react';
import styled from 'styled-components';

const IMG = styled.img`
  width: 22rem;
  height: 25rem;
`;

const EachSlide = ({ imageSrc }) => {
  return (
    <div>
      <IMG src={imageSrc} alt="slide img" />
    </div>
  );
};

export default EachSlide;
