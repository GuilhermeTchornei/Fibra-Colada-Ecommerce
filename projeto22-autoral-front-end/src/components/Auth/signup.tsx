"use client"
import { NewUser, useSignup } from "@/hooks/Auth";
import { Button, TextField, Typography } from "@mui/material";
import { AxiosError } from "axios";
import React, { useState } from "react";

export default function Signup({ setHaveAccount }: { setHaveAccount: () => void }) {
    const [newUser, setNewUser] = useState<NewUser>({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errorMessage, setErrorMessage] = useState('');


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await useSignup(newUser);
            setHaveAccount();
        } catch (error: any) {
            if (error instanceof AxiosError) {
                setErrorMessage(error.response?.data.message);
            }
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setNewUser(values => ({
            ...values,
            [name]: value,
        }))
    }

    return (
        <form onSubmit={handleSubmit} className="w-auto h-auto flex flex-col gap-y-3">
            <TextField type="text" label="Nome" name='name' value={newUser.name} onChange={handleChange} />
            <TextField type="tel" label="Telefone" name='phone' value={newUser.phone} onChange={handleChange} />
            <TextField type="email" label="Email" name='email' value={newUser.email} onChange={handleChange} />
            <TextField type="password" label="Senha" name='password' value={newUser.password} onChange={handleChange} />
            <TextField type="password" label="Confirmar senha" name='confirmPassword' value={newUser.confirmPassword} onChange={handleChange} />
            <label className="text-red-500 text-sm">{errorMessage}</label>
            <Button type="submit" variant="contained" className="bg-[#00A390] hover:bg-[#00af9b]">Entrar</Button>
            <Typography variant="subtitle1" className="flex items-center justify-center mt-4">
                Já possui conta?
                <Button variant="text" className="font-bold text-[#00A390] hover:underline" onClick={setHaveAccount}>Entrar</Button>
            </Typography>
        </form>
    );
}