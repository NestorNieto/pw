import { useLocation } from "react-router-dom";

const Error = ({error}) => {
    const location = useLocation();
    const message = location?.state?.error === undefined ? error : location.state.error;
    return(
        <h1>{message}</h1>
    );
};

export default Error;