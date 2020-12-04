import React from 'react';
import styled from 'styled-components';
import styles from './EachSlide.module.css';

const IMG = styled.img`
  width: 22rem;
  height: 25rem;
`;

const EachSlide = ({ imageSrc }) => {
  return (
    <div className={styles.slide_container}>
      <IMG src={imageSrc} alt="slide img" />
    </div>
  );
};

export default EachSlide;
