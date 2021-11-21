import { useEffect, useState } from 'react';
import UserPost from '../../Components/Post/UserPost';
import { getUserData } from '../../Services/Helper'
import { getAllFavoritesPost, getOnePost } from '../../Services/Post.services'
import styles from './Bookmarks.module.css';

const Bookmarks = () => {
    const { token } = getUserData();
    const [posts, setPosts] = useState(undefined);
    const [reRender, setReRender] = useState(false);

    const forceRender = () => {
        setReRender(!reRender);
    }
    useEffect(() => {
        const getFavs = async () => {
            const favorites = await getAllFavoritesPost(token);
            const promises = [];
            favorites.forEach((postId) => {
                promises.push(getOnePost(token, postId));
            });
            const favPost = await Promise.all(promises);
            const modifiedPosts = await favPost.map(post => {post.favorite=true; return post;});
            console.table(modifiedPosts);
            setPosts(modifiedPosts);
        };

        getFavs();
    }, [token, reRender]);

    if (posts === undefined) {
        return <div className={styles.start}> <p>Cargando favoritos...</p></div>
    }
    else {
        return(
        <div className={styles.post_wrapper}>
        {posts.map((post) => (<UserPost data={post} key={post._id} forceRender = {forceRender} />))}
        </div>
        );
    }
};

export default Bookmarks;