import { useState } from 'react';
import styles from './Post.module.css';
import {AiFillEye, AiFillEyeInvisible, AiFillEdit} from 'react-icons/ai'
import { toggleActivePost } from '../../Services/Post.services';
import { getUserData } from '../../Services/Helper';
import { useNavigate } from 'react-router-dom';


const AdminPost = ({ data: post }) => {
    const iconSize  = 24;
    const { token } = getUserData();
    const navigate = useNavigate();
    const [visibility, setVisibility] = useState(post.active);
    const eyeIcon = visibility ? <AiFillEye size={iconSize} /> : <AiFillEyeInvisible size={iconSize} />;
    const handleToggle = () => { toggleActivePost(token, post._id); setVisibility(!visibility); }
    const handleEdit = () => {navigate(`/edit/${post._id}`,{state: {title :post.title, description: post.description, image: post.image}})};
    return (
        <div className={styles.post}>
            <h2>{post.title}<span> {post.user?.username} </span></h2>
            <p>{post.description}</p>
            {post.image !== undefined &&
                <div className={styles.img_wrapper}>
                    <img src={post.image} alt="Post " />
                </div>}
            <div className={styles.action}>
                <button id={styles.first} onClick={handleToggle}>{eyeIcon} {visibility ? "Visible" : "Invisible"} </button>
                <button id={styles.last} onClick={handleEdit}><AiFillEdit size={iconSize} /> Edit Post </button>
            </div>
        </div>
    );
};

export default AdminPost;