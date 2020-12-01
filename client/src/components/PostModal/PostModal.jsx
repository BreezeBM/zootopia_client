import React, { useState } from 'react';
import styles from './PostModal.module.css';
import Modal from '../Modal/Modal';
import ImageSlide from '../ImageSlide/ImageSlide';
import Comments from '../Comments/Comments';
import dummyImg from '../../thumbnails/post_f.png';
import likeImg from '../../images/fulfilledHeart.png';
import unLikeImg from '../../images/unfulfilledHeart.png';
import chatImg from '../../images/chat.png';

const PostModal = ({ isModalOn, handleClose }) => {
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike(!like);
  };
  return (
    <Modal isModalOn={isModalOn} handleClose={handleClose}>
      <div className={styles.postModal}>
        <ImageSlide />
        <div className={styles.contents}>
          <div className={styles.userArea}>
            <div className={styles.profile_imgage}>
              <img
                className={styles.profile_image_img}
                src={dummyImg}
                alt="profile"
              />
            </div>
            <div
              className={styles.profile_inform}
              onClick={() => {
                console.log('해당 유저 grid 정보 요청');
              }}
            >
              <div className={styles.nickname}>
                스눕독스눕독스눕독스눕독스눕독스눕독
              </div>
              <div className={styles.breed}>시바견</div>
            </div>
          </div>
          <div className={styles.textArea}>
            Normally a WordPress developer will need to perform the task of
            filling up an empty theme with dummy content, and doing this
            manually can be really time consuming
          </div>
          <div className={styles.date}>2020/11/28 22:22 (수)</div>
          <div className={styles.buttonArea}>
            {like ? (
              <img
                className={styles.like}
                src={likeImg}
                alt="like"
                onClick={handleLike}
              />
            ) : (
              <img
                className={styles.unLike}
                src={unLikeImg}
                alt="unlike"
                onClick={handleLike}
              />
            )}
            <img className={styles.chatImg} src={chatImg} alt="chat" />
            <div className={styles.likeCount}>좋아요 12개</div>
          </div>
          <Comments />
          <div className={styles.inputPart}>
            <input
              className={styles.commentInput}
              spellCheck="false"
              type="text"
              placeholder="댓글 달기.."
            />
            <div
              className={styles.commentButton}
              onClick={() => {
                console.log('hi');
              }}
            >
              게시
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;
