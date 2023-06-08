"use client"
import { ScriptProps } from "next/script";
import { createContext, useContext, useState } from "react";

interface User {
    userName: string,
    token: string,
}

interface UserContextInterface {
    user: User | undefined,
    setUser: (user: User) => void
}

const UserContext = createContext<UserContextInterface | undefined>(undefined);

export default function UserProvider({ children }: ScriptProps) {
    const [user, setUser] = useState<User | undefined>(undefined);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser(): UserContextInterface {
    const userContext = useContext(UserContext);

    if (!userContext) throw new Error('useUser must be used within an UserProvider');

    return userContext;
}