import type { ReactNode } from "react";
import type { Product } from "@/lib/api";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { getProducts } from "@/lib/api";

export default async function SiteShell({
  children,
}: {
  children: ReactNode;
}) {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("বাজারদরের তথ্য লোড করা যায়নি:", error);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f1f7f2] text-[#17251c]">
      <Navbar />
      <PriceTicker products={products} />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
    </div>
  );
}