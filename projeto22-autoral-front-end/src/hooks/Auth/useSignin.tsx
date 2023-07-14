import { CartWithProductsInterface } from "@/interfaces/cart";
import ApiCart from "@/services/apiCart";
import useAsync from "../useAsync";
import apiAuth, { Login } from "@/services/apiAuth";
import { User } from "@/contexts/UserContext";

export default function UseSignIn() {
    const handler = (user: Login) => apiAuth.postSignIn(user);
    const {
        act: signIn,
        loading,
        error,
    } = useAsync<User>(handler, false);

    return {
        signIn, loading, error
    };
}