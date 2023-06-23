"use client"
import UsePrice from "@/hooks/usePrice";
import { Button, ButtonGroup } from "@mui/material";

interface props {
    productPrice: number,
    quantity: number,
    setQuantity: (data: number) => void,
}

export default function QuantityContainer({productPrice, quantity, setQuantity}: props) {
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
            <p className="font-medium text-sm">Quantidade: <span className="font-bold">{ UsePrice(productPrice * quantity) }</span></p>
            <ButtonGroup variant="outlined" className="w-32 h-10" >
                    <Button className="border-gray-300 text-black" onClick={() => handleClick(quantity - 1)} disabled={quantity <= 1 ? true : false}>-</Button>
                    <Button className="p-0 border-gray-300 text-black">
                        <input className="w-full h-full border-none focus:outline-none text-center"
                            type="number" min="1" name="quantity" value={quantity} onChange={handleChange} onBlur={handleBlur} />
                    </Button>
                    <Button className="border-gray-300 text-black" onClick={() => handleClick(quantity + 1)}>+</Button>
                </ButtonGroup>
        </div>
    )
}