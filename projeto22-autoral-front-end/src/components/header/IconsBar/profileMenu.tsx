"use client"
import { useAuth } from "@/contexts/AuthOverlayContext";
import { useUser } from "@/contexts/UserContext";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export default function ProfileMenu({ setOpenProfile }: InferGetStaticPropsType<GetStaticProps>) {
    const { setShowOverlay } = useAuth();
    const { user } = useUser();


    return (
        <div onMouseOver={() => setOpenProfile(true)} onMouseOut={() => setOpenProfile(false)}
            className="w-40 min-h-fit bg-black absolute top-6 right-[2px] mt-3 rounded-[5px] z-10">
            <span className="
            absolute -top-[9px] right-[2px]
            border-[10px] border-solid border-transparent
            border-t-0
            border-b-black border-b-[10px]"
            ></span>
            <nav className="flex flex-col text-white text-xs p-4 gap-y-1">

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
    )
}