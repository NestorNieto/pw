import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./CreatePost.module.css";
import Notification from "../../Components/Notification/Notification";
import {Create, updateAdminPost } from '../../Services/Post.services'
import { getUserData } from "../../Services/Helper";

const CreatePost = () => {
    const {state} = useLocation();
    const {token} = getUserData();
    const { postId } = useParams();
    const [showNotification, SetShowNotification] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [url, setUrl] = useState(' ');
    const [message, setMessage] = useState("");
    const errorHandler = (event) => event.target.style.display = 'none';
    const loadHandler = (event) => event.target.style.display='inline-block';
    const titleHandler = (event) => {
        setTitulo(event.target.value);
    };
    const descriptionHandler = (event) => {
        setDescripcion(event.target.value);
    };

    const urlHandler = (event) => {
        setUrl(event.target.value);
    };

    const submitHandler = async (event) =>{
        event.preventDefault();
        const post = postId? await updateAdminPost(token,titulo,descripcion,url,postId): await Create(token, titulo, descripcion, url);
        console.log(post);
        setTitulo('');
        setDescripcion('');
        setUrl('');
        setMessage(postId? 'Editado con éxito': 'Creado con éxito');
        SetShowNotification(true);
    };

    useEffect(() => {
        if(postId){
            const {title, description, image} = state;
            setTitulo(title);
            setDescripcion(description);
            setUrl(image);
        }
    }, [postId,state]);

    return (
        <>
            <h1>{postId ? `Editar post ${postId}` : "Crear nuevo post"}</h1>
            <form className={styles.post_form}>
                <div className= {styles.labels}>
                    <label>
                        Título
                        <input type="text" onChange={titleHandler} value={titulo} name="titulo" />
                    </label>
                    <label>
                        Descripción
                        <input type="text" onChange={descriptionHandler} value = {descripcion} name="descripcion" />
                    </label>
                    <label>
                        Imagen [URL]
                        <input type="text" onChange={urlHandler} value = {url} name="url" />
                    </label>
                </div>
                <div className={styles.image_container}> <img src={url} alt="post preview" onError={errorHandler} onLoad={loadHandler} /> </div>
                <input type="submit" value={postId? "Editar post" : "Crear post"} className={styles.button} onClick={submitHandler}/>
                
            </form>
            {showNotification && <Notification message={message}/>}

        </>
    );
};

export default CreatePost;