import { useState } from 'react';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa'
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Post.module.css';
import {BsFillBookmarkPlusFill, BsFillBookmarkCheckFill} from "react-icons/bs"
import { likePost, toggleFavorite } from '../../Services/Post.services';
import { getUserData } from '../../Services/Helper';
import Notification from '../../Components/Notification/Notification'

const UserPost = ({ data: post }) => {
    const location = useLocation();
    const { token, username } = getUserData();
    const iconSize = 24;
    const navigate = useNavigate();
    const initialLiked = post.likes.filter(like => like.username === username).length !== 0;
    const likes = post.likes?.length;
    const comments = post.comments.length;
    const [liked, setLiked] = useState(initialLiked);
    const [bookmarked, setBookmark] = useState(location?.state?.favorite || post.favorite);
    const [message, setMessage] = useState('');
    const likesCount = (initialLiked === liked) ? 0 : (liked ? 1 : -1);
    const likeIcon = liked ? <AiFillLike size={iconSize} /> : <AiOutlineLike size={iconSize} />;
    const BookMarkIcon = bookmarked ? <BsFillBookmarkCheckFill className={styles.filled} size={iconSize}/> : <BsFillBookmarkPlusFill size={iconSize}/>; 
    const handleLike = async () => { await likePost(token, post._id); setLiked(!liked) };
    const handleBookmark = async () => {
            
        const {message, error} = await toggleFavorite(token, post._id);
        if(!error){
            setBookmark(!bookmarked);
            post.favorite = bookmarked;
        }
        else{
            setMessage('');
            setMessage(message);
        }
        
    };
    const navigateToPost = () => { navigate(`/post/${post._id}`, { replace: true, state: {favorite: bookmarked} }) };
    return (
        <div className={styles.post}>
            <h2>{post.title}<span> {post.user?.username} </span></h2>
            <p>{post.description}</p>
            {post.image !== undefined &&
                <div className={styles.img_wrapper}>
                    <img src={post.image} alt="Post" />
                </div>}
            <div className={styles.action}>
                <button id={styles.first} onClick={handleLike}>{likeIcon} {likes + likesCount} </button>
                <button id={styles.second} onClick={navigateToPost}><FaComment size={iconSize} /> {comments} </button>
                <button id={styles.last} onClick={handleBookmark}>{BookMarkIcon}</button>
            </div>
            {message!=='' && <Notification message={message}/>}
        </div>
    )
};

export default UserPost;