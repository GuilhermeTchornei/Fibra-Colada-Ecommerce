"use client"
import { Grid } from "@mui/material";
import Product from "../ProductButton";
import UseCategories from "@/hooks/Categories/useCategories";
import { useEffect } from "react";
import { ISendFilter } from "@/interfaces/filter";

interface props {
    mainCategoryId: number,
    filters: ISendFilter,
}

export default function ProductsGrid({ mainCategoryId, filters }: props) {
    const { products, getProducts, loading, error } = UseCategories();

    useEffect(() => {
        const _getProducts = async () => {
            const prod = await getProducts(mainCategoryId, filters);
        };

        _getProducts();
    }, [filters]);

    if (!products) return null;

    return (
        <Grid container item spacing={2}>
            {
                products.map(p => {
                    return (
                        <Grid item key={p.productStampId}>
                            <Product id={p.id} name={p.name} price={p.variations[0].price} image={p.images[0]} />
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}