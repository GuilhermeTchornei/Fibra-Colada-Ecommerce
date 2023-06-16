import api from "@/config/api";
import UseAuthHeader from "@/hooks/useAuthHeader";
import { CartWithProductsInterface, InsertCartProductInterface } from "@/interfaces/cart";

async function getCart(token: string) {
    const authHeader = UseAuthHeader(token);
    const response = await api.get('/cart', authHeader);
    return response.data as CartWithProductsInterface;
}

async function postCartProduct(product: InsertCartProductInterface, token: string) {
    const authHeader = UseAuthHeader(token);
    const response = await api.post('/cart', product, authHeader);
    return response.status as number;
}

const ApiCart = {
    getCart, postCartProduct
};
export default ApiCart;