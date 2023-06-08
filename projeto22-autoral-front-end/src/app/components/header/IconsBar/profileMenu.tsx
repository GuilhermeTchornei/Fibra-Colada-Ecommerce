"use client"
import { useAuth } from "@/app/contexts/AuthOverlayContext";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export default function ProfileMenu({ setOpenProfile }: InferGetStaticPropsType<GetStaticProps>) {
    const { setShowOverlay } = useAuth();

    return (
        <div className="w-40 min-h-fit bg-black absolute top-8 right-[2px] mt-3 rounded-[5px]">
            <span className="
            absolute -top-[9px] right-[2px]
            border-[10px] border-solid border-transparent
            border-t-0
            border-b-black border-b-[10px]"
            ></span>
            <nav className="flex flex-col text-white text-xs p-4 gap-y-1">
                <button onClick={() => {
                    setShowOverlay(true);
                    setOpenProfile()
                }} className="text-start hover:underline" >Fazer Login/Cadastro</button>
            </nav>
        </div>
    )
}