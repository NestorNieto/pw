import { getOwned } from "./Helper";

export const getOwnedPost = (token, page ) => {
    try {
        const limit = 5;
        const serverResponse = getOwned(token, limit, page);
        return serverResponse;    
    } catch (error) {
        console.error(error);
        return {};
    }
};


