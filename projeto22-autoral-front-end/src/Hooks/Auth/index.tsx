import api from "@/config/api";

export async function useSignin(user: Login) {
    const response = api.post('/signin', user);
    return response;
}

export interface Login {
    email: string,
    password: string
}

export async function useSignup(newUser: NewUser) {
    const response = api.post('/signup', newUser);
    return response;
}

export interface NewUser extends Login{
    name: string,
    phone: string,
    confirmPassword: string,
}