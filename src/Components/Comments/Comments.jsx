import styles from './Comments.module.css'
import { IoIosSend} from 'react-icons/io'
import { useState } from 'react';
const Comments = ({ data: commentsArray }) => {
    const [text, setText] = useState('');
    const textChangeHandler = (event) => {setText(event.target.value)};
    const commentHandler = (event) => {console.log('simon'); setText('')};
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

            <div className={styles.comment_bar}>
                <input type="text" value={text} onChange = {textChangeHandler}/>
                <button onClick={commentHandler}><IoIosSend size = {24} /></button>
            </div>
        </div>
    )
};

export default Comments;