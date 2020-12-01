import { createRef, React, useState } from 'react';
import styles from './PostNewFormModal.module.css';
import close from '../../images/close.png';

const PostNewFormModal = ({ isModalOn, handleClose }) => {
  const imgInput1 = createRef();
  const imgInput2 = createRef();
  const imgInput3 = createRef();

  const [imgSrcs, setImgSrcs] = useState({ 1: '+', 2: '+', 3: '+' });
  const imgOnChange = (e) => {
    const urlSrc = URL.createObjectURL(e.target.files[0]);
    if (e.target.name === 'imgInput1') {
      setImgSrcs({ ...imgSrcs, 1: urlSrc });
    } else if (e.target.name === 'imgInput2') {
      setImgSrcs({ ...imgSrcs, 2: urlSrc });
    } else if (e.target.name === 'imgInput3') {
      setImgSrcs({ ...imgSrcs, 3: urlSrc });
    }
  };
  return (
    <div className={`${styles.modal} ${isModalOn && styles.isOn}`}>
      <div className={styles.box}>
        <img
          className={styles.close}
          src={close}
          alt="close"
          onClick={handleClose}
        />
        <div className={styles.postNewFormModal}>
          <div className={styles.imgInputPart}>
            <input
              className={styles.imgInput}
              type="file"
              accept="image/gif, image/jpeg, image/png"
              name="imgInput1"
              id="imgInput1"
              ref={imgInput1}
              onChange={imgOnChange}
            />
            <input
              className={styles.imgInput}
              type="file"
              accept="image/gif, image/jpeg, image/png"
              name="imgInput2"
              id="imgInput2"
              ref={imgInput2}
              onChange={imgOnChange}
            />
            <input
              className={styles.imgInput}
              type="file"
              accept="image/gif, image/jpeg, image/png"
              name="imgInput3"
              id="imgInput3"
              ref={imgInput3}
              onChange={imgOnChange}
            />
            <label className={styles.labels} htmlFor="imgInput1">
              {imgSrcs[1] === '+' ? (
                '+'
              ) : (
                <img
                  className={styles.uploadedImg}
                  src={imgSrcs[1]}
                  alt="upload img"
                />
              )}
            </label>
            <label className={styles.labels} htmlFor="imgInput2">
              {imgSrcs[2] === '+' ? (
                '+'
              ) : (
                <img
                  className={styles.uploadedImg}
                  src={imgSrcs[2]}
                  alt="upload img"
                />
              )}
            </label>
            <label className={styles.labels} htmlFor="imgInput3">
              {imgSrcs[3] === '+' ? (
                '+'
              ) : (
                <img
                  className={styles.uploadedImg}
                  src={imgSrcs[3]}
                  alt="upload img"
                />
              )}
            </label>
          </div>
          <div className={styles.textInputPart}>
            <textarea
              placeholder="내용을 입력해주세요"
              spellCheck={false}
              className={styles.textInput}
            />
          </div>
          <div className={styles.btnInputPart}>
            <button className={styles.barkBtn} type="button">
              Bark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostNewFormModal;
