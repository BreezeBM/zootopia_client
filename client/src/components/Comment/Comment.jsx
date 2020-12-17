/* eslint-disable no-nested-ternary */
import { React, useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from './Comment.module.css';
import SubComments from '../SubComments/SubComments';
import updateBtn from '../../images/commentUpdateBtn.jpg';
import chatBtn from '../../images/chat.png';

const Comment = ({
  userProfileId,
  userId,
  getSpecificUser,
  setCommentId,
  setCommentToWhom,
  refreshPost,
  postId,
  replies,
  deleteComment,
  commentId,
  thumbnail,
  petName,
  text,
  time,
  handleCommentBtn,
}) => {
  // 수정권한이 있는지에 관한 처리
  const [today, setToday] = useState(null);
  const [hasRights, setHasRights] = useState(false);
  const textRef = useRef(null);
  const [updateToggled, setUpdateToggled] = useState(false);
  const [textUpdateToggled, setTextUpdateToggled] = useState(false);
  const [textInput, setTextInput] = useState(null);

  // 댓글 수정
  const updateComment = async () => {
    console.log(commentId);
    if (textUpdateToggled === true) {
      try {
        const response = await axios.patch(
          'https://server.codestates-project.tk/post/comment',
          {
            postId,
            commentId,
            text: textInput,
          },
          {
            withCredentials: true,
          },
        );
        refreshPost(response.data.comments);
        setTextUpdateToggled(false);
        setUpdateToggled(false);
      } catch (err) {
        if (err.response.status === 401) {
          history.push('/');
        } else if (err.response.status === 400) {
          alert('1글자 이상의 댓글을 입력해주세요');
        } else {
          console.log(err);
        }
      }
    } else {
      setTextInput(text);
      await setTextUpdateToggled(true);
      textRef.current.focus();
    }
  };

  const checkEnterPress = (e) => {
    if (e.keyCode === 13) {
      updateComment();
    }
  };

  const DMchat = () => {
    console.log('DM 보내기');
    console.log(userProfileId);
    console.log(userId);

    const idData = {
      myId: userProfileId,
    };
    const config = {
      method: 'post',
      url: `https://chat.codestates-project.tk/room/private/${userId}`,
      data: idData,
      withCredentials: true,
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

  // 수정권한이 있는지에 관한 처리
  useEffect(() => {
    if (userProfileId === userId) {
      setHasRights(true);
    }
  }, [userProfileId, userId]);

  const getDateType = () => {
    const todayDate = new Date();
    const date = new Date(time);
    const betweenTime = Math.floor(
      (todayDate.getTime() - date.getTime()) / 1000 / 60,
    );
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }
    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }
    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }
    return `${Math.floor(betweenTimeDay / 365)}년전`;
  };

  useEffect(() => {
    setToday(getDateType());
  }, []);
  return (
    <>
      <div className={styles.eachComment}>
        <div className={styles.subComment}>
          <div className={styles.contentsPart}>
            <img
              className={styles.profile}
              onClick={() => {
                getSpecificUser(userId);
              }}
              src={thumbnail}
              alt="profile"
            />
            <div className={styles.commentPart}>
              <span
                className={styles.nickname}
                onClick={() => {
                  getSpecificUser(userId);
                }}
              >
                {petName}
              </span>
              {textUpdateToggled ? (
                <input
                  onKeyDown={checkEnterPress}
                  spellCheck={false}
                  ref={textRef}
                  className={styles.textInput}
                  type="text"
                  value={textInput}
                  onChange={(e) => {
                    setTextInput(e.target.value);
                  }}
                />
              ) : (
                <span className={styles.textPart}>{text}</span>
              )}
            </div>
          </div>
          <div className={styles.dateAndBtnPart}>
            <span className={styles.date}>{today}</span>
            <img
              className={styles.chatBtn}
              src={chatBtn}
              alt="chat button"
              onClick={DMchat}
            />
            <span
              className={styles.commentBtn}
              onClick={async () => {
                await setCommentId(commentId);
                await setCommentToWhom(petName);
                handleCommentBtn();
              }}
            >
              답글 달기
            </span>
            {hasRights ? (
              updateToggled ? (
                <div className={styles.updateBtns}>
                  <img
                    className={styles.closeUpdateBtn}
                    src={updateBtn}
                    alt="updateBtn"
                    onClick={() => {
                      setTextUpdateToggled(false);
                      setTextInput(text);
                      setUpdateToggled(false);
                    }}
                  />
                  <i
                    id={styles.goToInputBtn}
                    className="far fa-edit"
                    onClick={updateComment}
                  />
                  <i
                    id={styles.commentDeleteBtn}
                    className="fas fa-trash-alt"
                    onClick={() => {
                      deleteComment(commentId);
                      setUpdateToggled(false);
                    }}
                  />
                </div>
              ) : (
                <img
                  className={styles.updateBtn}
                  src={updateBtn}
                  alt="updateBtn"
                  onClick={() => {
                    setUpdateToggled(true);
                  }}
                />
              )
            ) : null}
          </div>
        </div>
        <SubComments
          userProfileId={userProfileId}
          getSpecificUser={getSpecificUser}
          commentId={commentId}
          setCommentId={setCommentId}
          setCommentToWhom={setCommentToWhom}
          postId={postId}
          refreshPost={refreshPost}
          replies={replies}
          handleCommentBtn={handleCommentBtn}
        />
      </div>
    </>
  );
};

export default Comment;
