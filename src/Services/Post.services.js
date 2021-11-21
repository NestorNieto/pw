import {
    createComment,
    fetchAllPost,
    fetchOnePost,
    getOwned,
    toggleLike,
    createPost,
    toggleActive,
    updatePost,
    API_BASE_URL
} from "./Helper";

export const getOwnedPost = async (token, page) => {
    try {
        const limit = 5;
        const serverResponse = await getOwned(token, limit, page);
        return serverResponse;
    } catch (error) {
        console.error(error);
        return {};
    }
};

export const getAllPosts = async (token, page) => {
    try {
        const limit = 5;
        const serverResponse = await fetchAllPost(token, limit, page);
        return serverResponse;
    } catch (error) {
        console.error(error);
        return {};
    }
}

export const likePost = async (token, postId) =>{
    try {
        const serverResponse = await toggleLike(token, postId);
        return serverResponse;
    } catch (error) {
        console.error(error);
        return{};
    }
}

export const getOnePost = async (token, postId) => {
    try {
        const serverResponse = await fetchOnePost(token, postId);
        return serverResponse;
    } catch (error) {
        console.error(error);
        return {};
    }
}

export const postComment = async (token, postId, message) => {
    try {
        const serverResponse = await createComment(token, postId, message);
        return serverResponse;
    } catch (error) {
        console.error(error);
        return {};
    }
};

export const Create = async (token, title, description, image) =>{
    try {
        const serverResponse = await createPost(token, title, description, image);
        return serverResponse;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const toggleActivePost = async (token, postId) => {
    try {
        const serverResponse= await toggleActive(token, postId);
        return serverResponse;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const updateAdminPost = async (token,title,description,image,postId) => {
    try {
        const serverResponse = await updatePost(token,title,description,image,postId);
        return serverResponse;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const toggleFavorite = async (token, postId) => {
    try {
        const URL = `${API_BASE_URL}/post/fav/${postId}`;
        const request = {
            "method" : "PATCH",
            "headers" : {
                "Authorization" : `Bearer ${token}`
            }
        }
        const response = await fetch(URL, request);
        if(response.ok){
            return {message: "Favorito actualizado.", error:false};
        }
        else{
            throw Error("Error al cambiar favorito");
        }
    } catch (error) {
        console.error(error);
        return {message: error, error:true};
    }
}