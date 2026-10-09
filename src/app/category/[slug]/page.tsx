
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import CategoryProductList from "@/components/CategoryProductList";
import { getProducts } from "@/lib/api";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  let products;

  try {
    products = await getProducts();
  } catch {
    return (
      <div className="min-h-screen bg-[#f1f7f2] text-[#17251c]">
        <Navbar />

        <main className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-xl font-bold text-red-600">
            পণ্যের তথ্য লোড করা যায়নি
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            API সার্ভারে সংযোগ হচ্ছে না। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
          </p>

          <Link
            href="/"
            className="mt-4 inline-block font-bold text-green-700 hover:text-green-800"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </main>
      </div>
    );
  }

  const categoryProducts = products.filter(
    (product) => product.category === slug
  );

  if (categoryProducts.length === 0) {
    notFound();
  }

  const firstProduct = categoryProducts[0];

  return (
    <div className="min-h-screen bg-[#f1f7f2] text-[#17251c]">
      <Navbar />

      <PriceTicker products={products} />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-5 sm:py-8 lg:px-6">
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>

          <span>/</span>

          <span className="font-semibold text-gray-800">
            {firstProduct.categoryNameBn}
          </span>
        </nav>

        <section className="mb-6 rounded-2xl border border-[#dce8df] bg-white p-5 shadow-sm sm:p-7">
          <p className="text-3xl">{firstProduct.categoryIcon}</p>

          <h1 className="mt-2 text-2xl font-black sm:text-3xl">
            {firstProduct.categoryNameBn}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            এই ক্যাটাগরিতে মোট {categoryProducts.length}টি পণ্য।
          </p>
        </section>

        <CategoryProductList products={categoryProducts} />

        <Link
          href="/"
          className="mt-8 inline-flex rounded-lg border border-[#dce8df] bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-green-50 hover:text-green-700"
        >
          ← সব পণ্যে ফিরে যান
        </Link>
      </main>

      <footer className="mt-8 border-t border-[#dce8df] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-5 lg:px-6">
          <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
          <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
        </div>
      </footer>
    </div>
  );
}
