import {
    fetchAllPost,
    getOwned
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