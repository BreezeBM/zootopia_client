import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from './PostDeleteModal.module.css';
import deleteMotionImg from '../../images/trashcan.png';
import SimpleModal from '../SimpleModal/SimpleModal';

const PostDeleteModal = ({
  setProfileForDeleteAndAdd,
  setUserProfile,
  postId,
  deletePost,
  isModalOn,
  handleClose,
  kind,
}) => {
  const [deleted, setDeleted] = useState(false);

  // 포스트 삭제
  const deletePostFunc = async () => {
    try {
      await axios.delete(
        `https://server.codestates-project.tk/post`,
        { data: { postId } },
        {
          withCredentials: true,
        },
      );
      setUserProfile((prev) => {
        return { ...prev, postCount: prev.postCount - 1 };
      });
      if (kind === 'user' || kind === 'latest') {
        setProfileForDeleteAndAdd((prev) => {
          return { ...prev, postCount: prev.postCount - 1 };
        });
      }
      deletePost(postId);
      await setDeleted(true);
    } catch (err) {
      if (err.response.status === 401) {
        history.push('/');
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
        alt="trash can"
      />
      {deleted ? (
        <>
          <div className={styles.completedMessage}>
            정상적으로 처리되었습니다
          </div>
        </>
      ) : (
        <>
          <div id={styles.firstMessage} className={styles.message}>
            정말로 삭제를 원하시나요?
          </div>
          <div id={styles.deleteMessage} className={styles.message}>
            삭제 요청은 되돌릴 수 없습니다
          </div>
          <div className={styles.yesOrNoButton}>
            <button
              className={styles.yesButton}
              type="button"
              onClick={deletePostFunc}
            >
              Yes
            </button>
            <button
              className={styles.noButton}
              type="button"
              onClick={() => {
                handleClose();
              }}
            >
              No
            </button>
          </div>
        </>
      )}
    </SimpleModal>
  );
};

export default PostDeleteModal;
