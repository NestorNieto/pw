import { Navigate, useLocation } from "react-router-dom";

const Login = () => {
    //localStorage.setItem('role', 'admin');
    const role = localStorage.getItem('role');
    const location = useLocation();

    const LoginForm = (
        <form action="#" method="post">
            <label>
                Username
                <input type="text" name="username" placeholder="Ingrese username o correo" />
            </label>

            <label>
                Password
                <input type="text" name="password" placeholder="Ingrese contraseña" />
            </label>
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