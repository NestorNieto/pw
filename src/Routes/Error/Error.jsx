import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logOut } from "../../Services/Authorization.service";

const Error = ({error}) => {
    const {state} = useLocation();
    
    useEffect(()=>{
        setTimeout(function() {
            window.location.replace('/');
            if(state.logOut){
                logOut();
            }
        }, 2500);
    }, [state.logOut]);
    
    const message = state?.error === undefined ? error : state.error;
    return(
        <h1>{message}</h1>
    );
};

export default Error;