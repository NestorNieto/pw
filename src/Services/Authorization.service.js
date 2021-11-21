import {
    SignIn,
    verifyToken,
    getUserData
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

export const isUser = async () => {
    const {
        token,
        username: storedUsername,
        role: storedRole
    } = getUserData();
    
    const {
        username,
        role
    } = await verifyToken(token);

    const identified = storedUsername === username && storedRole === role;
    if(!identified){

        const navObj = {
            route: '/error',
            options: {
                replace: true,
                state: {
                    error: "No se pudo verificar la identidad 💀.",
                    logOut: true
                }
            }
        };
        return {identified, navObj};
    }
    return {identified};
}