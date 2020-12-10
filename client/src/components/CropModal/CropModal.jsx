import { React, useState } from 'react';
import Cropper from 'react-easy-crop';
import axios from 'axios';
import Slider from '@material-ui/core/Slider';
import styles from './CropModal.module.css';
import close from '../../images/close(white).png';

const CropModal = ({
  setUserProfile,
  setImgSrc,
  setNowImg,
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
    const canvas = document.createElement('canvas'); // document 상에 canvas 태그 생성
    // 캔버스 영역을 크롭한 이미지 크기 만큼 조절
    canvas.width = crops.width;
    canvas.height = crops.height;
    // getContext() 메서드를 활용하여 캔버스 렌더링 컨텍스트 함수 사용
    // 이 경우 drawImage() 메서드를 활용하여 이미지를 그린다
    const ctx = canvas.getContext('2d');
    // 화면에 크롭된 이미지를 그린다
    ctx.drawImage(
      // 원본 이미지 영역
      img, // 원본 이미지
      crops.x, // 크롭한 이미지 x 좌표
      crops.y, // 크롭한 이미지 y 좌표
      crops.width,
      crops.height,
      0,
      0,
      crops.width,
      crops.height,
    );

    // canvas 이미지를 base64 형식으로 인코딩된 URI 를 생성한 후 반환한다
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

  const editPicture = async () => {
    const encodeData = croppedData.replace('data:image/png;base64,', '');
    const decodImg = atob(encodeData);
    const array = [];
    for (let i = 0; i < decodImg.length; i += 1) {
      array.push(decodImg.charCodeAt(i));
    }
    const file = new Blob([new Uint8Array(array)], { type: 'image/png' });
    const fileName = 'canvas_img_'.concat(new Date().getMilliseconds(), '.png');

    const formData = new FormData();
    formData.append('image', file, fileName);

    const response = await axios({
      method: 'post',
      url: 'https://server.codestates-project.tk/user/photo',
      data: formData,
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    });
    setNowImg(response.data.thumbnail);
    setImgSrc(null);
    setUserProfile((prev) => {
      return { ...prev, thumbnail: response.data.thumbnail };
    });
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
            onClick={editPicture}
          >
            Update
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

export default CropModal;
