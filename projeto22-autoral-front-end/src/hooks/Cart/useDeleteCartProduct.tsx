import ApiCart from "@/services/apiCart";
import useAsync from "../useAsync";
import UseUser from "@/contexts/UserContext";

export default function UseDeleteCartProduct() {
    const { user } = UseUser();
    const handler = user ?
        (products_variations_id: number) => ApiCart.deleteCartProduct(products_variations_id, user.token) :
        async () => null;

    const {
        act: deleteProduct,
        loading,
        error
    } = useAsync<number | null>(handler, false);

    return {
        deleteProduct
    }
}