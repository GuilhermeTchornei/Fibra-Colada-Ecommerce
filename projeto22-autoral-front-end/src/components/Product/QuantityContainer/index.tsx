"use client"
import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";

export default function QuantutyContainer() {
    const [quantity, setQuantity] = useState<number>(0);
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value);
        setQuantity(value);
    }

    function handleBlur() {
        let value = quantity;
        if (value < 1) {
            value = 1;
            setQuantity(value);
        }
    }
    function handleClick(value: number) {
        setQuantity(value);
    }

    return (
        <div className="flex flex-col">
            <p className="font-medium text-sm">Escolha a estampa:</p>
            <ButtonGroup variant="outlined" className="w-fit h-10" >
                    <Button className="border-gray-300 text-black" onClick={() => handleClick(quantity - 1)} disabled={quantity <= 1 ? true : false}>-</Button>
                    <Button className="p-0 border-gray-300 text-black">
                        <input className="w-full h-full border-none focus:outline-none text-center"
                            type="number" min="1" name="quantity" value={quantity} onChange={handleChange} onBlur={handleBlur} />
                    </Button>
                </ButtonGroup>
        </div>
    )
}