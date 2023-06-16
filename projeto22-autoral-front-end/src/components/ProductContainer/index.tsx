"use client"
import Product from "../ProductButton";

export default function ProductsContainer() {
    return (
        <div className="">
            <h1 className="text-4xl font-medium uppercase mt-6 mb-3">Fitness</h1>
            <div className="h-80 gap-3 overflow-hidden flex">
                <Product /><Product /><Product /><Product /><Product /><Product /><Product />
            </div>
        </div>
    )
}