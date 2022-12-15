import { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {

    const [token, setToken] = useState(null);
    const userIsLoggedIn = !!token;

    const loginHandler = (tkn) => {
        setToken(tkn);
    }
    const logoutHandler = () => {
        setToken(null);
    } 

    const authContextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;