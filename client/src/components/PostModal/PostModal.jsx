import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styles from './PostModal.module.css';
import ImageSlide from '../ImageSlide/ImageSlide';
import close from '../../images/close.png';
import Comments from '../Comments/Comments';
import likeImg from '../../images/fulfilledHeart.png';
import unLikeImg from '../../images/unfulfilledHeart.png';
import updateBtn from '../../images/updateBtn.png';
import PostDeleteModal from '../PostDeleteModal/PostDeleteModal';

const PostModal = ({
  getPosts,
  getUserData,
  postData,
  isModalOn,
  handleClose,
  deletePost,
}) => {
  const [userInform, setUserInform] = useState(postData.user);
  const [postInform, setPostInform] = useState(postData.post);
  const [commentsInform, setCommentsInform] = useState(postData.comments);
  const commentInputRef = useRef(null);
  const [like, setLike] = useState(postInform.likeChecked);
  const [commentToggle, setCommentToggle] = useState(false);
  const [updateBtnToggle, setUpdateBtnToggle] = useState(false);
  const [textUpdateToggled, setTextUpdateToggled] = useState(false);
  const [isDeleteOn, setIsDeleteOn] = useState(false);
  const [textVal, setTextVal] = useState();
  const textRef = useRef(postInform.text);

  const handleLike = () => {
    setLike(!like);
  };

  // const writeComment = () => {
  //   console.log('댓글쓰기');
  // };

  const handleCommentBtn = () => {
    commentInputRef.current.focus();
  };

  const closeDeleteModal = (deleted) => {
    if (deleted) {
      setIsDeleteOn(false);
      handleClose();
    } else {
      setIsDeleteOn(true);
    }
  };

  // 특정 유저 프로필 + 그에 따른 grid 데이터 불러오기
  const getSpecificUser = () => {
    const id = userInform.userId;
    getPosts(id, 0, 0, 15);
    getUserData(id);
    handleClose();
  };

  // 포스트 수정
  const updatePost = async () => {
    if (textUpdateToggled === true) {
      // try {
      //   await axios.patch(
      //     `https://server.codestates-project.tk/post`,
      //     {
      //       postId: postInform.postId,
      //       text: textVal,
      //     },
      //     { withCredentials: true },
      //   );
      //   setPostInform({ ...postInform, text: textVal });
      //   await setTextUpdateToggled(false);
      //   setUpdateBtnToggle(false);
      // } catch (err) {
      //   console.log(err);
      // }

      // test 용도
      setPostInform({ ...postInform, text: textVal });
      await setTextUpdateToggled(false);
      setUpdateBtnToggle(false);
    } else {
      await setTextUpdateToggled(true);
      textRef.current.focus();
    }
  };

  // 포스트 삭제

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 65rem)');
    if (mediaQuery.matches) {
      setCommentToggle(false);
    } else {
      setCommentToggle(true);
    }
  }, []);

  return (
    <>
      <PostDeleteModal
        postId={postInform.postId}
        deletePost={deletePost}
        isModalOn={isDeleteOn}
        handleClose={closeDeleteModal}
      />
      <div className={`${styles.modal} ${isModalOn && styles.isOn}`}>
        <div className={styles.box}>
          <img
            className={styles.close}
            src={close}
            alt="close"
            onClick={handleClose}
          />
          <div className={styles.postModal}>
            <ImageSlide
              imageUrls={[
                postInform.picture_1,
                postInform.picture_2,
                postInform.picture_3,
              ]}
            />
            <div className={styles.contents}>
              <div className={styles.userArea}>
                <div
                  className={styles.profile_imgage}
                  onClick={getSpecificUser}
                >
                  <img
                    className={styles.profile_image_img}
                    src={userInform.thumbnail}
                    alt="profile"
                  />
                </div>
                <div className={styles.profile_inform}>
                  <div className={styles.nickname}>{userInform.petName}</div>
                  <div className={styles.breed}>{userInform.breed}</div>
                </div>
                {updateBtnToggle ? (
                  <div className={styles.updateBtns}>
                    <img
                      className={styles.closeUpdateBtn}
                      src={updateBtn}
                      alt="updateBtn"
                      onClick={() => {
                        setUpdateBtnToggle(false);
                      }}
                    />
                    <i className="far fa-edit" onClick={updatePost} />
                    <i
                      className="fas fa-trash-alt"
                      id={styles.deleteBtn}
                      onClick={closeDeleteModal}
                    />
                  </div>
                ) : (
                  <img
                    className={styles.updateBtn}
                    src={updateBtn}
                    alt="updateBtn"
                    onClick={() => {
                      setUpdateBtnToggle(true);
                    }}
                  />
                )}
              </div>
              {textUpdateToggled ? (
                <textarea
                  ref={textRef}
                  spellCheck={false}
                  className={styles.updateText}
                  value={textVal}
                  onChange={(e) => {
                    setTextVal(e.target.value);
                  }}
                />
              ) : (
                <div className={styles.textArea}>{postInform.text}</div>
              )}

              <div className={styles.date}>{postInform.time}</div>
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
                <div className={styles.likeCount}>
                  {`좋아요 ${postInform.likeCount}개`}
                </div>
              </div>
              {commentToggle ? (
                <>
                  <div
                    className={styles.commentFolder}
                    onClick={() => {
                      setCommentToggle(false);
                    }}
                  >
                    댓글 접기
                  </div>
                  <Comments handleCommentBtn={handleCommentBtn} />
                </>
              ) : (
                <div
                  onClick={() => {
                    setCommentToggle(true);
                  }}
                  className={styles.commentFolder}
                >
                  댓글 펼치기...
                </div>
              )}
              <div className={styles.inputPart}>
                <input
                  ref={commentInputRef}
                  className={styles.commentInput}
                  spellCheck="false"
                  type="text"
                  placeholder="댓글 달기.."
                />
                <span
                  onClick={() => {
                    console.log('댓글 남기기');
                  }}
                  className={styles.commentBtn}
                >
                  게시
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostModal;
