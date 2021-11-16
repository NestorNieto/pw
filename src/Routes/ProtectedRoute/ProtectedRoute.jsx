import { Outlet , Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({role}) => {
    const location = useLocation();
    const storedRole = localStorage.getItem('role');

    if(storedRole === role){
        return <Outlet/>
    }
    else if(storedRole === undefined){
        return <Navigate to="/" state= {{from : location}}/>
    }
    else{
        return <Navigate to = "/error"  state = {{from : location, error: "Unauthorized page."}}/>
    }
};

export default ProtectedRoute;