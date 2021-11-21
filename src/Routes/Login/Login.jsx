import { useState } from "react";
import { Navigate, useNavigate} from "react-router-dom";
import { login } from "../../Services/Authorization.service";
import styles from './Login.module.css'

const Login = () => {
    let role = localStorage.getItem('role');
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const success = await login(username, password);
        if(success === true){
            role = localStorage.getItem('role');
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

    const LoginForm = (
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

    if (role === 'admin') {
        return <Navigate to="/admin"/>
    }
    else if(role === 'user'){
        return <Navigate to="/user"/>
    }
    else return LoginForm;
};

export default Login;