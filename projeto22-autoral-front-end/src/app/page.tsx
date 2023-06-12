import MainBanner from "../components/MainBanner";
import ProductsContainer from "../components/ProductContainer";

export default function Home() {
  return (
    <div className="max-w-max w-full flex min-h-screen flex-col justify-start px-10">
      <MainBanner />
      <ProductsContainer />
      <ProductsContainer />
      <ProductsContainer />

    </div>
  )
}
