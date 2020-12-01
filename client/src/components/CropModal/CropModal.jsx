import { React, useState, createRef, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Slider } from '@material-ui/core';
import styles from './CropModal.module.css';
import Modal from '../Modal/Modal';

// import close from '../../images/close.png';
// setNowImg, imgSrc, i
const CropModal = ({ imgSrc, isModalOn, handleClose }) => {
  const cropRef = createRef();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  //   const [croppedImageUrl, setCroppedImageUrl] = useState(null);

  const onCropChange = (crops) => {
    setCrop({ ...crop, ...crops });
  };

  // const createImage = (url) =>
  //   new Promise((resolve, reject) => {
  //     const image = new Image();
  //     image.addEventListener('load', () => resolve(image));
  //     image.addEventListener('error', (error) => reject(error));
  //     image.setAttribute('crossOrigin', 'anonymous');
  //     image.src = url;
  //   });

  // const getCroppedImg = async (imageSrc, crops) => {
  //   const image = await createImage(imageSrc);
  //   const canvas = document.createElement('canvas');
  //   const ctx = canvas.getContext('2d');
  //   canvas.width = crops.width;
  //   canvas.height = crops.height;
  //   ctx.drawImage(
  //     image,
  //     crops.x,
  //     crops.y,
  //     crops.width,
  //     crops.height,
  //     0,
  //     0,
  //     canvas.width,
  //     canvas.height,
  //   );
  //   return new Promise((resolve) => {
  //     resolve(canvas.toDataURL());
  //   });
  // };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  // const onCropComplete = async (croppedAreaPixels) => {
  //   try {
  //     const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
  //     setNowImg(croppedImage);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <Modal isModalOn={isModalOn} handleClose={handleClose}>
      <div className={styles.cropElements}>
        <div className="crop-container">
          <Cropper
            ref={cropRef}
            image={imgSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            className={styles.cropper}
            onCropComplete={onCropComplete}
            onCropChange={onCropChange}
            onZoomChange={setZoom}
          />
        </div>
        <div className="controls">
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zooms) => setZoom(zooms)}
            classes={{ container: 'slider' }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CropModal;
