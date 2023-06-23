import UseUser from "@/contexts/UserContext";
import { InsertCartProductInterface } from "@/interfaces/cart";
import ApiCart from "@/services/apiCart";
import useAsync from "../useAsync";

export default function UseSaveCartProductQuantity() {
    const { user } = UseUser();
    const handler = user ?
        (product: InsertCartProductInterface) => ApiCart.patchCartProductQuantity(product, user.token) :
        async () => null;

    const {
        act: patchProduct,
        loading,
        error
    } = useAsync<number | null>(handler, false);

    return {
        patchProduct,
        loading,
        error,
    }
}