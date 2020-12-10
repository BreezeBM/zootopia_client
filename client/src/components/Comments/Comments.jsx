import React from 'react';
import styles from './Comments.module.css';
import Comment from '../Comment/Comment';

const Comments = ({
  userProfileId,
  getSpecificUser,
  setWhichComment,
  setCommentToWhom,
  postComment,
  postId,
  setCommentId,
  refreshPost,
  deleteComment,
  commentsInform,
  handleCommentBtn,
}) => {
  return (
    <div className={styles.comments}>
      {commentsInform.map((comment) => {
        return (
          <Comment
            userProfileId={userProfileId}
            getSpecificUser={getSpecificUser}
            setCommentId={setCommentId}
            setCommentToWhom={setCommentToWhom}
            setWhichComment={setWhichComment}
            postComment={postComment}
            postId={postId}
            refreshPost={refreshPost}
            replies={comment.replies}
            deleteComment={deleteComment}
            key={comment.commentId}
            commentId={comment.commentId}
            userId={comment.userId}
            thumbnail={comment.thumbnail}
            breed={comment.breed}
            petName={comment.petName}
            handleCommentBtn={handleCommentBtn}
            text={comment.text}
            time={comment.time}
          />
        );
      })}
    </div>
  );
};

export default Comments;
