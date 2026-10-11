import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

import { getProducts, type Product } from "@/lib/api";

const categoryMap: Record<string, string> = {
  chal: "চাল",
  dal: "ডাল",
  sobji: "সবজি",
  mach: "মাছ",
  mangsho: "মাংস",
  "dim-dui": "ডিম",
};

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { category } = await params;
  const categoryName = categoryMap[category];

  if (!categoryName) {
    notFound();
  }

  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("পণ্যের তথ্য লোড করা যায়নি:", error);

    return (
      <div className="flex min-h-screen flex-col bg-[#f1f7f2] text-[#17251c]">
        <Navbar />

        <main className="flex flex-1 items-center justify-center px-4 py-10">
          <section className="w-full max-w-lg rounded-2xl border border-[#dce8df] bg-white p-6 text-center shadow-sm">
            <h1 className="text-xl font-black">
              পণ্যের তথ্য লোড করা যায়নি
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
            </p>

            <Link
              href="/"
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700"
            >
              হোম পেজে ফিরে যান
            </Link>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  const categoryProducts = products.filter(
    (product) => product.category === category,
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#f1f7f2] text-[#17251c]">
      <Navbar />

      <PriceTicker products={products} />

      <main className="mx-auto min-h-[60vh] w-full max-w-6xl flex-1 px-4 py-7 sm:px-5 lg:px-6">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex flex-wrap items-center gap-2 text-sm text-gray-500"
        >
          <Link href="/" className="transition hover:text-green-700">
            হোম
          </Link>

          <span aria-hidden="true">/</span>

          <span className="font-semibold text-gray-800">
            {categoryName}
          </span>
        </nav>

        <header className="mb-6">
          <h1 className="text-2xl font-black sm:text-3xl">
            {categoryName} বিভাগের বাজার দর
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {categoryName} বিভাগের পণ্যের বর্তমান দাম দেখুন।
          </p>

          <p className="mt-2 text-xs text-gray-500">
            মোট {toBengali(categoryProducts.length)}টি পণ্য
          </p>
        </header>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <section className="rounded-xl border border-[#dce8df] bg-white px-5 py-10 text-center">
            <p className="font-bold">
              এই বিভাগে কোনো পণ্য পাওয়া যায়নি।
            </p>

            <p className="mt-2 text-sm text-gray-500">
              অন্য বিভাগ দেখুন অথবা পরে আবার চেষ্টা করুন।
            </p>
          </section>
        )}

        <Link
          href="/"
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-lg border border-[#dce8df] bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-green-50 hover:text-green-700"
        >
          ← সব পণ্যে ফিরে যান
        </Link>
      </main>

      <Footer />
    </div>
  );
}

function toBengali(value: number) {
  const digits = "০১২৩৪৫৬৭৮৯";

  return String(value).replace(/[0-9]/g, (digit) => {
    return digits[Number(digit)];
  });
}