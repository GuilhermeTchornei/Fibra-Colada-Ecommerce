"use client"
import { Button } from "@mui/material";

export default function StampContainer() {
    return (
        <div className="flex flex-col">
            <p className="font-medium text-sm">Escolha a estampa:</p>
            <div className="flex flex-wrap gap-2 my-1">
                <Button variant="text" className="h-9 bg-green focus:ring ring-orange ring-offset-2" />
                <Button variant="text" className="h-9 bg-[url('/Stamp/estampa_zebra.jpg')] bg-auto bg-no-repeat bg-center focus:ring ring-orange ring-offset-2" />
                <Button variant="text" className="h-9 border-none bg-black focus:ring ring-orange ring-offset-2" />
            </div>
        </div>
    )
}