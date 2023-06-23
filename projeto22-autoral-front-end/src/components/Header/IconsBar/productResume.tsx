import UsePrice from "@/hooks/usePrice";
import Image from "next/image";
import Link from "next/link";

interface props {
    id: number,
    quantity: number,
    price: number,
    amount: number,
    name: string,
    size: string,
    stamp: string,
    image: string,
};

export default function ProductResume({ product }: { product: props }) {
    return (
        <Link href={'/products/1'} className="flex gap-2 py-1 shadow-sm shadow-gray-300 ring-orange hover:bg-gray-200">
            <div className="min-w-fit min-h-full overflow-hidden flex justify-center">
                <Image src={product.image} height={60} width={40} alt="" className="w-auto object-contain" />
            </div>
            <div className="w-full flex flex-col gap-y">
                <p className="line-clamp-1">{product.name}</p>
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <p>
                            <span className="font-bold">Tamanho:</span> {product.size}
                        </p>
                        <p>
                            <span className="font-bold">Estampa:</span> {product.stamp}
                        </p>
                        <p>
                            <span className="font-bold">Quantidade:</span> {product.quantity}
                        </p>
                    </div>
                    <div className="flex justify-end items-end">
                        <p className="font-bold text-sm text-end">{UsePrice(product.amount)}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}