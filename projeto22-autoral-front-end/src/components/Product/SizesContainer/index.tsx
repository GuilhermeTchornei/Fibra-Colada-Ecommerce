"use client"
import { Button } from "@mui/material";
import { useState } from "react";

export default function SizesContainer() {
    const [selectedSize, setSelectedSize] = useState<number>(-1);
    return (
        <div className="flex flex-col">
            <p className="font-medium text-sm">Escolha o tamanho:</p>
            <div className="flex flex-wrap gap-2 my-1">
                <Button id='0' variant="outlined" className={`border-green text-green ring-orange ring-offset-2 ${selectedSize === 0 ? 'ring' : ''}`} onClick={() => setSelectedSize(0)}>P</Button>
                <Button id='1' variant="outlined" className={`border-green text-green ring-orange ring-offset-2 ${selectedSize === 1 ? 'ring' : ''}`} onClick={() => setSelectedSize(1)}>M</Button>
                <Button id='2' variant="outlined" className={`border-green text-green ring-orange ring-offset-2 ${selectedSize === 2 ? 'ring' : ''}`} onClick={() => setSelectedSize(2)}>G</Button>
            </div>
        </div>
    )
}