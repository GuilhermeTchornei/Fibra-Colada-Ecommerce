"use client"
import {Login, useSignin} from "@/app/Hooks/Auth";
import { useAuth } from "@/app/contexts/AuthOverlayContext";
import { Button, TextField, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";

export default function Signin({ setHaveAccount }: { setHaveAccount: () => void }) {
    const { setShowOverlay } = useAuth();
    const [login, setLogin] = useState<Login>({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await useSignin(login);
            setShowOverlay(false);
            console.log(response);
        } catch (error: any) {
            if (error instanceof AxiosError) {
                setErrorMessage(error.response?.data.message);
            }
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setLogin(values => ({
            ...values,
            [name]: value,
        }))
    }


    return (
        <form onSubmit={handleSubmit} className="w-auto h-auto flex flex-col gap-y-3">
            <TextField type="email" name='email' label="Email" value={login.email} onChange={handleChange} />
            <TextField type="password" name='password' label="Senha" value={login.password} onChange={handleChange} />
            <label className="text-red-500 text-sm">{errorMessage}</label>
            <Button type="submit" variant="contained" className="bg-[#00A390] hover:bg-[#00af9b]">Entrar</Button>
            <Typography variant="subtitle1" className="flex items-center justify-center mt-4">
                Não tem conta?
                <Button variant="text" className="font-bold text-[#00A390] hover:underline" onClick={setHaveAccount}>Cadastre-se</Button>
            </Typography>
        </form>
    );
}