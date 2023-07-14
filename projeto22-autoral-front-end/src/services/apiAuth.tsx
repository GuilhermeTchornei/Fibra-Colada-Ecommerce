import api from "@/config/api";
import { User } from "@/contexts/UserContext";

async function postSignIn(user: Login) {
    const response = await api.post('/signin', user);
    return response.data as User;
}

export interface Login {
    email: string,
    password: string
}

const apiAuth = {
    postSignIn,
};

export default apiAuth;