import styles from './Post.module.css';
import { AiFillEyeInvisible, AiFillEye, AiFillEdit, AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { getUserData } from '../../Services/Helper';
import { FaComment} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { likePost, toggleActivePost } from '../../Services/Post.services';

const Post = ({ data }) => {
    const size = 24;
    const { role, token, username } = getUserData();
    const initialLiked = data.likes.filter(like => like.username === username).length !== 0;
    const navigate = useNavigate();
    const [visibility, setVisibility] = useState(data.active);
    const [liked, setLiked] = useState(initialLiked);
    const likes = data.likes?.length;
    const comments = data.comments.length;
    const eyeIcon = visibility ? <AiFillEye size={size} /> : <AiFillEyeInvisible size={size} />;
    const likeIcon = liked ? <AiFillLike size = {size}/> : <AiOutlineLike size = {size}/>;

    const handleToggle = () => { toggleActivePost(token, data._id); setVisibility(!visibility); }
    const handleLike = () => {likePost(token, data._id); setLiked(!liked)};
    const navigateToPost = () => { navigate(`/post/${data._id}`, {replace: true})};
    const likesCount = (initialLiked === liked)? 0 : (liked? 1: -1);
    const handleEdit = () => {navigate(`/edit/${data._id}`,{state: {title :data.title, description: data.description, image: data.image}})};
    const ActionButtons = () => {
        if (role === 'admin') {
            return (
                <>
                    <button id={styles.first} onClick={handleToggle}>{eyeIcon} {visibility ? "Visible" : "Invisible"} </button>
                    <button id={styles.second} onClick={handleEdit}><AiFillEdit size={size} /> Edit Post </button>
                </>
            );
        }
        else if (role === 'user') {
            return (
                <>
                    <button id={styles.first} onClick={handleLike}>{likeIcon} {likes + likesCount} </button>
                    <button id={styles.second} onClick = {navigateToPost}><FaComment size = {size} /> {comments} </button>
                </>
            );
        }
    };
    return (
        <div className={styles.post}>
            <h2>{data.title}<span> {data.user?.username} </span></h2>
            <p>{data.description}</p>
            {data.image !== undefined &&
                <div className={styles.img_wrapper}>
                    <img src={data.image} alt="Post " />
                </div>}
            <div className={styles.action}>
                {ActionButtons()}
            </div>
        </div>
    )
};

export default Post;