"use client"
import ProductCart from "@/components/ProductCart";
import { Button } from "@mui/material";

export default function Cart() {
    return (
        <div className="max-w-max w-full flex min-h-screen justify-between px-10 gap-8 mt-8">
            <div className="w-full px-5">
                <div className="text-base flex justify-between px-5 gap-3 border border-gray-300">
                    <p className="w-[50%]">ITENS</p>
                    <p className="max-w-[120px] min-w-[120px] text-center">QUANTIDADE</p>
                    <p className="max-w-[120px] min-w-[120px] text-center">UNITÁRIO</p>
                    <p className="max-w-[120px] min-w-[120px] text-center">TOTAL</p>
                </div>
                <div>
                    <ProductCart />
                    <ProductCart />
                    <ProductCart />
                    <ProductCart />
                    <ProductCart />
                </div>
            </div>
            <div className="min-w-[250px] h-fit pb-5 px-5 border border-gray-300 rounded-lg flex flex-col gap-y-3">
                <p className="text-lg font-semibold uppercase text-center mb-2">RESUMO DO PEDIDO</p>
                <div className="flex justify-between">
                    <p>Subtotal:</p>
                    <p className="font-bold">R$90,00</p>
                </div>
                <div className="flex justify-between">
                    <p>Desconto:</p>
                    <p className="font-bold text-orange">R$0,00</p>
                </div>
                <div className="flex justify-between">
                    <p>Total:</p>
                    <p className="font-bold text-green">R$90,00</p>
                </div>
                <Button variant="contained" className="bg-green hover:bg-dark-green">Concluir Pedido</Button>
            </div>
        </div>
    )
}