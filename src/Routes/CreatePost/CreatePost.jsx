import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./CreatePost.module.css";

const CreatePost = () => {
    const titleHandler = (event) => {
        setTitulo(event.target.value);
    };
    const descriptionHandler = (event) => {
        setDescripcion(event.target.value);
    };

    const urlHandler = (event) => {
        setUrl(event.target.value);
    };

    const { postId } = useParams();
    const [titulo, setTitulo] = useState();
    const [descripcion, setDescripcion] = useState();
    const [url, setUrl] = useState(' ');
    return (
        <>
            <h1>Ruta de CreatePost {postId}</h1>
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
                <div className={styles.image_container}> <img src={url} alt="post preview" onError={(event) => event.target.style.display = 'none'} /> </div>
                <input type="submit" value="Crear post" className={styles.button}/>
                
            </form>


        </>
    );
};

export default CreatePost;