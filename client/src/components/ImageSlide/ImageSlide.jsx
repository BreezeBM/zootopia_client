import React from 'react';
import styles from './ImageSlide.module.css';
import dummyImg from '../../thumbnails/post_f.png';

const ImageSlide = () => {
  return (
    <div className={styles.slide_container}>
      <img className={styles.dummyImg} src={dummyImg} alt="slide img" />
    </div>
  );
};

export default ImageSlide;
