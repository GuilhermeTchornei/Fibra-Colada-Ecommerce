"use client"
import { Button } from "@mui/material";

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
                            <Button key={i} variant="text" disabled={!possiblesStamps.includes(s.name)}
                                className={`h-9 bg-${s.image} ring-orange ring-offset-2 ${selectedStamp === s.name ? 'ring' : ''}`}
                                onClick={() => setSelectedStamp(s.name)} />
                        )
                    })
                }
            </div>
        </div>
    )
}