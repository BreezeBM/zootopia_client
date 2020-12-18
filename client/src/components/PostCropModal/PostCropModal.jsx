import { React, useState } from 'react';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider';
import styles from './PostCropModal.module.css';
import close from '../../images/close(white).png';

// easy-crop을 이용한 crop Modal
const PostCropModal = ({
  setImgSrcs,
  inputNum,
  setImgSrc,
  imgSrc,
  isModalOn,
  handleClose,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedData, setCroppedUrl] = useState(null);
  const onCropChange = (crops) => {
    setCrop({ ...crop, ...crops });
  };

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const getCroppedImg = async (image, crops) => {
    const img = await createImage(image);
    const canvas = document.createElement('canvas');
    canvas.width = crops.width;
    canvas.height = crops.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      img,
      crops.x,
      crops.y,
      crops.width,
      crops.height,
      0,
      0,
      crops.width,
      crops.height,
    );

    return new Promise((resolve) => {
      resolve(canvas.toDataURL('image/png'));
    });
  };

  const makeClientCrop = async (crops) => {
    if (imgSrc && crops.width && crops.height) {
      const croppedImgData = await getCroppedImg(imgSrc, crops);
      setCroppedUrl(croppedImgData);
    }
  };

  const onCropComplete = (_, croppedAreaPixels) => {
    makeClientCrop(croppedAreaPixels);
  };

  const uploadPicture = async () => {
    setImgSrcs(inputNum, croppedData);
    setImgSrc(null);
    handleClose();
  };

  return (
    <div className={`${styles.crop_container} ${isModalOn && styles.isOn}`}>
      <img
        className={styles.close}
        src={close}
        alt="close"
        onClick={() => {
          setImgSrc(null);
          handleClose();
        }}
      />
      <Cropper
        image={imgSrc}
        crop={crop}
        zoom={zoom}
        aspect={1}
        className={styles.cropper}
        onCropComplete={onCropComplete}
        onCropChange={onCropChange}
        onZoomChange={setZoom}
      />
      <div className={styles.zoomControl}>
        <div className={styles.editBtnPart}>
          <button
            className={styles.editBtn}
            type="button"
            onClick={uploadPicture}
          >
            Upload
          </button>
        </div>
        <div className={styles.zoomPart}>
          <div className={styles.zoomAnnounce}>- zoom +</div>
          <Slider
            onChange={(e, zm) => setZoom(zm)}
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            className={styles.slider}
            aria-labelledby="Zoom"
          />
        </div>
      </div>
    </div>
  );
};

export default PostCropModal;
