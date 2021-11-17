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

export const getOwned = async (token, limit, page) => {
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
        throw error;
    }

    return {data, pages};
};

export const fetchAllPost = async (token, limit, page) => {
    const URL = `${API_BASE_URL}/post/all?limit=${limit}&page=${page}`;
    const request = {
        "method" : "GET",
        "headers" : {
            "Authorization" : `Bearer ${token}`
        }
    };

    const response = await fetch(URL, request);
    const {data, pages} = await response.json();
    return {data, pages};
};

export const fetchOnePost = async(token, postId) => {
    const URL = `${API_BASE_URL}/post/one/${postId}}`;
    const request = {
        "method" : "GET",
        "headers" :{
            "Authorization" : `Bearer ${token}`
        }
    };

    const response = await fetch(URL, request);
    const post = await response.json();
    if(response.ok){
        return post;
    }
    else{
        throw new Error("Post Not Found");
    }
};

export const getUserData = () =>{
    const token =localStorage.getItem('token');
    const role =  localStorage.getItem('role');
    const username = localStorage.getItem('username')
    
    return {token, role, username};
}

export const toggleLike = async (token, postId) => {
    const URL = `${API_BASE_URL}/post/like/${postId}`;
    const request = {
        "method" : "PATCH",
        "headers" : {
            "Authorization" : `Bearer ${token}` 
        }
    };

    const response = await fetch(URL, request);
    const {message} = await response.json();
    
    if(response.ok){
        return {message};
    }else{
        throw new Error("Post Not Found");
    }
};