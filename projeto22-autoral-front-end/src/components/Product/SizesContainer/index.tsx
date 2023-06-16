"use client"
import { Button } from "@mui/material";

interface props {
    selectedSize: string,
    setSelectedSize: (size: string) => void,
    sizes: string[],
    possiblesSizes: string[],
}

export default function SizesContainer({ selectedSize, setSelectedSize, sizes, possiblesSizes }: props) {
    return (
        <div className="flex flex-col">
            <p className="font-medium text-sm">Escolha o tamanho:</p>
            <div className="flex flex-wrap gap-2 my-1">
                {
                    sizes.map((s, i) => {
                        return (
                            <Button key={i} variant="outlined" disabled={!possiblesSizes.includes(s)}
                                className={`border-green text-green ring-orange ring-offset-2 ${selectedSize === s ? 'ring' : ''}`}
                                onClick={() => setSelectedSize(s)}>
                                {s}
                            </Button>
                        )
                    })
                }
            </div>
        </div>
    )
}