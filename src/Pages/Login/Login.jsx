const Login = () => {
    return(
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
};

export default Login;