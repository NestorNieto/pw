import { useEffect } from "react";
import { Outlet , Navigate, useLocation, useNavigate } from "react-router-dom";
import { isUser } from "../../Services/Authorization.service";
import { getUserData } from "../../Services/Helper";

const ProtectedRoute = ({role}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const {role : storedRole} = getUserData();

    useEffect(() =>{
        const authorized = async () => {
            const { identified, navObj } = await isUser();
            if (!identified) {
                navigate(navObj.route, navObj.options);
            }
        };
        authorized();
    })

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