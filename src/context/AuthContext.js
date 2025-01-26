import { createContext, useContext, useEffect, useState } from "react";

// Create an AuthContext, used to share authentication data
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ 
        user: "", 
        token: ""
    });

    // load authentication data from localStorage
    useEffect(() => {
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth) {
            setAuth(JSON.parse(storedAuth));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider }