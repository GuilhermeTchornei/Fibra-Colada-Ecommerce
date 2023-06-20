"use client"
import Image from "next/image";

interface props {
    variations: {
        images: string[],
        stamp: string,
    }[],
    selectecStamp: string,
    setSelectecStamp: (data: string) => void,
}

export default function ImageContainer({ variations, selectecStamp, setSelectecStamp }: props) {
    const showImage = variations.find(v => v.stamp === selectecStamp)?.images[0] || variations[0].images[0];

    return (
        <div className="flex">
            <div className="h-[600px] w-[100px] overflow-hidden overflow-y-visible scrollr gap-y-1">
                {
                    variations.map((v, i) => {
                        return v.images.map((img, _i) => {
                            return (
                                <button key={`${i}${_i}`}>
                                    <Image src={img} alt="" height={100} width={100}
                                        className={`w-auto h-auto ${showImage === img ? '' : 'opacity-50'}`} />
                                </button>
                            )
                        })
                    })
                }
            </div>
            <Image src={showImage} alt="" height={600} width={600} className="" />
        </div>
    )
}