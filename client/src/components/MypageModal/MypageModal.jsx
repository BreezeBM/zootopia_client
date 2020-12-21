import { useEffect, React, useRef, useState } from 'react';
import axios from 'axios';

import styles from './MypageModal.module.css';
import Modal from '../Modal/Modal';
import logoImg from '../../images/logo.png';
import DeleteModal from '../DeleteModal/DeleteModal';
import CropModal from '../CropModal/CropModal';

const MypageModal = ({
  setProfile,
  kind,
  userProfile,
  setUserProfile,
  profile,
  isModalOn,
  handleClose,
}) => {
  // img 변경관련 로직
  const [petnameCaution, setPetnameCaution] = useState(null);
  const [breedCaution, setBreedCaution] = useState(null);
  const [cropModalOn, setCropModalOn] = useState(false);
  const handleCropModalOn = () => {
    setCropModalOn(!cropModalOn);
  };
  const [imgSrc, setImgSrc] = useState(null);
  const [nowImg, setNowImg] = useState(profile.thumbnail);
  // const handleNowImg = (newImg) => {
  //   setNowImg(newImg);
  // };

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
  const [nowPetName, setNowPetName] = useState(userProfile.petName);
  const [nowBreed, setNowBreed] = useState(userProfile.breed);
  const petnameRef = useRef(null);
  const breedRef = useRef(null);

  const [petName, setPetname] = useState(userProfile.petName);
  const [breed, setBreed] = useState(userProfile.breed);
  const [checked, setChecked] = useState({ petname: true, breed: true });

  // 유효성 검사 로직
  const checkInform = (e) => {
    if (e.target.name === 'petname') {
      setChecked({ ...checked, petname: true });
      if (e.target.value.length > 18 || e.target.value.length === 0) {
        setChecked({ ...checked, petname: false });
        setPetnameCaution(
          '펫네임은 최소 1글자 이상 18글자 이하로 작성해주세요',
        );
      }
      setPetname(e.target.value);
    } else if (e.target.name === 'breed') {
      setChecked({ ...checked, breed: true });
      if (e.target.value.length > 18 || e.target.value.length === 0) {
        setChecked({ ...checked, breed: false });
        setBreedCaution('품종은 최소 1글자 이상 18글자 이하로 작성해주세요');
      }
      setBreed(e.target.value);
    }
  };

  // 실제 펫네임을 변경하기 위해 서버에 PATCH 요청을 보내는 로직
  const changePetname = async () => {
    if (checked.petname) {
      try {
        const response = await axios.patch(
          'https://server.codestates-project.tk/user/petname',
          {
            petName,
          },
          { withCredentials: true },
        );
        if (response.status === 201) {
          setNowPetName(petName);
          setPetname(petName);
          if (kind === 'latest' || kind === 'user') {
            setProfile({ ...profile, petName });
          }
          setUserProfile({ ...userProfile, petName });
          petnameRef.current.blur();
        }
      } catch (err) {
        // 중복 펫네임 409
        if (err.response.status === 501) {
          alert('some errors occur at server, please try again');
        } else if (err.response.status === 409) {
          setChecked({ ...checked, petname: false });
          setPetnameCaution('동일한 닉네임으로의 변경은 불가능합니다');
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
          'https://server.codestates-project.tk/user/breed',
          {
            breed,
          },
          { withCredentials: true },
        );
        if (response.status === 201) {
          setNowBreed(breed);
          setBreed(breed);
          if (kind === 'latest' || kind === 'user') {
            setProfile({ ...profile, breed });
          }
          setUserProfile({ ...userProfile, breed });
          breedRef.current.blur();
        }
      } catch (err) {
        if (err.response.status === 501) {
          alert('some errors occur at server, please try again');
        } else if (err.response.status === 409) {
          setChecked({ ...checked, breed: false });
          setPetnameCaution('동일한 품종으로의 변경은 불가능합니다');
        }
      }
    }
  };

  const resetAndTurnOffTheModal = () => {
    setPetname(nowPetName);
    setBreed(nowBreed);
    setChecked({ petname: true, breed: true });
    handleClose();
  };

  // 회원 탈퇴 모달은 디폴트 모달을 재활용하지 않는 것이기에 따로 state로 관리
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const viewDeleteModal = () => {
    setDeleteModalOn(!deleteModalOn);
  };

  useEffect(() => {
    if (isModalOn === false) {
      setPetname(nowPetName);
      setBreed(nowBreed);
      setChecked({ petname: true, breed: true });
    }
  }, [isModalOn]);

  useEffect(() => {
    setPetname(userProfile.petName);
    setBreed(userProfile.breed);
    setNowImg(userProfile.thumbnail);
  });
  return (
    <>
      <DeleteModal isModalOn={deleteModalOn} handleClose={viewDeleteModal} />
      <Modal isModalOn={isModalOn} handleClose={resetAndTurnOffTheModal}>
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
                <div className={styles.caution}>{petnameCaution}</div>
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
                <div className={styles.caution}>{breedCaution}</div>
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
      <CropModal
        setProfile={setProfile}
        profile={profile}
        userProfile={userProfile}
        kind={kind}
        setUserProfile={setUserProfile}
        setNowImg={setNowImg}
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
        isModalOn={cropModalOn}
        handleClose={handleCropModalOn}
      />
    </>
  );
};

export default MypageModal;
