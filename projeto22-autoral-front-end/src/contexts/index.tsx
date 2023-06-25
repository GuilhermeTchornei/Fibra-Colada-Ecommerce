"use client"
import AuthProvider from "./AuthOverlayContext"
import { ScriptProps } from "next/script"
import { UserProvider } from "./UserContext"
import { CartProvider } from "./CartContext"
import { ThemeProvider } from "@mui/material"
import { theme } from "./MUIThemeProvider"


export default function Providers({ children }: ScriptProps) {
    return (
        <ThemeProvider theme={theme}>
            <UserProvider>
                <AuthProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </AuthProvider>
            </UserProvider>
        </ThemeProvider>
    )
}