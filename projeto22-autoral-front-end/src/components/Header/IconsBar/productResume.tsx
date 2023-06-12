import image from "@/Products/325995815_747855136935675_8926260453479837050_n.jpg";
import Image from "next/image";
import Link from "next/link";

export default function ProductResume() {
    return (
        <Link href={'/products/1'} className="flex gap-2 py-1 shadow-sm shadow-gray-300 ring-orange hover:bg-gray-200">
            <Image src={image} height={60} alt="" />
            <div className="flex flex-col gap-y-1">
                <p className="line-clamp-1">nome do produto n sei oq fasdfhka shkdfjh alksdfh jlk</p>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-y-1">
                        <p>
                            <span className="font-bold">Tamanho:</span> G
                        </p>
                        <p>
                            <span className="font-bold">Estampa:</span> Rosa
                        </p>
                    </div>
                    <div className="flex justify-end items-end">
                        <p className="font-bold text-sm">R$ 90,00</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}