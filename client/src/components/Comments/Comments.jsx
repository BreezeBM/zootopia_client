import React from 'react';
import styles from './Comments.module.css';
import Comment from '../Comment/Comment';

const Comments = ({
  userProfileId,
  getSpecificUser,
  setCommentToWhom,
  postId,
  setCommentId,
  refreshPost,
  deleteComment,
  commentsInform,
  handleCommentBtn,
  DMdefault,
}) => {
  return (
    <div className={styles.comments}>
      {commentsInform.map((comment) => {
        return (
          <Comment
            userProfileId={userProfileId}
            userId={comment.userId}
            getSpecificUser={getSpecificUser}
            setCommentId={setCommentId}
            setCommentToWhom={setCommentToWhom}
            refreshPost={refreshPost}
            postId={postId}
            replies={comment.replies}
            deleteComment={deleteComment}
            commentId={comment.commentId}
            thumbnail={comment.thumbnail}
            petName={comment.petName}
            text={comment.text}
            time={comment.time}
            handleCommentBtn={handleCommentBtn}
            DMdefault={DMdefault}
          />
        );
      })}
    </div>
  );
};

export default Comments;
