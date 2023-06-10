"use client"
import { Button } from "@mui/material";

export default function SizesContainer() {
    return (
        <div className="flex flex-col">
            <p className="font-medium text-sm">Escolha o tamanho:</p>
            <div className="flex flex-wrap gap-2 my-1">
                <Button variant="outlined" className="border-green">P</Button>
                <Button variant="outlined" className="border-green">M</Button>
                <Button variant="outlined" className="border-green">G</Button>
            </div>
        </div>
    )
}