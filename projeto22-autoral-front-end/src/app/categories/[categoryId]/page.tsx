"use client";
import MainBanner from "@/components/MainBanner";
import ProductsGrid from "@/components/ProductsGrid";
import SideBar from "@/components/SideBar";
import UseFilter from "@/hooks/Categories/useFilters";
import { ISendFilter } from "@/interfaces/filter";
import { useEffect, useState } from "react";

export default function Category({ params }: { params: { categoryId: string } }) {
    const mainCategoryId = parseInt(params.categoryId);
    const { filterOptions, getFilterOptions, loading, error } = UseFilter();

    const [filters, setFilters] = useState<ISendFilter>({
        categories: [],
        sizes: [],
        stamps: [],
    });

    useEffect(() => {
        const getFilters = async () => {
            await getFilterOptions(mainCategoryId);
        };
        getFilters();
    }, []);

    if (!filterOptions) return null;

    return (
        <div className="max-w-max w-full flex min-h-screen flex-col justify-start px-10 gap-6">
            <MainBanner data={mainBannerData} />
            <div className="flex gap-5">
                <SideBar filterOptions={filterOptions} filters={filters} setFilters={(data: ISendFilter) => setFilters(data)} />
                <div className="w-full h-fit flex flex-col">
                    <ProductsGrid mainCategoryId={mainCategoryId} filters={filters} />
                </div>
            </div>
        </div>
    )
}

const mainBannerData = [{
    image: '/Banner/adam-kontor-59MCbsZZVAc-unsplash.jpg',
    text: 'Fazer a vida valer a pena',
  }];