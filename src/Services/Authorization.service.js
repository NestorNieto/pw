import { SignIn } from "./Helper";
export const login = async (username, password) => {
    try {
        const {token, role} = await SignIn(username, password);
        
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