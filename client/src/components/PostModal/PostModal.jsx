/* eslint-disable no-nested-ternary */
import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from './PostModal.module.css';
import ImageSlide from '../ImageSlide/ImageSlide';
import close from '../../images/close.png';
import Comments from '../Comments/Comments';
import likeImg from '../../images/fulfilledHeart.png';
import unLikeImg from '../../images/unfulfilledHeart.png';
import updateBtn from '../../images/updateBtn.png';
import PostDeleteModal from '../PostDeleteModal/PostDeleteModal';
import chatBtn from '../../images/chat.png';

const PostModal = ({
  kind,
  setProfileForDeleteAndAdd,
  setUserProfile,
  userProfileId,
  setPostModalData,
  refreshPost,
  getPosts,
  getUserData,
  postData,
  isModalOn,
  handleClose,
  deletePost,
}) => {
  // 포스팅에 대한 수정권한이 있는지에 대한 설정
  const [today, setToday] = useState(null);
  const [hasRights, setHasRights] = useState(false);
  const history = useHistory();
  // rerender 될 때마다 바뀔 수 있도록 변수로 post와 user정보는 const 변수로 선언
  const userInform = postData.user;
  const postDatas = postData.post;
  const commentsInform = postData.comments;
  const commentInputRef = useRef(null);
  const textRef = useRef(null);
  const [commentToggle, setCommentToggle] = useState(false);
  const [updateBtnToggle, setUpdateBtnToggle] = useState(false);
  const [textUpdateToggled, setTextUpdateToggled] = useState(false);
  const [isDeleteOn, setIsDeleteOn] = useState(false);

  const [textVal, setTextVal] = useState(null);

  // post에 대한 댓글인지, 댓글에 대한 대댓글인지
  const [whichComment, setWhichComment] = useState('comment');
  const [commentToWhom, setCommentToWhom] = useState(null);
  const [comment, setComment] = useState(null);
  const [commentId, setCommentId] = useState(null);

  // postModal 창 닫을 때 전부다 디폴트로 돌리는고 꺼주는 세팅
  const makePostDefaultSetting = () => {
    setIsDeleteOn(false);
    handleClose();
  };
  // ################################################

  // ################################################
  // 좋아요 버튼 눌렀을 때 처리 logic
  const handleLike = async () => {
    try {
      const response = await axios.post(
        'https://server.codestates-project.tk/post/togglelike',
        {
          postId: postDatas.postId,
          likeChecked: !postDatas.likeChecked,
        },
        {
          withCredentials: true,
        },
      );

      setPostModalData({
        ...postData,
        post: {
          ...postData.post,
          likeChecked: !postData.post.likeChecked,
          likeCount: postData.post.likeCount + Number(response.data),
        },
      });
    } catch (err) {
      if (err.response.status === 401) {
        history.push('/');
      } else {
        console.log(err);
      }
    }
  };
  // ################################################

  // ################################################
  // 답글 달기 버튼 눌렀을 때 처리 logic
  const handleCommentBtn = async () => {
    await setWhichComment('subComment');
    commentInputRef.current.focus();
  };
  // ################################################
  // 포스트 제거 버튼을 눌렀을 때 나오는 모달창 on off logic
  const closeDeleteModal = async (deleted) => {
    if (isDeleteOn && deleted) {
      // 만약 모달창이 켜져있는데, 삭제가 이미 이루어졌다면, 삭제 모달창과 postModal 창 둘다 끄기
      await setIsDeleteOn(false);
      handleClose();
    } else if (isDeleteOn) {
      // 삭제는 안됐고, 모달창만 켜져있다면, 삭제 모달창만 끄기
      await setIsDeleteOn(false);
    } else {
      // 모달창이 켜져있지 않다면 켜기
      await setIsDeleteOn(true);
    }
  };
  // ################################################

  // ################################################
  // 특정 유저 프로필 + 그에 따른 grid 데이터 불러오기(댓글 및 대댓글 창의 프로필을 클릭했을 때에도 이 function을 씀)
  const getSpecificUser = async (id) => {
    getPosts(id);
    getUserData(id);
    handleClose();
  };
  // ################################################

  const checkEnterPress = (e) => {
    if (e.keyCode === 13) {
      updatePost();
    }
  };
  const sendComment = (e) => {
    if (e.keyCode === 13) {
      commentInputRef.current.blur();
    }
  };
  // 포스트 수정
  const updatePost = async () => {
    if (textUpdateToggled === true) {
      setTextUpdateToggled(false);
      setUpdateBtnToggle(false);
      try {
        await axios.patch(
          `https://server.codestates-project.tk/post`,
          {
            postId: postDatas.postId,
            text: textVal,
          },
          { withCredentials: true },
        );
        setPostModalData((prev) => {
          return { ...prev, post: { ...prev.post, text: textVal } };
        });
        await setTextUpdateToggled(false);
        setUpdateBtnToggle(false);
      } catch (err) {
        if (err.response.status === 401) {
          history.push('/');
        } else if (err.response.status === 400) {
          alert('포스팅 내용을 반드시 입력해주세요');
        } else {
          console.log(err);
        }
      }
      // test 용도
      // await setPostInform({ ...postInform, text: textRef.current.value });
      // await setTextUpdateToggled(false);
      // setUpdateBtnToggle(false);
    } else {
      setTextVal(postDatas.text);
      await setTextUpdateToggled(true);
      textRef.current.focus();
    }
  };

  // 코멘트 남기기
  const postComment = async () => {
    if (whichComment === 'comment') {
      try {
        const response = await axios.post(
          'https://server.codestates-project.tk/post/comment',
          {
            postId: postDatas.postId,
            text: comment,
          },
          {
            withCredentials: true,
          },
        );
        commentInputRef.current.value = null;
        refreshPost(response.data.comments);
      } catch (err) {
        if (err.response.status === 401) {
          history.push('/');
        } else {
          console.log(err);
        }
      }
    } else if (whichComment === 'subComment') {
      try {
        const response = await axios.post(
          'https://server.codestates-project.tk/post/reply',
          {
            postId: postDatas.postId,
            commentId,
            text: comment,
          },
          {
            withCredentials: true,
          },
        );
        commentInputRef.current.value = null;
        setWhichComment('comment');
        refreshPost(response.data.comments);
      } catch (err) {
        if (err.response.status === 401) {
          history.push('/');
        } else {
          console.log(err);
        }
      }
    }
  };

  // 코멘트 삭제
  const deleteComment = async (id) => {
    try {
      const response = await axios.delete(
        'https://server.codestates-project.tk/post/comment',
        {
          data: {
            postId: postDatas.postId,
            commentId: id,
          },
        },
        {
          withCredentials: true,
        },
      );
      refreshPost(response.data.comments);
    } catch (err) {
      if (err.response.status === 401) {
        history.push('/');
      } else {
        console.log(err);
      }
    }
  };

  const DMchat = () => {
    console.log('DM 보내기');
    console.log(userProfileId.userId);
    console.log(userInform.userId);

    const idData = {
      myId: userProfileId.userId,
    };
    const config = {
      method: 'post',
      url: `https://chat.codestates-project.tk/room/private/${userInform}`,
      data: idData,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        history.push('/chat');
        console.log('야호~~~');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getDateType = () => {
    const date = new Date(postDatas.time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dates = date.getDate();
    let day = date.getDay();
    if (day === 1) day = '월';
    if (day === 2) day = '화';
    if (day === 3) day = '수';
    if (day === 4) day = '목';
    if (day === 5) day = '금';
    if (day === 6) day = '토';
    if (day === 0) day = '일';
    const dateForm = `${year}/${month}/${dates} (${day})`;
    return dateForm;
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 65rem)');
    if (mediaQuery.matches) {
      setCommentToggle(false);
    } else {
      setCommentToggle(true);
    }
    setToday(getDateType());
  }, []);

  // 포스팅에 대한 수정권한이 있는지에 대한 설정
  useEffect(() => {
    if (userInform.userId === userProfileId) {
      setHasRights(true);
    }
  }, [userProfileId, userInform]);

  useEffect(() => {
    const body = document.querySelector('body');
    body.setAttribute('overflow-y', 'hidden');
    body.setAttribute('height', '100vh');
    body.setAttribute('padding-right', '15px');
  }, [isModalOn]);

  return (
    <>
      <PostDeleteModal
        kind={kind}
        setProfileForDeleteAndAdd={setProfileForDeleteAndAdd}
        setUserProfile={setUserProfile}
        postId={postDatas.postId}
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
            onClick={
              // 무슨 액션이던지 중간에 모달창을 닫으면 다 리셋시켜줘야함
              makePostDefaultSetting
            }
          />
          <div className={styles.postModal}>
            <ImageSlide
              imageUrls={[
                postDatas.picture_1,
                postDatas.picture_2,
                postDatas.picture_3,
              ]}
            />
            <div className={styles.contents}>
              <div
                className={styles.userArea}
                onClick={() => {
                  getSpecificUser(userInform.userId);
                }}
              >
                <div className={styles.profile_imgage}>
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
                {hasRights ? (
                  updateBtnToggle ? (
                    <div className={styles.updateBtns}>
                      <img
                        className={styles.closeUpdateBtn}
                        src={updateBtn}
                        alt="updateBtn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setTextUpdateToggled(false);
                          setUpdateBtnToggle(false);
                        }}
                      />
                      <i
                        className="far fa-edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          updatePost();
                        }}
                      />
                      <i
                        className="fas fa-trash-alt"
                        id={styles.deleteBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          closeDeleteModal();
                        }}
                      />
                    </div>
                  ) : (
                    <img
                      className={styles.updateBtn}
                      src={updateBtn}
                      alt="updateBtn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUpdateBtnToggle(true);
                      }}
                    />
                  )
                ) : null}
              </div>
              {textUpdateToggled ? (
                <textarea
                  onKeyDown={checkEnterPress}
                  ref={textRef}
                  spellCheck={false}
                  className={styles.updateText}
                  value={textVal}
                  onChange={(e) => {
                    setTextVal(e.target.value);
                  }}
                />
              ) : (
                <div className={styles.textArea}>{postDatas.text}</div>
              )}

              <div className={styles.date}>{today}</div>
              <div className={styles.buttonArea}>
                {postDatas.likeChecked ? (
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
                <img
                  className={styles.chatBtn}
                  src={chatBtn}
                  alt="chat button"
                  onClick={DMchat}
                />
                <div className={styles.likeCount}>
                  {`좋아요 ${postDatas.likeCount}개`}
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
                  <Comments
                    userProfileId={userProfileId}
                    getSpecificUser={getSpecificUser}
                    setCommentId={setCommentId}
                    setCommentToWhom={setCommentToWhom}
                    setWhichComment={setWhichComment}
                    postComment={postComment}
                    postId={postDatas.postId}
                    refreshPost={refreshPost}
                    deleteComment={deleteComment}
                    commentsInform={commentsInform}
                    handleCommentBtn={handleCommentBtn}
                  />
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
                  onBlur={postComment}
                  onKeyDown={sendComment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  ref={commentInputRef}
                  className={styles.commentInput}
                  spellCheck="false"
                  type="text"
                  placeholder="댓글 달기.."
                />
                {whichComment === 'subComment' ? (
                  <div
                    className={styles.subCommentMessage}
                    onClick={() => {
                      setWhichComment('comment');
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 'bold',
                        fontFamily: 'bazzi',
                        fontSize: '1.2rem',
                      }}
                    >
                      {commentToWhom}
                    </span>
                    님께 답글 달기 취소
                  </div>
                ) : null}
                <span onClick={postComment} className={styles.commentBtn}>
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
