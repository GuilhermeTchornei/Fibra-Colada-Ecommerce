"use client"
import SizesContainer from "@/components/Product/SizesContainer";
import StampContainer from "@/components/Product/StampContainer";
import { Button } from "@mui/material";
import ImageContainer from "@/components/Product/ImageContainer";
import { useOneProduct } from "@/hooks/Products";
import { useEffect, useState } from "react";
import UseSaveCartProduct from "@/hooks/Cart/useSaveCartProduct";
import UseCartUpdate from "@/contexts/CartContext";

export default function ProductPage({ params }: { params: { productId: number } }) {
    const { product, loading, error } = useOneProduct(params.productId);
    const [variation, setVariation] = useState<number>(-1);
    const [selectecStamp, setSelectedStamp] = useState<string>('');
    const [possiblesStamps, setPossiblesStamps] = useState<string[]>([]);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [possiblesSizes, setPossiblesSizes] = useState<string[]>([]);
    const { postProduct } = UseSaveCartProduct();
    const { setUpdateCart } = UseCartUpdate();

    useEffect(() => {
        if (!product) return;
        if (selectecStamp === '') return setPossiblesSizes(product.sizes);
        let sizes: string[] = [];
        product.variations.map(v => { if (v.stampName === selectecStamp) sizes.push(v.size) });
        setPossiblesSizes(sizes);
    }, [selectecStamp, variation]);

    useEffect(() => {
        if (!product) return;
        if (selectedSize === '') return setPossiblesStamps(product.stamps.map(({ name }) => name));
        let stamps: string[] = [];
        product.variations.map(v => { if (v.size === selectedSize) stamps.push(v.stampName) });
        setPossiblesStamps(stamps);
    }, [selectedSize, variation]);

    if (loading || product === undefined) return null;
    if (variation < 0) {
        setVariation(0);
        return null;
    }

    async function handleClick() {
        try {
            if (selectecStamp && selectedSize && product) {
                const status = await postProduct({ product_variation_id: product.variations[0].id });
                setUpdateCart(true);
            }
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className="flex flex-col items-center py-6">
            <div className="h-[600px] flex gap-4">
                <div>
                    <ImageContainer />
                </div>
                <div className="w-[340px] flex flex-col">
                    <h1 className="text-3xl font-light mb-2">{product.name}</h1>
                    <h2 className="text-3xl font-bold text-[#f27a28]">R$ {product.variations[variation].price.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h2>
                    <div className="w-full h-[1px] bg-gray-300 self-center my-4" />
                    <SizesContainer selectedSize={selectedSize} setSelectedSize={(size: string) => setSelectedSize(size)}
                        sizes={product.sizes} possiblesSizes={possiblesSizes} />
                    <br />
                    <StampContainer possiblesStamps={possiblesStamps} selectedStamp={selectecStamp}
                        setSelectedStamp={(stamp: string) => setSelectedStamp(stamp)} stamps={product.stamps} />
                    <div className="w-full h-[1px] bg-gray-300 self-center my-4" />
                    <Button onClick={handleClick} variant="contained" className="bg-orange hover:bg-dark-orange">
                        Comprar
                    </Button>
                </div>

            </div>

        </div>
    )
}