import { useEffect, useState } from "react";
import { getUserData } from "../../Services/Helper";
import { getAllFavoritesPost, getAllPosts } from "../../Services/Post.services";
import { BsFillBookmarkStarFill as Bookmark } from 'react-icons/bs';
import { AiFillLeftSquare as Left, AiFillRightSquare as Right } from 'react-icons/ai'
import styles from './UserHome.module.css';
import UserPost from "../../Components/Post/UserPost";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
    const navigate = useNavigate();

    const iconSize = 24;
    const [lastPage, setLastPage] = useState(0);
    const { username, token } = getUserData();
    const [page, setPage] = useState(0);
    const [posts, setPosts] = useState([]);
    const isLastPage = page === lastPage - 1; // Error de paginacion en API
    const isFirstPage = page === 0;
    const prevPage = () => setPage(page - 1);
    const nextPage = () => setPage(page + 1);
    const ToBookmarks = () => {
        navigate("/bookmarks", { replace: true })
    };
    useEffect(() => {
        const getPost = async () => {
            const favorites = await getAllFavoritesPost(token);
            const { data, pages } = await getAllPosts(token, page);
            const modifiedPost = data.map((post) => {
                post.favorite = favorites.indexOf(post._id) !== -1;
                return post;
            });
            setPosts(modifiedPost);
            setLastPage(pages);
        };
        getPost();
    }, [token, page]);
    return (
        <section className={styles.post_wrapper}>
            <div className={styles.posts_header}>
                <h1>Bienvenido {username}</h1>
                <div className={styles.buttons}>
                    {!isFirstPage && <button onClick={prevPage}><Left size={iconSize} /></button>}
                    {!isLastPage && <button onClick={nextPage}><Right size={iconSize} /></button>}
                    <button onClick={ToBookmarks}><Bookmark size={iconSize} /></button>
                </div>
            </div>
            {
                posts.map(post => {
                    return (<UserPost data={post} key={post._id} />)
                })
            }
        </section>
    );
};

export default UserHome;