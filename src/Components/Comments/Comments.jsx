import styles from './Comments.module.css'
const Comments = ({ data: commentsArray }) => {
    return (
        <div className={styles.comment_wrapper}>
            {
                commentsArray.map(comment => {
                    return (
                        <div className={styles.comment} key={comment._id}>
                            <h3>{comment.user.username}</h3>
                            <p>{comment.description}</p>
                        </div>
                    );
                })
            }

            
        </div>
    )
};

export default Comments;