"use client"
import { useAllProducts } from "@/hooks/Products";
import Product from "../ProductButton";
import { useEffect, useState } from "react";

export default function ProductsContainer() {
    const [products, setProducts] = useState<[{id: number, name: string, price: number}] | null>(null);

    useEffect(() => {
        const prod = async () => {
            try {
                const response = await useAllProducts();
                setProducts(response.data);
            } catch (error) {
                console.log(error)
            }
        };
        prod();
    }, [])

    return (
        <div className="">
            <h1 className="text-4xl font-medium uppercase mt-6 mb-3">Fitness</h1>
            <div className="h-80 gap-3 overflow-hidden flex">
                {
                    products ?
                        products.map(p => <Product key={p.id} id={p.id} name={p.name} price={p.price} />) :
                        null
                }
            </div>
        </div>
    )
}