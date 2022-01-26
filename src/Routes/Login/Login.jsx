import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../Services/Authorization.service";
import { getUserData } from "../../Services/Helper";
import { isNotEmpty } from "../../Validations/strings";
import styles from './Login.module.css'
import Notification from "../../Components/Notification/Notification";

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [notify, setNotify] = useState(true);
    const isValid = (str) => isNotEmpty(str);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setNotify(false);
        if (isValid(username) && isValid(password)) {
            const success = await login(username, password);
            if (success) {
                const { role } = getUserData();
                if (role === 'admin') {
                    navigate("/admin", { replace: true });
                }
                else if (role === "user") {
                    navigate("/user", { replace: true });
                }
            }
            else {
                setMessage("Error en login 🔑");
            }
        }
        else{
            setMessage("No dejes campos vacíos ✍");
        }

    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    useEffect(() => {
        setNotify(true);
    },[notify]);

    return (
        <form onSubmit={handleSubmit} method="post" className={styles.form}>
            <label>
                Usuario
                <input type="text" onChange={handleUsernameChange} name="username" placeholder="Ingrese username o correo" value={username} />
            </label>

            <label>
                Contraseña
                <input type="password" onChange={handlePasswordChange} name="password" placeholder="Ingrese contraseña" value={password} />
            </label>

            <input type="submit" value="Ingresar" className={styles.button} />
            {notify && <Notification message = {message}/>}
        </form>
    );


};

export default Login;
