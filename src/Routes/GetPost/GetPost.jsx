import { useParams } from "react-router-dom";
const GetPost = () => {
    const params = useParams();
    const { postId } = params;
    return(
        <h1>Ruta de GetPost {postId}</h1>
    );
};

export default GetPost;