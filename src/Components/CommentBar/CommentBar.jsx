import { useState, useEffect } from "react";
import styles from './CommentBar.module.css'
import { IoIosSend } from "react-icons/io";
import {postComment} from '../../Services/Post.services';
import { getUserData } from "../../Services/Helper";
import {hasMinChars} from '../../Validations/strings';
import Notification from '../Notification/Notification';

const CommentBar = ({id : postId}) => {
    const {token} = getUserData();
    const [text, setText] = useState('');
    const textChangeHandler = (event) => {setText(event.target.value)};
    const [notify, setNotify] = useState(true);
    const [message, setMessage] = useState('');

    const commentHandler = async (event) => {
        setNotify(false);
        if(hasMinChars(text, 8)){
            await postComment(token,postId, text);
        }
        else{
            setMessage("El mensaje debe tener mínimo 8 caracteres. 📨");
        }
        setText('');
    };
    
    useEffect(() => {
        setNotify(true);
    },[notify]);

    return (
        <div className={styles.comment_bar}>
            <input type="text" value={text} onChange={textChangeHandler} />
            <button onClick={commentHandler}><IoIosSend size={24} /></button>
            {notify && <Notification message = {message}/>}
        </div>
    );
};

export default CommentBar;