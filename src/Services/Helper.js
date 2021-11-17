export const API_BASE_URL = 'https://posts-pw2021.herokuapp.com/api/v1';

export const SignIn = async (username, password) => {
    const URL = `${API_BASE_URL}/auth/signin`;
    const request = {
        "method" : "POST",
        "headers" : {
            "Content-Type" : "application/x-www-form-urlencoded"
        },
        "body" : `username=${username}&password=${password}`
    };

    const response = await fetch(URL, request);
    const result = await response.json();
    if(result.errors !== undefined || result.error !== undefined){
        throw result.errors[0] || result.error;
    }
    const data = {token: result.token, role: result.role};
    return data;
};

export const logOut = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
};

export const getOwned = async ({token, limit, page}) => {
    const URL = `${API_BASE_URL}/post/owned?limit=${limit}&page=${page}`;
    const request = {
        "method" : "GET",
        "headers" : {
            "Authorization" : `Bearer ${token}`
        }
    };

    const response = await fetch(URL, request);
    const {data, pages, error} = await response.json();

    if(error !== undefined){
        throw data.error;
    }

    return {data, pages};
};