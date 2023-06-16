import { useUser } from "@/contexts/UserContext";
import { InsertCartProductInterface } from "@/interfaces/cart";
import ApiCart from "@/services/apiCart";
import useAsync from "../useAsync";

export default function UseSaveCartProduct() {
    const { user } = useUser();
    const handler = user ?
        (product: InsertCartProductInterface) => ApiCart.postCartProduct(product, user.token) :
        async () => null;

    const {
        act: postProduct,
        loading,
        error
    } = useAsync<number | null>(handler, false);

    return {
        postProduct
    }
}