"use client"
import Image from "next/image";
import SizesContainer from "@/components/Product/SizesContainer";
import StampContainer from "@/components/Product/StampContainer";
import { Button } from "@mui/material";
import ImageContainer from "@/components/Product/ImageContainer";

export default function ProductPage({ params }: { params: { productId: number } }) {
    return (
        <div className="flex flex-col items-center py-6">
            <div className="h-[600px] flex gap-4">
                <div>
                    <ImageContainer />
                </div>
                <div className="w-[340px] flex flex-col">
                    <h1 className="text-3xl font-light mb-2">nopme dp produo n sei oq</h1>
                    <h2 className="text-3xl font-bold text-[#f27a28]">R$ 90,00</h2>
                    <div className="w-full h-[1px] bg-black opacity-20 self-center my-4" />
                    <SizesContainer />
                    <br />
                    <StampContainer />
                    <div className="w-full h-[1px] bg-black opacity-20 self-center my-4" />
                    <Button variant="contained" className="bg-orange hover:bg-[#cf6117]">
                        Comprar
                    </Button>
                </div>

            </div>

        </div>
    )
}