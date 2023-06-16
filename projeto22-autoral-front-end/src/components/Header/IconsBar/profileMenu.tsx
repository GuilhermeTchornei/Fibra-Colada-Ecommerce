"use client"
import { useAuth } from "@/contexts/AuthOverlayContext";
import UseUser from "@/contexts/UserContext";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export default function ProfileMenu({ setOpenProfile }: InferGetStaticPropsType<GetStaticProps>) {
    const { setShowOverlay } = useAuth();
    const { user } = UseUser();


    return (
        <>
            <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center pointer-events-none
                            bg-black bg-opacity-20 z-10 opacity-100 animate-fade-in"></div>
            <div onMouseOver={() => setOpenProfile(true)} onMouseOut={() => setOpenProfile(false)}
                className="w-40 min-h-fit bg-white absolute top-5 right-[3px] mt-3 rounded-[5px] z-10 border-t-2 border-orange">
                <div className="w-full h-2 absolute before:absolute -top-[8px] before:right-[3px]
                            before:border-[8px] before:border-solid before:border-transparent
                            before:border-t-0
                            before:border-b-orange before:border-b-[6px]}"
                ></div>
                <nav className="flex flex-col text-black text-xs p-4 gap-y-1">

                    {
                        user ?
                            <>
                                <button onClick={() => {
                                }} className="text-start hover:underline" >
                                    Meu Perfil
                                </button>
                                <button onClick={() => {
                                }} className="text-start hover:underline" >
                                    Meus Pedidos
                                </button>
                            </>

                            :
                            <button onClick={() => {
                                setShowOverlay(true);
                                setOpenProfile();
                            }} className="text-start hover:underline" >
                                Fazer Login/Cadastro
                            </button>
                    }

                </nav>
            </div>
        </>

    )
}