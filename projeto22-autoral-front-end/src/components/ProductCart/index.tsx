"use client"
import Image from "next/image";
import { Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { Remove } from "../UI/icons";
import UsePrice from "@/hooks/usePrice";
import UseCartUpdate from "@/contexts/CartContext";
import UseSaveCartProductQuantity from "@/hooks/Cart/useSaveCartProductQuantity";
import UseDeleteCartProduct from "@/hooks/Cart/useDeleteCartProduct";

interface props {
    id: number,
    quantity: number,
    price: number,
    amount: number,
    name: string,
    size: string,
    stamp: string,
    image: string,
};

export default function ProductCart({ product }: { product: props }) {
    const { deleteProduct } = UseDeleteCartProduct();
    const { patchProduct, loading } = UseSaveCartProductQuantity();
    const { setUpdateCart } = UseCartUpdate();
    const [quantity, setQuantity] = useState<number>(product.quantity);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value);
        setQuantity(value);
    }

    function handleBlur() {
        let value = quantity;
        if (value < 1) {
            value = 1;
            setQuantity(value);
        }
        if (value !== product.quantity) updateQuantity(value);
    }

    function handleClick(value: number) {
        setQuantity(value);
        updateQuantity(value);
    }

    async function updateQuantity(value: number) {
        if (value <= 0) return;
        await patchProduct({products_variations_id: product.id, quantity: value});
        setUpdateCart(true);
    }

    async function handleDelete() {
        const status = await deleteProduct(product.id);
        setUpdateCart(true);
    }

    return (
        <div className="flex p-5 gap-x-4 shadow-sm shadow-gray-300 justify-between">
            <div className="flex w-[50%]">
                <Image src={product.image} alt="" height={100} width={100} className="w-auto h-[100px] mr-3" />
                <div className="flex flex-col justify-evenly">
                    <p className="line-clamp-2">{product.name}</p>
                    <p className="font-bold">Tamanho: <span className="font-normal">{product.size}</span></p>
                    <p className="font-bold">Estampa: <span className="font-normal">{product.stamp}</span></p>
                </div>
            </div>
            <div className="max-w-[120px] min-w-[120px] flex flex-col justify-center items-center">
                <ButtonGroup variant="outlined" className="w-fit h-10" >
                    <Button className="border-gray-300 text-black" onClick={() => handleClick(quantity - 1)} disabled={quantity <= 1 ? true : false}>-</Button>
                    <Button className="p-0 border-gray-300 text-black">
                        <input className="w-full h-full border-none focus:outline-none text-center"
                            type="number" min="1" name="quantity" value={quantity} onChange={handleChange} onBlur={handleBlur} />
                    </Button>
                    <Button className="border-gray-300 text-black" onClick={() => handleClick(quantity + 1)}>+</Button>
                </ButtonGroup>
                <Button variant="text" className="text-sm lowercase text-red-500 hover:underline"
                    startIcon={<Remove />} onClick={handleDelete} >
                    remover
                </Button>
            </div>
            <div className="max-w-[120px] min-w-[120px] flex justify-center items-center">
                <p className="font-bold">{UsePrice(product.price)}</p>
            </div>
            <div className="max-w-[120px] min-w-[120px] flex justify-center items-center">
                <p className="font-bold">{UsePrice(product.amount)}</p>
            </div>
        </div>
    )
}