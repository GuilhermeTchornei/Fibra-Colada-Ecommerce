"use client"
import { ScriptProps } from "next/script";
import { createContext, useContext, useState } from "react";

interface AuthContextInterface {
    showOverlay: boolean;
    setShowOverlay: (state: boolean) => void;
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export default function AuthProvider({ children }: ScriptProps) {
    const [showOverlay, setShowOverlay] = useState(false);

    return (
        <AuthContext.Provider value={{ showOverlay, setShowOverlay }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextInterface {
    const authContext = useContext(AuthContext);

    if (!authContext) throw new Error('useAuth must be used within an AuthProvider');

    return authContext;
}