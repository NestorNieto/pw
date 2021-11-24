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

    const iconSize = 32;
    const navigate = useNavigate();
    const {token, username} = getUserData();
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const prevPage = () => setPage(page - 1);
    const nextPage = () => setPage(page + 1);
    //const isLastPage = page === lastPage - 2; // Error de paginacion en API
    const isFirstPage = page === 0;

    useEffect(() => {
        const getPostOwned = async () => {
            const response = await getOwnedPost(token, page);
            setPosts(response.data);
        };

        getPostOwned();
        
    }, [token,page]);

    return (
        <section className={styles.post_wrapper}>
            <div className={styles.posts_header}>
                <h1>Post de {username} </h1>
                <div className={styles.buttons}>
                {!isFirstPage && <button onClick={prevPage}><Left size = {iconSize}/></button>}
                <button onClick={nextPage}><Right size = {iconSize} /></button>
                <button onClick={ToAdd}><Add size = {iconSize} /></button>
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

