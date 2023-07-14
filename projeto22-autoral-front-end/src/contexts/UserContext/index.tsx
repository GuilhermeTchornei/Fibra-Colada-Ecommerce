"use client"
import { ScriptProps } from "next/script";
import { createContext, useContext, useEffect, useState } from "react";

export interface User {
    userName: string,
    token: string,
}

interface UserContextInterface {
    user: User | undefined,
    setUser: (user: User) => void
}

const UserContext = createContext<UserContextInterface | undefined>(undefined);

export function UserProvider({ children }: ScriptProps) {
    const [user, setUser] = useState<User>();

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default function UseUser(): UserContextInterface {
    const userContext = useContext(UserContext);

    if (!userContext) throw new Error('useUser must be used within an UserProvider');

    return userContext;
}