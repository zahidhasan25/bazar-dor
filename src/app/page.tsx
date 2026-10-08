import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();

  const risingProducts = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallingProducts = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-[#f1f7f2] text-[#17251c]">
      <Navbar />

      <PriceTicker products={products} />

      <main>
        <Hero />

        {/* Rising Products */}
        <section className="mx-auto max-w-6xl px-4 py-7 sm:px-5 lg:px-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm font-black text-red-500">
              ▲
            </span>

            <h2 className="text-lg font-extrabold sm:text-xl">
              আজ দাম বেড়েছে
            </h2>
          </div>

          {risingProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {risingProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <EmptyProducts message="আজ কোনো পণ্যের দাম বাড়েনি।" />
          )}
        </section>

        {/* Falling Products */}
        <section className="mx-auto max-w-6xl px-4 py-3 sm:px-5 lg:px-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm font-black text-green-600">
              ▼
            </span>

            <h2 className="text-lg font-extrabold sm:text-xl">
              আজ দাম কমেছে
            </h2>
          </div>

          {fallingProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {fallingProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <EmptyProducts message="আজ কোনো পণ্যের দাম কমেনি।" />
          )}
        </section>

        {/* All Products */}
        <section
          id="সব-পণ্য"
          className="mx-auto max-w-6xl px-4 py-8 sm:px-5 lg:px-6"
        >
          <div className="mb-5">
            <h2 className="text-xl font-black sm:text-2xl">
              সব পণ্য
            </h2>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              মোট {toBengali(products.length)}টি পণ্যের আজকের
              বাজার দর
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <EmptyProducts message="কোনো পণ্য পাওয়া যায়নি।" />
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#dce8df] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-5 lg:px-6">
          <p>
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>

          <p>
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে
            পরিবর্তিত হয়।
          </p>
        </div>
      </footer>
    </div>
  );
}

function EmptyProducts({
  message,
}: {
  message: string;
}) {
  return (
    <div className="rounded-xl border border-[#dce8df] bg-white px-5 py-8 text-center text-sm text-gray-500">
      {message}
    </div>
  );
}

function toBengali(value: number) {
  const digits = "০১২৩৪৫৬৭৮৯";

  return String(value).replace(/[0-9]/g, (digit) => {
    return digits[Number(digit)];
  });
}