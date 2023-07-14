"use client"
import IProductContainer from "@/interfaces/productContainer";
import Product from "../ProductButton";

interface props {
    tittle: string,
    products: IProductContainer[],
    lines: number
}

export default function ProductsContainer({ tittle, products, lines }: props) {
    return (
        <div className="">
            <h1 className="text-4xl font-medium uppercase">{tittle}</h1>
            <div className="h-80 gap-3 overflow-hidden flex flex-wrap">
                {
                    products ?
                        products.map(p => <Product key={p.id} id={p.id} name={p.name} price={p.price} image={p.image} />) :
                        null
                }
            </div>
        </div>
    )
}