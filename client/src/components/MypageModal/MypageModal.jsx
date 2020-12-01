import { createRef, React, useState } from 'react';
import axios from 'axios';

import styles from './MypageModal.module.css';
import Modal from '../Modal/Modal';
import defaultProfile from '../../images/defaultProfile.png';
import logoImg from '../../images/logo.png';
import DeleteModal from '../DeleteModal/DeleteModal';
import CropModal from '../CropModal/CropModal';

const MypageModal = ({ isModalOn, handleClose }) => {
  // img 변경관련 로직
  const [cropModalOn, setCropModalOn] = useState(false);
  const handleCropModalOn = () => {
    setCropModalOn(!cropModalOn);
  };
  const [imgSrc, setImgSrc] = useState(null);
  const [nowImg, setNowImg] = useState(defaultProfile);
  const handleNowImg = (newImg) => {
    setNowImg(newImg);
  };

  const changeProfile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      // html5의 fileAPI
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener('load', () => {
        setImgSrc(reader.result);
      });
      handleCropModalOn();
    }
  };

  // 서버에서 보내준 정보를 렌더링(초기)할 때 useState 디폴트 값으로 받기
  // + 유효성 검사 로직
  const [nowPetName, setNowPetName] = useState('스눕독');
  const [nowBreed, setNowBreed] = useState('시바견');
  const petnameRef = createRef();
  const breedRef = createRef();

  const [petName, setPetname] = useState(nowPetName);
  const [breed, setBreed] = useState(nowBreed);
  const [checked, setChecked] = useState({ petname: true, breed: true });

  // 유효성 검사 로직
  const checkInform = (e) => {
    if (e.target.name === 'petname') {
      setChecked({ ...checked, petname: true });
      if (e.target.value.length > 18 || e.target.value.length === 0) {
        setChecked({ ...checked, petname: false });
      }
      setPetname(e.target.value);
    } else if (e.target.name === 'breed') {
      setChecked({ ...checked, breed: true });
      if (e.target.value.length > 18 || e.target.value.length === 0) {
        setChecked({ ...checked, breed: false });
      }
      setBreed(e.target.value);
    }
  };

  // 실제 펫네임을 변경하기 위해 서버에 PATCH 요청을 보내는 로직
  const changePetname = async () => {
    if (checked.petname) {
      try {
        const response = await axios.patch(
          '/user/petname',
          {
            petName,
          },
          { withCredentials: true },
        );
        if (response.status === 200) {
          setNowPetName(petName);
          petnameRef.current.blur();
        }
      } catch (err) {
        if (err.response.status === 501) {
          alert('some errors occur at server, please try again');
        } else if (err.response.status === 404) {
          setChecked({ ...checked, petname: false });
        } else {
          console.log(err);
        }
      }
    }
  };

  // 실제 품종을 변경하기 위해 서버에 PATCH 요청을 보내는 로직
  const changeBreed = async () => {
    if (checked.breed) {
      try {
        const response = await axios.patch(
          '/user/breed',
          {
            breed,
          },
          { withCredentials: true },
        );
        if (response.status === 200) {
          setNowBreed(breed);
          breedRef.current.blur();
        }
      } catch (err) {
        if (err.response.status === 501) {
          alert('some errors occur at server, please try again');
        } else if (err.response.status === 404) {
          setChecked({ ...checked, breed: false });
        }
      }
    }
  };

  // 회원 탈퇴 모달은 디폴트 모달을 재활용하지 않는 것이기에 따로 state로 관리
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const viewDeleteModal = () => {
    setDeleteModalOn(!deleteModalOn);
  };

  return (
    <>
      {yeah && <img src={yeah} alt="fuck" />}
      <CropModal
        imgSrc={imgSrc}
        setNowImg={handleNowImg}
        isModalOn={cropModalOn}
        handleClose={handleCropModalOn}
      />
      <DeleteModal isModalOn={deleteModalOn} handleClose={viewDeleteModal} />
      <Modal isModalOn={isModalOn} handleClose={handleClose}>
        <div className={styles.MypageModal}>
          <div className={styles.profile}>
            <div className={styles.imgPart}>
              <img src={nowImg} className={styles.profileImg} alt="profile" />
            </div>
            <div className={styles.informPart}>
              <div className={styles.title}>프로필 사진</div>
              <input
                id="profileImgInput"
                type="file"
                className={styles.profileImgInput}
                onChange={changeProfile}
              />
              <label htmlFor="profileImgInput">
                <div className={styles.editButton}>Edit Picture</div>
              </label>
            </div>
          </div>
          <div className={styles.editPart}>
            <div className={styles.petnameEdit}>
              <div className={styles.petnameTitle}>
                <img className={styles.logoImg} src={logoImg} alt="logo" />
                Pet Name
              </div>
              <div className={styles.petnameEditPart}>
                <input
                  ref={petnameRef}
                  className={styles.myPageInput}
                  spellCheck={false}
                  onChange={checkInform}
                  value={petName}
                  name="petname"
                />
                <button
                  className={`${styles.informEditButton} ${
                    checked.petname && styles.isOn
                  }`}
                  type="button"
                  onClick={changePetname}
                >
                  Edit
                </button>
              </div>
              {checked.petname ? null : (
                <div className={styles.caution}>
                  펫네임은 최소 1글자 이상 18글자 이하로 작성해주세요
                </div>
              )}
            </div>
            <div className={styles.breedEdit}>
              <div className={styles.breedTitle}>
                <img className={styles.logoImg} src={logoImg} alt="logo" />
                Breed
              </div>
              <div className={styles.breedEditPart}>
                <input
                  ref={breedRef}
                  className={styles.myPageInput}
                  spellCheck={false}
                  name="breed"
                  value={breed}
                  onChange={checkInform}
                />
                <button
                  className={`${styles.informEditButton} ${
                    checked.breed && styles.isOn
                  }`}
                  type="button"
                  onClick={changeBreed}
                >
                  Edit
                </button>
              </div>
              {checked.breed ? null : (
                <div className={styles.caution}>
                  품종은 최소 1글자 이상 18글자 이하로 작성해주세요
                </div>
              )}
            </div>
            <div className={styles.deleteEdit}>
              <div className={styles.deleteTitle}>
                <img className={styles.logoImg} src={logoImg} alt="logo" />
                Delete Account
              </div>
              <button
                id={styles.deleteButton}
                className={styles.deleteEditButton}
                type="button"
                onClick={viewDeleteModal}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MypageModal;
