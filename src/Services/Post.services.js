import { getOwned } from "./Helper";

export const getOwnedPost = async (token, page ) => {
    try {
        const limit = 5;
        const params = {
            token : token,
            limit : limit,
            page: page
        };
        const serverResponse = await getOwned(params);
        return serverResponse;// {data, pages}    
    } catch (error) {
        console.error(error);
        return {};
    }
};


