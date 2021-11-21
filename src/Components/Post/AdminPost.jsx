import { useState } from 'react';
import styles from './Post.module.css';
import {AiFillEye, AiFillEyeInvisible, AiFillEdit} from 'react-icons/ai'
import { toggleActivePost } from '../../Services/Post.services';
import { getUserData } from '../../Services/Helper';
import { useNavigate } from 'react-router-dom';


const AdminPost = ({ data }) => {
    const size  = 24;
    const { token } = getUserData();
    const navigate = useNavigate();
    const [visibility, setVisibility] = useState(data.active);
    const eyeIcon = visibility ? <AiFillEye size={size} /> : <AiFillEyeInvisible size={size} />;
    const handleToggle = () => { toggleActivePost(token, data._id); setVisibility(!visibility); }
    const handleEdit = () => {navigate(`/edit/${data._id}`,{state: {title :data.title, description: data.description, image: data.image}})};
    return (
        <div className={styles.post}>
            <h2>{data.title}<span> {data.user?.username} </span></h2>
            <p>{data.description}</p>
            {data.image !== undefined &&
                <div className={styles.img_wrapper}>
                    <img src={data.image} alt="Post " />
                </div>}
            <div className={styles.action}>
                <button id={styles.first} onClick={handleToggle}>{eyeIcon} {visibility ? "Visible" : "Invisible"} </button>
                <button id={styles.last} onClick={handleEdit}><AiFillEdit size={size} /> Edit Post </button>
            </div>
        </div>
    );
};

export default AdminPost;