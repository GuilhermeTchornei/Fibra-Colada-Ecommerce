"use client"
import Image from "next/image";
import image from "@/Products/325995815_747855136935675_8926260453479837050_n.jpg";


export default function ImageContainer() {
    return (
        <div className="flex">
            <div className="h-[600px] w-[100px] overflow-hidden overflow-y-visible scrollr gap-y-1">
                <button><Image src={image} alt="" height={100} /></button>
                <button><Image src={image} alt="" height={100} className="opacity-50" /></button>
                <button><Image src={image} alt="" height={100} className="opacity-50" /></button>
                <button><Image src={image} alt="" height={100} className="opacity-50" /></button>
                <button><Image src={image} alt="" height={100} className="opacity-50" /></button>
                <button><Image src={image} alt="" height={100} className="opacity-50" /></button>
                <button><Image src={image} alt="" height={100} className="opacity-50" /></button>

            </div>
            <Image src={image} alt="" height={600} />
        </div>
    )
}