import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./CreatePost.module.css";
import Notification from "../../Components/Notification/Notification";
import {Create} from '../../Services/Post.services'
import { getUserData } from "../../Services/Helper";

const CreatePost = () => {
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
        const post = await Create(token, titulo, descripcion, url);

        setTitulo('');
        setDescripcion('');
        setUrl('');
        setMessage('creado con exito');
        SetShowNotification(true);

    };

    return (
        <>
            <h1>{postId ? `Editar post ${postId}` : "Crear nuevo post"}</h1>
            <form className={styles.post_form}>
                <div className= {styles.labels}>
                    <label>
                        Titulo
                        <input type="text" onChange={titleHandler} value={titulo} name="titulo" />
                    </label>
                    <label>
                        Descripcion
                        <input type="text" onChange={descriptionHandler} value = {descripcion} name="descripcion" />
                    </label>
                    <label>
                        Imagen [URL]
                        <input type="text" onChange={urlHandler} value = {url} name="url" />
                    </label>
                </div>
                <div className={styles.image_container}> <img src={url} alt="post preview" onError={errorHandler} onLoad={loadHandler} /> </div>
                <input type="submit" value="Crear post" className={styles.button} onClick={submitHandler}/>
                
            </form>
            {showNotification && <Notification message={message}/>}

        </>
    );
};

export default CreatePost;