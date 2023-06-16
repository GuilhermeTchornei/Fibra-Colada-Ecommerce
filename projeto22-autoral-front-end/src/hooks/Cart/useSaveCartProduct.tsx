import { InsertCartProductInterface } from "@/interfaces/cart";
import ApiCart from "@/services/apiCart";
import useAsync from "../useAsync";
import UseUser from "@/contexts/UserContext";

export default function UseSaveCartProduct() {
    const { user } = UseUser();
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