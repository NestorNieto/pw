import UserPost from '../../Components/Post/UserPost'
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getOnePost } from '../../Services/Post.services';
import { getUserData } from '../../Services/Helper';
import styles from './GetPost.module.css';
import Comments from '../../Components/Comments/Comments';
import CommentBar from '../../Components/CommentBar/CommentBar'

const GetPost = () => {
    const navigate = useNavigate();
    const {postId} = useParams();
    const {token} = getUserData();
    const [post, setPost] = useState({});
    const postIsEmpty = (post) => post 
    && Object.keys(post).length === 0
    && Object.getPrototypeOf(post) === Object.prototype;


    useEffect(() =>{
        const getPost = async () => {
            const fetchedPost = await getOnePost(token, postId);
            if(postIsEmpty(fetchedPost)){
                navigate('/error', {replace: true, state: {error: "Post no existe."}})
            }
            setPost(fetchedPost);
            
        };

        getPost();
        console.log(postIsEmpty);
        

    }, );

    return(
        <section className={styles.post_wrapper}>
        {!postIsEmpty(post) && <UserPost data = {post} />}
        {!postIsEmpty(post) && <Comments data = {post.comments}/>}
        <CommentBar id = {postId}/>
        </section>
    );
};

export default GetPost;