"use client"
import ProductCart from "@/components/ProductCart";
import UseCartUpdate from "@/contexts/CartContext";
import UseCartProducts from "@/hooks/Cart/useCartProducts";
import UsePrice from "@/hooks/usePrice";
import { Button } from "@mui/material";
import { useEffect } from "react";

export default function Cart() {
    const { setUpdateCart, updateCart } = UseCartUpdate();
    const { cart, getCart, error, loading } = UseCartProducts();

    useEffect(() => {
        if (updateCart) {
            const getCartAsync = async () => {
                await getCart();
            }
            getCartAsync();
            setUpdateCart(false);
        }
    }, [updateCart]);

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
                    {
                        loading || !cart || cart.products.length <= 0 ?
                            <p>Nenhum item no carrinho</p> :
                            cart.products.map(p => {
                                return (
                                    <ProductCart product={p} />
                                )
                            })

                    }
                </div>
            </div>
            <div className="min-w-[250px] h-fit pb-5 px-5 border border-gray-300 rounded-lg flex flex-col gap-y-3">
                <p className="text-lg font-semibold uppercase text-center mb-2">RESUMO DO PEDIDO</p>
                {
                    loading || !cart || cart.products.length <= 0 ?
                        <p>Carrinho vazio</p> :
                        <>
                            <div className="flex justify-between">
                                <p>Subtotal:</p>
                                <p className="font-bold">{UsePrice(cart.totalAmount)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Desconto:</p>
                                <p className="font-bold text-orange">R$0,00</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Total:</p>
                                <p className="font-bold text-green">{UsePrice(cart.totalAmount)}</p>
                            </div>
                            <Button variant="contained" className="bg-green hover:bg-dark-green">Concluir Pedido</Button>
                        </>
                }

            </div>
        </div>
    )
}