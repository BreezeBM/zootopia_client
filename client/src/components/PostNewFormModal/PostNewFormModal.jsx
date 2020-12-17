import { createRef, React, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from './PostNewFormModal.module.css';
import close from '../../images/close.png';
import PostCropModal from '../PostCropModal/PostCropModal';
// import FAKEIMG from '../../thumbnails/post_a.png';

const PostNewFormModal = ({
  setProfileForDeleteAndAdd,
  setUserProfile,
  postsKind,
  setPosts,
  isModalOn,
  handleClose,
}) => {
  const history = useHistory();
  const imgInput1 = createRef();
  const imgInput2 = createRef();
  const imgInput3 = createRef();
  const textAreaRef = useRef(null);
  const [isCropModalOn, setIsCropModalOn] = useState(false);
  const [inputNum, setInputNum] = useState(null);
  const [checked, setChecked] = useState(false);
  const [imgChecked, setImgChecked] = useState(false);

  const handleCropModal = () => {
    setIsCropModalOn(!isCropModalOn);
  };
  const [imgSrc, setImgSrc] = useState(null);

  const [imgSrcs, setImgSrcs] = useState({ 1: '+', 2: '+', 3: '+' });

  const setImgSrcsFunc = (inputNumber, urlSrc) => {
    if (inputNumber === 1) {
      setImgSrcs({ ...imgSrcs, 1: urlSrc });
    } else if (inputNumber === 2) {
      setImgSrcs({ ...imgSrcs, 2: urlSrc });
    } else if (inputNumber === 3) {
      setImgSrcs({ ...imgSrcs, 3: urlSrc });
    }
  };

  const imgOnChange = (e) => {
    setImgChecked(false);
    try {
      const urlSrc = URL.createObjectURL(e.target.files[0]);
      if (e.target.name === 'imgInput1') {
        setInputNum(1);
        setImgSrc(urlSrc);
        handleCropModal();
      } else if (e.target.name === 'imgInput2') {
        setInputNum(2);
        setImgSrc(urlSrc);
        handleCropModal();
      } else if (e.target.name === 'imgInput3') {
        setInputNum(3);
        setImgSrc(urlSrc);
        handleCropModal();
      }
    } catch (err) {
      alert('we only accept image files');
    }
  };

  const resetAndCloseModal = () => {
    setImgSrcs({ 1: '+', 2: '+', 3: '+' });
    setChecked(false);
    setImgChecked(false);
    textAreaRef.current.value = null;
    handleClose();
  };

  const sendNewPost = async () => {
    if (textAreaRef.current.value.trim().length === 0) {
      setChecked(true);
    } else {
      // 이미지가 1개 미만이면 즉, 0개 업로딩이면 못보내게 하기
      const formData = new FormData();
      const dataArr = [];
      for (const el of Object.values(imgSrcs)) {
        if (el !== '+') {
          const encodeData = el.replace('data:image/png;base64,', '');
          const decodImg = atob(encodeData);
          const array = [];
          for (let i = 0; i < decodImg.length; i += 1) {
            array.push(decodImg.charCodeAt(i));
          }
          const file = new Blob([new Uint8Array(array)], { type: 'image/png' });
          dataArr.push(file);
        }
      }
      // 현재 dataArr 에 이미지가 있음 (Blob 타입의)
      let image1;
      if (dataArr[0]) {
        // eslint-disable-next-line prefer-destructuring
        image1 = dataArr[0];
      } else {
        setImgChecked(true);
        return null;
      }
      const image2 = dataArr[1] ? dataArr[1] : null;
      const image3 = dataArr[2] ? dataArr[2] : null;

      const fileName = 'canvas_img_'.concat(
        new Date().getMilliseconds(),
        '.png',
      );

      if (image1) formData.append('image1', image1, fileName);
      if (image2) formData.append('image2', image2, fileName);
      if (image3) formData.append('image3', image3, fileName);
      formData.append('text', textAreaRef.current.value);
      try {
        const response = await axios(
          {
            method: 'post',
            url: 'https://server.codestates-project.tk/post',
            data: formData,
            headers: {
              'Content-Type': `multipart/form-data`,
            },
          },
          {
            withCredentials: true,
          },
        );
        setUserProfile((prev) => {
          return { ...prev, postCount: prev.postCount + 1 };
        });
        if (postsKind === 'latest' || postsKind === 'user') {
          setPosts((prev) => {
            const copyArr = prev.postData.slice();
            copyArr.unshift(response.data);
            return { ...prev, postData: copyArr };
          });
          setProfileForDeleteAndAdd((prev) => {
            return { ...prev, postCount: prev.postCount + 1 };
          });
        }
        resetAndCloseModal();
      } catch (err) {
        if (err.response) {
          if (err.response.status === 401) {
            history.push('/');
          }
        } else {
          alert('sorry, server got an error. please try again');
        }
      }
    }
  };

  return (
    <>
      <PostCropModal
        setImgSrcs={setImgSrcsFunc}
        inputNum={inputNum}
        setImgSrc={setImgSrc}
        imgSrc={imgSrc}
        isModalOn={isCropModalOn}
        handleClose={handleCropModal}
      />
      <div className={`${styles.modal} ${isModalOn && styles.isOn}`}>
        <div className={styles.box}>
          <img
            className={styles.close}
            src={close}
            alt="close"
            onClick={resetAndCloseModal}
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
            {imgChecked && (
              <div className={styles.imgCheck}>
                하나 이상의 이미지를 업로드 해주세요
              </div>
            )}
            <div className={styles.textInputPart}>
              <textarea
                onKeyDown={() => {
                  setChecked(false);
                }}
                ref={textAreaRef}
                placeholder="내용을 입력해주세요"
                spellCheck={false}
                className={`${styles.textInput} ${checked && styles.isOn}`}
              />
            </div>
            <div className={styles.btnInputPart}>
              <button
                className={styles.barkBtn}
                type="button"
                onClick={sendNewPost}
              >
                Bark
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostNewFormModal;
