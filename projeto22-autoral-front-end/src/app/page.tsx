"use client"
import useNewProducts from "@/hooks/Products/useNewProducts";
import MainBanner from "../components/MainBanner";
import ProductsContainer from "../components/ProductContainer";

export default function Home() {
  const { products, error, loading } = useNewProducts();
  if (!products) return null;
  return (
    <div className="max-w-max w-full flex min-h-screen flex-col justify-start px-10 gap-6">
      <div className="w-full h-[500px] max-h-[50%]">
        <MainBanner data={mainBannerData} />
      </div>
      <ProductsContainer products={products} tittle="Novidades" lines={2} />
    </div>
  )
}

const mainBannerData = [{
  image: '/Banner/adam-kontor-59MCbsZZVAc-unsplash.jpg',
  text: 'Fazer a vida valer a pena',
}];