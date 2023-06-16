"use client"
import AuthProvider from "./AuthOverlayContext"
import { ScriptProps } from "next/script"
import { UserProvider } from "./UserContext"
import { CartProvider } from "./CartContext"


export default function Providers({ children }: ScriptProps) {
    return (
        <UserProvider>
            <AuthProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </AuthProvider>
        </UserProvider>
    )
}