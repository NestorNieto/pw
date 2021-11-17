import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./CreatePost.module.css";
import Notification from "../../Components/Notification/Notification";

const CreatePost = () => {
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

    const submitHandler = (event) =>{
        event.preventDefault();
        SetShowNotification(!showNotification);
    };
    const { postId } = useParams();
    const [showNotification, SetShowNotification] = useState(false);
    const [titulo, setTitulo] = useState();
    const [descripcion, setDescripcion] = useState();
    const [url, setUrl] = useState(' ');
    return (
        <>
            <h1>{postId ? `Editar post ${postId}` : "Crear nuevo post"}</h1>
            <form className={styles.post_form}>
                <div className= {styles.labels}>
                    <label>
                        Titulo
                        <input type="text" onChange={titleHandler} name="titulo" />
                    </label>
                    <label>
                        Descripcion
                        <input type="text" onChange={descriptionHandler} name="descripcion" />
                    </label>
                    <label>
                        Imagen [URL]
                        <input type="text" onChange={urlHandler} name="url" />
                    </label>
                </div>
                <div className={styles.image_container}> <img src={url} alt="post preview" onError={errorHandler} onLoad={loadHandler} /> </div>
                <input type="submit" value="Crear post" className={styles.button} onClick={submitHandler}/>
                
            </form>
            {showNotification && <Notification message="Probando la noti"/>}

        </>
    );
};

export default CreatePost;