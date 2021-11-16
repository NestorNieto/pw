import { useState } from "react";
import { Navigate, useLocation, useNavigate} from "react-router-dom";
import { login } from "../../Services/Authorization.service";

const Login = () => {
    const location = useLocation();
    const role = localStorage.getItem('role');
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const success = await login(username, password);
        if(success === true){
            const role1 = localStorage.getItem('role');
            console.log(role1);
            if(role1 === 'admin'){
                console.log("ahuevo");
                navigate("/admin", {replace: true});
            }
            else if(role1 === "user"){
                navigate("/user", {replace: true});
            }
        }
        else{
            alert("tas mal bro");
        }
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const LoginForm = (
        <form onSubmit={handleSubmit} method="post">
            <label>
                Username
                <input type="text" onChange={handleUsernameChange} name="username" placeholder="Ingrese username o correo" />
            </label>

            <label>
                Password
                <input type="text" onChange={handlePasswordChange} name="password" placeholder="Ingrese contraseña" />
            </label>

            <input type="submit" value="Ingresar" />
        </form>
    );

    if (role === 'admin') {
        return <Navigate to="/admin" state= {{from : location}}/>
    }
    else if(role === 'user'){
        return <Navigate to="/user"/>
    }
    else return LoginForm;
};

export default Login;