"use client"
import SizesContainer from "@/components/Product/SizesContainer";
import StampContainer from "@/components/Product/StampContainer";
import { Button } from "@mui/material";
import ImageContainer from "@/components/Product/ImageContainer";
import { useOneProduct } from "@/hooks/Products";
import { useEffect, useState } from "react";
import UseSaveCartProduct from "@/hooks/Cart/useSaveCartProduct";
import UseCartUpdate from "@/contexts/CartContext";
import UsePrice from "@/hooks/usePrice";

export default function ProductPage({ params }: { params: { productId: number } }) {
    const { product, loading, error } = useOneProduct(params.productId);
    const [variation, setVariation] = useState<{stampIndex: number, variationIndex: number}>();
    const [selectedStamp, setSelectedStamp] = useState<string>('');
    const [possiblesStamps, setPossiblesStamps] = useState<string[]>([]);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [possiblesSizes, setPossiblesSizes] = useState<string[]>([]);
    const { postProduct } = UseSaveCartProduct();
    const { setUpdateCart } = UseCartUpdate();

    useEffect(() => {
        if (!product) return;
        if (selectedStamp === '') return setPossiblesSizes(product.sizes);

        let sizes: string[] = [];
        product.productStamp.map(s => { if (s.stampName === selectedStamp) s.variations.map(v => sizes.push(v.size)) });
        setPossiblesSizes(sizes);

        if (selectedStamp && selectedSize) {
            const stampIndex = product.productStamp.findIndex(s => s.stampName === selectedStamp);
            const variationIndex = product.productStamp[stampIndex].variations.findIndex(v => v.size === selectedSize);
            setVariation({stampIndex, variationIndex});
        }
    }, [selectedStamp, product]);

    useEffect(() => {
        if (!product) return;
        if (selectedSize === '') return setPossiblesStamps(product.stamps.map(({ name }) => name));

        let stamps: string[] = [];
        product.productStamp.map(s => { if (s.variations.find(v => v.size === selectedSize)) stamps.push(s.stampName) });
        setPossiblesStamps(stamps);

        if (selectedStamp && selectedSize) {
            const stampIndex = product.productStamp.findIndex(s => s.stampName === selectedStamp);
            const variationIndex = product.productStamp[stampIndex].variations.findIndex(v => v.size === selectedSize);
            setVariation({stampIndex, variationIndex});
        }
    }, [selectedSize, product]);

    if (loading || product === undefined) return null;

    async function handleClick() {
        try {
            if (selectedStamp && selectedSize && product && variation) {
                console.log(product.productStamp[variation.stampIndex || 0].variations[variation.variationIndex]);
                const status = await postProduct({
                    products_variations_id: product.productStamp[variation.stampIndex || 0].variations[variation.variationIndex].id,
                    quantity: 1
                });
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
                    <ImageContainer variations={product.productStamp.map(s => { return ({ images: s.images, stamp: s.stampName }) })}
                        selectecStamp={selectedStamp} setSelectecStamp={(data: string) => setSelectedStamp(data)} />
                </div>
                <div className="w-[340px] flex flex-col">
                    <h1 className="text-3xl font-light mb-2">{product.name}</h1>
                    <h2 className="text-3xl font-bold text-[#f27a28]">{ UsePrice(product.productStamp[variation?.stampIndex || 0].variations[variation?.variationIndex || 0].price) }</h2>
                    <div className="w-full h-[1px] bg-gray-300 self-center my-4" />
                    <SizesContainer selectedSize={selectedSize} setSelectedSize={(size: string) => setSelectedSize(size)}
                        sizes={product.sizes} possiblesSizes={possiblesSizes} />
                    <br />
                    <StampContainer possiblesStamps={possiblesStamps} selectedStamp={selectedStamp}
                        setSelectedStamp={(stamp: string) => setSelectedStamp(stamp)} stamps={product.stamps} />
                    <div></div>
                    <div className="w-full h-[1px] bg-gray-300 self-center my-4" />
                    <Button onClick={handleClick} variant="contained" className="bg-orange hover:bg-dark-orange" disabled={variation === undefined}>
                        Comprar
                    </Button>
                </div>
            </div>
        </div>
    )
}