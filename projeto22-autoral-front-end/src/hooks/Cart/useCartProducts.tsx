import { CartWithProductsInterface } from "@/interfaces/cart";
import ApiCart from "@/services/apiCart";
import useAsync from "../useAsync";
import UseUser from "@/contexts/UserContext";

export default function UseCartProducts() {
    const { user } = UseUser();
    const handler = user ? () => ApiCart.getCart(user.token) : async () => null;
    const {
        data: cart,
        act: getCart,
        loading,
        error,
    } = useAsync<CartWithProductsInterface | null>(handler);

    return {
        cart, getCart, loading, error
    };
}