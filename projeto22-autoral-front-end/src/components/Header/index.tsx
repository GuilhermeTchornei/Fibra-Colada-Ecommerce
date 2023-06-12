"use client"
import Image from "next/image";
import AlertHeader from "./AlertHeader";
import logo from '@/logo.png';
import NavBar from "./NavBar";
import IconsBar from "./IconsBar";
import AuthForm from "../Auth";
import { useAuth } from "@/contexts/AuthOverlayContext";

export default function Header() {
    const { showOverlay } = useAuth();
    return (
        <header className='h-auto flex flex-col z-10'>
            <AlertHeader />
            <div className="h-14 w-full max-w-max flex self-center items-center px-10 gap-x-16">
                <Image src={logo} className="h-2/3 w-auto" alt="" />
                <NavBar />
                <IconsBar />
            </div>
            {
                showOverlay && <AuthForm />
            }
        </header>
    )
}