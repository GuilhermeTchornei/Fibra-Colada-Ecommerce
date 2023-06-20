"use client"
import { Button } from "@mui/material";
import Image from "next/image";
import cinza from '@/Stamp/cinza.jpg';

interface props {
    selectedStamp: string,
    setSelectedStamp: (stamp: string) => void,
    stamps: { name: string, image: string }[],
    possiblesStamps: string[],
}

export default function StampContainer({ possiblesStamps, selectedStamp, setSelectedStamp, stamps }: props) {
    return (
        <div className="flex flex-col">
            <p className="font-medium text-sm">Escolha a estampa:</p>
            <div className="flex flex-wrap gap-2 my-1">
                {
                    stamps.map((s, i) => {
                        return (
                            <Button key={i} variant="outlined" disabled={!possiblesStamps.includes(s.name)}
                                className={`h-9 p-0 overflow-hidden shadow-sm ring-orange ring-offset-2 ${selectedStamp === s.name ? 'ring' : ''}`}
                                onClick={() => setSelectedStamp(s.name)} >
                                    <Image src={possiblesStamps.includes(s.name) ? s.image : cinza} alt="" width={100} height={100} className="w-full h-full" />
                            </Button>
                        )
                    })
                }
            </div>
        </div>
    )
}