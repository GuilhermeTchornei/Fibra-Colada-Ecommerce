"use client"
import { IGetFilter, ISendFilter } from "@/interfaces/filter";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

interface props {
    filterOptions: IGetFilter,
    filters: ISendFilter,
    setFilters: (data: ISendFilter) => void,
};

export default function SideBar({ filterOptions, filters, setFilters }: props) {
    function handleCategoryChange(categoryId: number) {
        if (filters.categories.includes(categoryId))
            setFilters({ ...filters, categories: filters.categories.filter(c => c !== categoryId) });
        else setFilters({ ...filters, categories: [...filters.categories, categoryId] });
    }

    function handleStampsChange(stampId: number) {
        if (filters.stamps.includes(stampId))
            setFilters({ ...filters, stamps: filters.stamps.filter(c => c !== stampId) });
        else setFilters({ ...filters, stamps: [...filters.stamps, stampId] });
    }

    function handleSizesChange(sizeId: number) {
        if (filters.sizes.includes(sizeId))
            setFilters({ ...filters, sizes: filters.sizes.filter(c => c !== sizeId) });
        else setFilters({ ...filters, sizes: [...filters.sizes, sizeId] });
    }

    return (
        <FormGroup className="w-60 h-fit p-3 flex border border-gray-500 rounded-lg">
            <p className="text-lg font-medium text-center">Filtros</p>
            <p className="font-medium">Categorias:</p>
            {
                filterOptions.categories.map((c) => {
                    return (
                        <FormControlLabel key={c.id} onChange={() => handleCategoryChange(c.id)} control={<Checkbox color="secondary" />} label={c.name} className="pl-4" />
                    )
                })
            }
            <p className="font-medium mt-5">Estampas:</p>
            {
                filterOptions.stamps.map(s => {
                    return (
                        <FormControlLabel key={s.id} onChange={() => handleStampsChange(s.id)} control={<Checkbox color="secondary" />} label={s.name} className="pl-4" />
                    )
                })
            }
            <p className="font-medium mt-5">Tamanhos:</p>
            {
                filterOptions.sizes.map(s => {
                    return (
                        <FormControlLabel key={s.id} onChange={() => handleSizesChange(s.id)} control={<Checkbox color="secondary" />} label={s.size} className="pl-4" />
                    )
                })
            }
        </FormGroup>
    )
}