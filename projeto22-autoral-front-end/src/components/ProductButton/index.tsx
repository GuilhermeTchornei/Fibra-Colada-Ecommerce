"use client"
import React from "react";

interface Product {
    id: number,
    name: string,
    images: string[],
    price: number,
}

export default function Product(/*{id, name, images, price}: Product */) {
    return (
        <button className="h-[300px] w-40 flex flex-col shadow-md rounded-lg py-2 bg-white cursor-pointer">
            <div className="h-52 w-full bg-center bg-cover bg-[url('/Products/328131806_479697417708635_7336395499061559791_n.jpg')]">

            </div>
            <p className="h-8 text-sm leading-4 text-black px-2 my-2 line-clamp-2">
                Legging preta nao sei oq hasdhlkaf laksjhdf a shfkldh saldk
            </p>
            <p className="text-lg text-[#f27a28] font-bold px-2">
                R$ 50,00
            </p>
        </button>
    )
}