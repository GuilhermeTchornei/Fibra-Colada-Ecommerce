"use client"
import ProductResume from "./productResume";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { CartWithProductsInterface } from "@/interfaces/cart";
import UsePrice from "@/hooks/usePrice";

interface props {
    setOpenCart: (data: boolean) => void,
    cart: CartWithProductsInterface | null | undefined,
    loading: boolean,
};

export default function CartResume({ setOpenCart, cart, loading }: props) {
    const router = useRouter();


    function handleClick() {
        router.push('/cart');
    }

    return (
        <>
            <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center pointer-events-none
                            bg-black bg-opacity-20 z-10 opacity-100 animate-fade-in"></div>
            <div onMouseOver={() => setOpenCart(true)} onMouseOut={() => setOpenCart(false)}
                className="w-72 min-h-fit bg-white absolute top-5 right-[2px] mt-3 rounded-[5px] z-30 border-t-2 border-orange">
                <div className="w-full h-2 absolute before:absolute -top-[8px] before:right-[3px]
                                before:border-[8px] before:border-solid before:border-transparent
                                before:border-t-0
                                before:border-b-orange before:border-b-[6px]}"
                ></div>
                <div className="flex flex-col text-black text-xs p-4 gap-y-2">
                    {
                        loading || !cart || cart.products.length <= 0 ?
                            <p>Nenhum item no carrinho</p> :
                            <>
                                {

                                    cart.products.map(p => {
                                        return (
                                            <ProductResume key={p.id} product={p} />
                                        )
                                    })
                                }
                                <p className="font-bold text-lg flex justify-between items-center"><span>Valor total:</span>{UsePrice(cart.totalAmount)}</p>
                                <Button onClick={handleClick} variant="contained" className="bg-orange hover:bg-dark-orange">Finalizar Compra</Button>
                            </>
                    }
                </div>
            </div>
        </>

    )
}