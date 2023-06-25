"use client"
import UseMainCategories from "@/hooks/Categories/useMainCategories";
import Link from "next/link";

export default function NavBar() {
    const { mainCategories, loading, error } = UseMainCategories();

    if (!mainCategories) return null;
    return (
        <ul className="w-full flex justify-evenly text-xl uppercase">
            <li>
                <Link href='/'>Home</Link>
            </li>
            {
                mainCategories.map(c => {
                    return (
                        <li key={c.categories.id}>
                            <Link href={`/categories/${c.categories.id}`}>{c.categories.name}</Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}