import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import styles from "./CreatePost.module.css";
import Notification from "../../Components/Notification/Notification";
import {Create, updateAdminPost } from '../../Services/Post.services'
import { getUserData } from "../../Services/Helper";
import {hasMinChars, hasMinMaxChars, isImageUrl} from '../../Validations/strings';

const CreatePost = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {token} = getUserData();
    const { postId } = useParams();
    const [notify, setNotify] = useState(true);
    const [loadedImage, setLoadedImage] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [url, setUrl] = useState(' ');
    const [message, setMessage] = useState("");
    const errorHandler = (event) => {event.target.style.display = 'none'; setLoadedImage(false)};
    const loadHandler = (event) => {event.target.style.display = 'inline-block'; setLoadedImage(true)};
    
    const titleHandler = (event) => {
        setTitulo(event.target.value);
    };
    const descriptionHandler = (event) => {
        setDescripcion(event.target.value);
    };

    const urlHandler = (event) => {
        setUrl(event.target.value);
    };

    const titleIsValid = hasMinMaxChars(titulo, 8, 32);
    const descriptionIsValid = hasMinChars(descripcion, 8);
    const imageIsValid = isImageUrl(url) && loadedImage;

    const clean = () => {
        setTitulo('');
        setDescripcion('');
        setUrl('');
    }

    const submitHandler = async (event) =>{
        event.preventDefault();
        setNotify(false);
        
        if(!titleIsValid){
            setMessage("El título debe tener entre 8 y 32 caracteres 💻.");
            return;
        }
        else if(!descriptionIsValid){
            setMessage("La descripción debe tener mínimo 8 caracteres 📎.");
            return;
        }
        else if(!imageIsValid){
            setMessage("Debes ingresar la url de una imagen 📸.");
            return;
        }else{
            if(postId){
                await updateAdminPost(token,titulo,descripcion,url,postId);
            }
            else{
                await Create(token, titulo, descripcion, url);
            }
            navigate('/', {replace:true})
        }
        clean();

        setMessage(postId? 'Editado con éxito': 'Creado con éxito');
    };

    useEffect(() => {
        setNotify(true);
        if(postId && state){
            const {title, description, image} = state;
                setTitulo(title);
                setDescripcion(description);
                setUrl(image);
        }
        else if(postId && !state){
            navigate('/error', { replace: true, state: { error: "Post no existe." } });
        }

    }, [postId,state,navigate, notify]);

    return (
        <>
            <h1>{postId ? "Editar post" : "Crear nuevo post"}</h1>
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
            {notify && <Notification message={message}/>}

        </>
    );
};

export default CreatePost;