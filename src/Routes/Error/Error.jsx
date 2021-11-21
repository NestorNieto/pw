import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Error = ({error}) => {
    useEffect(()=>{
        setTimeout(function() {
            window.location.replace('/');
        }, 3000);
    }, []);
    const location = useLocation();
    const message = location?.state?.error === undefined ? error : location.state.error;
    return(
        <h1>{message}</h1>
    );
};

export default Error;