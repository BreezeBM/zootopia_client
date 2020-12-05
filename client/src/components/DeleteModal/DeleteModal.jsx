import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from './DeleteModal.module.css';
import deleteMotionImg from '../../images/deleteMotion.png';
import SimpleModal from '../SimpleModal/SimpleModal';

const DeleteModal = ({ isModalOn, handleClose }) => {
  const history = useHistory();
  const [deleted, setDeleted] = useState(false);

  const deleteAccount = async () => {
    try {
      const response = await axios.delete(
        'https://server.codestates-project.tk/user',
      );
      if (response.status === 201) {
        setDeleted(true);
        setTimeout(() => {
          // 탈퇴 완료후에 랜딩페이지로 자동 이동(4초후에)
          history.push('/');
        }, 5000);
      }
    } catch (err) {
      if (err.response.status === 501) {
        alert('some errors occur at server, please try again');
      } else {
        console.log(err);
      }
    }
  };

  return (
    <SimpleModal isModalOn={isModalOn} handleClose={handleClose}>
      <img
        className={styles.deleteMotion}
        src={deleteMotionImg}
        alt="handsign"
      />
      {deleted ? (
        <>
          <div className={styles.message}>정상적으로 처리되었습니다</div>
          <div className={styles.message}>이용해주셔서 감사합니다</div>
          <div className={styles.caution} id={styles.deleteMessage}>
            4초 후에 로그인 페이지로 이동합니다
          </div>
        </>
      ) : (
        <>
          <div className={styles.message}>정말로 회원 탈퇴를 원하시나요?</div>
          <div id={styles.deleteMessage} className={styles.message}>
            삭제 요청은 되돌릴 수 없습니다
          </div>
          <div className={styles.yesOrNoButton}>
            <button
              className={styles.yesButton}
              type="button"
              onClick={deleteAccount}
            >
              Yes
            </button>
            <button
              className={styles.noButton}
              type="button"
              onClick={handleClose}
            >
              No
            </button>
          </div>
        </>
      )}
    </SimpleModal>
  );
};

export default DeleteModal;
