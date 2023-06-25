"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Product {
    id: number,
    name: string,
    image: string,
    price: number,
}

export default function Product({ id, name, price, image }: Product) {
    const router = useRouter();

    return (
        <button onClick={() => router.push(`products/${id}`)} className="h-[300px] w-40 flex flex-col shadow-md rounded-lg py-2 bg-white cursor-pointer">
            <div className="h-52 w-full">
                <Image src={image} alt="" width={100} height={100} className="h-52 w-auto object-cover" />
            </div>
            <p className="h-8 text-start text-sm leading-4 text-black px-2 my-2 line-clamp-2">
                {name}
            </p>
            <p className="text-lg text-[#f27a28] font-bold px-2">
                R$ {(price).toLocaleString('pt-br', { minimumFractionDigits: 2})}
            </p>
        </button>
    )
}