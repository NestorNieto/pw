import { SignIn } from "./Helper";
export const login = async (username, password) => {
    try {
        const {token, role} = await SignIn(username, password);
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};