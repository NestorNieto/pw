import {
    createComment,
    fetchAllPost,
    fetchOnePost,
    getOwned,
    toggleLike,
    createPost
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
        console.log(serverResponse);
        return serverResponse;
    } catch (error) {
        console.error(error);
        return {};
    }
}