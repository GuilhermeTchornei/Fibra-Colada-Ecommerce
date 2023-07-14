import api from "@/config/api";
import { Login } from "./apiAuth";

export async function postSignUp(newUser: NewUser) {
    const response = await api.post('/signup', newUser);
    return response.status as number;
}

export interface NewUser extends Login {
    name: string,
    phone: string,
    confirmPassword: string,
}

const apiSignup = {
    postSignUp,
};

export default apiSignup;