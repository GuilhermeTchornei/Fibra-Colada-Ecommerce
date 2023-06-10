"use client"
import { useEffect, useRef, useState } from "react";
import Signin from "./signin";
import { Typography } from "@mui/material";
import Signup from "./signup";
import { useAuth } from "@/contexts/AuthOverlayContext";

export default function AuthForm() {
    const { setShowOverlay } = useAuth();
    const [haveAccount, setHaveAccount] = useState(true);

    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
                setShowOverlay(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [setShowOverlay]);



    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex flex-col justify-center items-center">
            <div ref={overlayRef} className="mt-5 bg-white rounded-xl px-10 py-9">
                <Typography variant="h3" className="mb-4">Bem-vindo!</Typography>
                {
                    haveAccount ?
                        <Signin setHaveAccount={() => setHaveAccount(false)} /> :
                        <Signup setHaveAccount={() => setHaveAccount(true)} />
                }


            </div>
        </div>

    )
}