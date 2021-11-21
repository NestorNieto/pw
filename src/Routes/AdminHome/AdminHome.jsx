import { useEffect, useState } from 'react';
import {AiFillLeftSquare as Left , AiFillRightSquare as Right, AiFillPlusSquare as Add} from 'react-icons/ai'
import { useNavigate } from 'react-router';
import styles from './AdminHome.module.css';
import { getOwnedPost } from '../../Services/Post.services';
import { getUserData } from '../../Services/Helper';
import AdminPost from '../../Components/Post/AdminPost';

const AdminHome = () => {
    const ToAdd = () => {
        navigate("/create", {replace: true})
    };

    const size = 32;
    const navigate = useNavigate();
    const {token, username} = getUserData();
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        const getPostOwned = async () => {
            const response = await getOwnedPost(token, 0);
            setPosts(response.data);
            console.table(response);
        };

        getPostOwned();
        
    }, [token]);

    return (
        <section className={styles.post_wrapper}>
            <div className={styles.posts_header}>
                <h1>Post de {username} </h1>
                <div className={styles.buttons}>
                <button><Left size = {size}/></button>
                <button><Right size = {size} /></button>
                <button onClick={ToAdd}><Add size = {size} /></button>
                </div>
            </div>
            {posts.map( post => {
                return (
                    <AdminPost data={post} key={post._id}/>
                );
            })}
        </section>
    );
};
export default AdminHome;

