import { useState } from "react";
import styles from './CommentBar.module.css'
import { IoIosSend } from "react-icons/io";
import {postComment} from '../../Services/Post.services';
import { getUserData } from "../../Services/Helper";

const CommentBar = ({id : postId}) => {
    const {token} = getUserData();
    const [text, setText] = useState('');
    const textChangeHandler = (event) => {setText(event.target.value)};
    const commentHandler = (event) => {
        console.log('simon'); 
        setText('');
        postComment(token,postId, text);
    };
    
    return (
        <div className={styles.comment_bar}>
            <input type="text" value={text} onChange={textChangeHandler} />
            <button onClick={commentHandler}><IoIosSend size={24} /></button>
        </div>
    );
};

export default CommentBar;