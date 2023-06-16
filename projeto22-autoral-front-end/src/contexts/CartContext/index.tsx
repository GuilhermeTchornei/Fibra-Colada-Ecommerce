import { ScriptProps } from "next/script";
import { createContext, useContext, useState } from "react";

interface CartContextInterface {
    updateCart: boolean,
    setUpdateCart: (data: boolean) => void,
}

const CartContext = createContext<CartContextInterface>({ updateCart: true, setUpdateCart: (data: boolean) => { } });

export function CartProvider({ children }: ScriptProps) {
    const [updateCart, setUpdateCart] = useState<boolean>(true);

    return (
        <CartContext.Provider value={{ updateCart, setUpdateCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default function UseCartUpdate() {
    const cartContext = useContext(CartContext);

    if (!cartContext) throw new Error('UseCartUpdate must be used within an CartProvider');

    return cartContext;
}