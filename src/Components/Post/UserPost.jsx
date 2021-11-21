import { useState } from 'react';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import styles from './Post.module.css';
import {BsFillBookmarkPlusFill, BsFillBookmarkCheckFill} from "react-icons/bs"
import { likePost, toggleFavorite } from '../../Services/Post.services';
import { getUserData } from '../../Services/Helper';
import Notification from '../../Components/Notification/Notification'

const UserPost = ({ data, isFavorite }) => {
    const { token, username } = getUserData();
    const size = 24;
    const navigate = useNavigate();
    const initialLiked = data.likes.filter(like => like.username === username).length !== 0;
    const likes = data.likes?.length;
    const comments = data.comments.length;
    const [liked, setLiked] = useState(initialLiked);
    const [bookmarked, setBookmark] = useState(isFavorite);
    const [message, setMessage] = useState('');
    const likesCount = (initialLiked === liked) ? 0 : (liked ? 1 : -1);
    const likeIcon = liked ? <AiFillLike size={size} /> : <AiOutlineLike size={size} />;
    const BookMarkIcon = bookmarked ? <BsFillBookmarkCheckFill className={styles.filled} size={size}/> : <BsFillBookmarkPlusFill size={size}/>; 
    const handleLike = () => { likePost(token, data._id); setLiked(!liked) };
    const handleBookmark = async () => {
        const {message, error} = await toggleFavorite(token, data._id);
        if(!error){
            setBookmark(!bookmarked);
        }
        else{
            setMessage('');
            setMessage(message);
        }
        
    };
    const navigateToPost = () => { navigate(`/post/${data._id}`, { replace: true }) };
    return (
        <div className={styles.post}>
            <h2>{data.title}<span> {data.user?.username} </span></h2>
            <p>{data.description}</p>
            {data.image !== undefined &&
                <div className={styles.img_wrapper}>
                    <img src={data.image} alt="Post" />
                </div>}
            <div className={styles.action}>
                <button id={styles.first} onClick={handleLike}>{likeIcon} {likes + likesCount} </button>
                <button id={styles.second} onClick={navigateToPost}><FaComment size={size} /> {comments} </button>
                <button id={styles.last} onClick={handleBookmark}>{BookMarkIcon}</button>
            </div>
            {message!=='' && <Notification message={message}/>}
        </div>
    )
};

export default UserPost;