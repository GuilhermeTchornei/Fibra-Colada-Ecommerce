import useAsync from "../useAsync";
import apiSignup, { NewUser } from "@/services/apiSignup";

export default function UseSignUp() {
    const handler = (user: NewUser) => apiSignup.postSignUp(user);
    const {
        act: signUp,
        loading,
        error,
    } = useAsync<number>(handler, false);

    return {
        signUp, loading, error
    };
}