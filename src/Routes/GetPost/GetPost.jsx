import Post from '../../Components/Post/Post'
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getOnePost } from '../../Services/Post.services';
import { getUserData } from '../../Services/Helper';
import styles from './GetPost.module.css';
import Comments from '../../Components/Comments/Comments';
const GetPost = () => {
    const {postId} = useParams();
    const {token} = getUserData();
    const [post, setPost] = useState({});
    const postIsEmpty = post 
    && Object.keys(post).length === 0
    && Object.getPrototypeOf(post) === Object.prototype;

    useEffect(() =>{
        const getPost = async () => {
            const post = await getOnePost(token, postId);
            setPost(post);
        } ;
        getPost();
    }, [token, postId]);

    return(
        <section className={styles.post_wrapper}>
        {!postIsEmpty && <Post data = {post} />}
        {!postIsEmpty && <Comments data = {post.comments}/>}
        </section>
    );
};

export default GetPost;