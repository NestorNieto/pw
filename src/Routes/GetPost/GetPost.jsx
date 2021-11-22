import UserPost from '../../Components/Post/UserPost'
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getOnePost } from '../../Services/Post.services';
import { getUserData } from '../../Services/Helper';
import styles from './GetPost.module.css';
import Comments from '../../Components/Comments/Comments';
import CommentBar from '../../Components/CommentBar/CommentBar';
import { objIsEmpty } from '../../Validations/object';

const GetPost = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const { token } = getUserData();
    const [post, setPost] = useState({});

    useEffect(() => {
        const getPost = async () => {
            const fetchedPost = await getOnePost(token, postId);
            if (objIsEmpty(fetchedPost)) {
                navigate('/error', { replace: true, state: { error: "Post no existe." } })
            }
            setPost(fetchedPost);
        };
        getPost();
    });

    if (!objIsEmpty(post)) {
        return (
        <section className={styles.post_wrapper}>
            <UserPost data={post} />
            <Comments data={post.comments} />
            <CommentBar id={postId} />
        </section>
        )
    }
    else{
        return null;
    }
};

export default GetPost;