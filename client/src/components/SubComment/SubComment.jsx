/* eslint-disable no-nested-ternary */
import { React, useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styles from './SubComment.module.css';
import updateBtn from '../../images/commentUpdateBtn.jpg';
import chatBtn from '../../images/chat.png';

const SubComment = ({
  userProfileId,
  getSpecificUser,
  postId,
  refreshPost,
  replyId,
  userId,
  commentId,
  setCommentId,
  setCommentToWhom,
  thumbnail,
  petName,
  text,
  time,
  handleCommentBtn,
}) => {
  const [today, setToday] = useState(null);
  const [hasRights, setHasRights] = useState(false);
  const textRef = useRef(null);
  const [updateToggled, setUpdateToggled] = useState(false);
  const [textUpdateToggled, setTextUpdateToggled] = useState(false);
  const [textInput, setTextInput] = useState(null);

  // 대댓글 삭제
  const deleteSubComment = async () => {
    try {
      const response = await axios.delete(
        `https://server.codestates-project.tk/post/reply`,
        {
          data: {
            postId,
            replyId,
          },
        },
        { withCredentials: true },
      );
      refreshPost(response.data.comments);
      setUpdateToggled(false);
    } catch (err) {
      if (err.response.status === 401) {
        history.push('/');
      } else {
        console.log(err);
      }
    }
  };

  // 대댓글 수정
  const updateSubComment = async () => {
    if (textUpdateToggled === true) {
      try {
        const response = await axios.patch(
          `https://server.codestates-project.tk/post/reply`,
          {
            postId,
            replyId,
            text: textInput,
          },
          { withCredentials: true },
        );
        refreshPost(response.data.comments);
      } catch (err) {
        if (err.response.status === 401) {
          history.push('/');
        } else if (err.response.status === 400) {
          alert('1글자 이상의 댓글을 입력해주세요');
        } else {
          console.log(err);
        }
      }
      setTextUpdateToggled(false);
      setUpdateToggled(false);
    } else {
      await setTextInput(text);
      await setTextUpdateToggled(true);
      textRef.current.focus();
    }
  };

  const checkEnterPress = (e) => {
    if (e.keyCode === 13) {
      updateSubComment();
    }
  };

  const getDateType = () => {
    const date = new Date(time);
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
    setToday(getDateType());
  });
  useEffect(() => {
    if (userId === userProfileId) {
      setHasRights(true);
    }
  }, [userProfileId, userId]);

  return (
    <div className={styles.subComment}>
      <div className={styles.contentsPart}>
        <img
          onClick={() => {
            getSpecificUser(userId);
          }}
          className={styles.profile}
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
          onClick={() => {
            console.log(userId);
          }}
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
                onClick={updateSubComment}
              />
              <i
                id={styles.commentDeleteBtn}
                className="fas fa-trash-alt"
                onClick={deleteSubComment}
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
  );
};

export default SubComment;
