
"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import type { Product } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

type CategoryProductListProps = {
  products: Product[];
};

type SortOption = "default" | "low-high" | "high-low";

export default function CategoryProductList({
  products,
}: CategoryProductListProps) {
  const [sort, setSort] = useState<SortOption>("default");
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.nameBn.toLowerCase().includes(search.trim().toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "low-high") return a.today - b.today;
    if (sort === "high-low") return b.today - a.today;
    return a.id - b.id;
  });

  return (
    <section>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-extrabold">পণ্যের তালিকা</h2>

        <label className="flex w-full items-center gap-2 rounded-xl border border-[#dce8df] bg-white px-3 py-2.5 sm:max-w-sm">
          <Search size={18} className="shrink-0 text-gray-400" />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="পণ্যের নাম লিখে খুঁজুন..."
            aria-label="পণ্যের নাম দিয়ে খুঁজুন"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="সার্চ মুছুন"
              className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
            >
              <X size={16} />
            </button>
          )}
        </label>
      </div>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gray-500">
          মোট {sortedProducts.length}টি পণ্য
        </p>

        <label className="flex items-center gap-2 text-sm">
          <span className="shrink-0 font-semibold text-gray-600">
            দাম অনুযায়ী:
          </span>

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as SortOption)
            }
            className="min-w-0 flex-1 rounded-lg border border-[#dce8df] bg-white px-3 py-2 text-sm outline-none focus:border-green-600 sm:flex-none"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-high">কম দাম থেকে বেশি</option>
            <option value="high-low">বেশি দাম থেকে কম</option>
          </select>
        </label>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#dce8df] bg-white px-4 py-10 text-center">
          <Search className="mx-auto mb-3 text-gray-400" size={30} />

          <p className="font-bold text-gray-700">
            কোনো পণ্য পাওয়া যায়নি
          </p>

          <p className="mt-1 text-sm text-gray-500">
            অন্য নাম দিয়ে খুঁজে দেখুন।
          </p>

          <button
            type="button"
            onClick={() => setSearch("")}
            className="mt-4 rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700"
          >
            সার্চ মুছুন
          </button>
        </div>
      )}
    </section>
  );
}
