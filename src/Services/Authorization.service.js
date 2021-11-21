import {
    API_BASE_URL,
    SignIn
} from "./Helper";
export const login = async (username, password) => {
    try {
        const {
            token,
            role
        } = await SignIn(username, password);

        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const logOut = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
};

export const verifyToken = async (token) => {
    try {
        const URL = `${API_BASE_URL}/auth/whoami`;
        const request = {
            "method": "GET",
            "headers": {
                "Authorization": `Bearer ${token}`
            }
        }
        const response = await fetch (URL, request);
        if(response.ok){
            const {username, role} = response.json();
            return{username: username, role: role};
        }
        else{
            throw Error("El token no ha sido verificado.");
        }
        
    } catch (error) {
        console.error(error);
        return {}
    }
}