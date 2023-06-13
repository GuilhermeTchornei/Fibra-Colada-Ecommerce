"use client"
import { useRouter } from "next/navigation";
import React from "react";

interface Product {
    id: number,
    name: string,
    images?: string[],
    price: number,
}

export default function Product({ id, name, price }: Product) {
    const router = useRouter();

    return (
        <button onClick={() => router.push(`products/${id}`)} className="h-[300px] w-40 flex flex-col shadow-md rounded-lg py-2 bg-white cursor-pointer">
            <div className="h-52 w-full bg-center bg-cover bg-[url('/Products/328131806_479697417708635_7336395499061559791_n.jpg')]">

            </div>
            <p className="h-8 text-sm leading-4 text-black px-2 my-2 line-clamp-2">
                {name}
            </p>
            <p className="text-lg text-[#f27a28] font-bold px-2">
                R$ {(price / 100).toLocaleString('pt-br', { minimumFractionDigits: 2})}
            </p>
        </button>
    )
}