import { createContext } from "react";
import { useContext } from "react";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    return(
        <AuthContext.Provider value={{ email: 'igor@email.com' }}>
        {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);
    
    return context;
}

export { AuthProvider, useAuth };