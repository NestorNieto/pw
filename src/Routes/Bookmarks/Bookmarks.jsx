import { useEffect, useState } from 'react';
import UserPost from '../../Components/Post/UserPost';
import { getUserData } from '../../Services/Helper'
import { getAllFavoritesPost, getOnePost } from '../../Services/Post.services'
import styles from './Bookmarks.module.css';

const Bookmarks = () => {
    const { token } = getUserData();
    const [posts, setPosts] = useState(undefined);

    useEffect(() => {
        const getFavs = async () => {
            const favorites = await getAllFavoritesPost(token);
            const promises = [];
            favorites.forEach((postId) => {
                promises.push(getOnePost(token, postId));
            });
            setPosts(await Promise.all(promises));
        };

        getFavs();
    }, [token,posts]);

    return (
        <div className={styles.post_wrapper}>
            {posts !== undefined && posts.map((post) => (<UserPost data={post} key={post._id} />))}
        </div>
        );
};

export default Bookmarks;