import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../Services/Authorization.service";
import { getUserData } from "../../Services/Helper";
import styles from './Login.module.css'

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const success = await login(username, password);
        if(success === true){
            const { role } = getUserData();
            if(role === 'admin'){
                navigate("/admin", {replace: true});
            }
            else if(role === "user"){
                navigate("/user", {replace: true});
            }
        }
        else{
            alert("tas mal bro");// Notificacion
        }
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit} method="post" className = {styles.form}>
            <label>
                Usuario
                <input type="text" onChange={handleUsernameChange} name="username" placeholder="Ingrese username o correo"  value={username}/>
            </label>

            <label>
                Contraseña
                <input type="text" onChange={handlePasswordChange} name="password" placeholder="Ingrese contraseña" value={password} />
            </label>

            <input type="submit" value="Ingresar"  className={styles.button}/>
        </form>
    );
};

export default Login;
