import { getUserData } from "../../Services/Helper";
import { Navigate } from "react-router-dom";
import Login from "../Login/Login"

const Home = () => {
    const {role} = getUserData();

    if (role === 'admin') {
        return <Navigate to="/admin"/>
    }
    else if(role === 'user'){
        return <Navigate to="/user"/>
    }
    else return <Login/>;
}

export default Home;