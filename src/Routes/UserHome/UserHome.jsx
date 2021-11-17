import { useEffect, useState } from "react";
import { getUserData } from "../../Services/Helper";
import { getAllPosts } from "../../Services/Post.services";
import Post from "../../Components/Post/Post";
import styles from './UserHome.module.css';
const UserHome = () => {
    const {username, token, role} = getUserData();
    const [page, setPage] = useState(0);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const getPost = async () =>{
            const response = await getAllPosts(token,page);
            setPosts(response.data);
        };
        
        getPost();
    },[token,page]);
    return(
        <section className = {styles.post_wrapper}>
        <h1>Bienvenido {username}</h1>
        {
            posts.map( post => {
                return (<Post data = {post}/>)
            })
        }
        </section>
    );
};

export default UserHome;