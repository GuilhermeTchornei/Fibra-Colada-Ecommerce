"use client"
import { ReactNode } from "react"
import AuthProvider from "./AuthOverlayContext"
import { ScriptProps } from "next/script"
import UserProvider from "./UserContext"


export default function Providers({ children }: ScriptProps) {
    return (
        <UserProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </UserProvider>
    )
}