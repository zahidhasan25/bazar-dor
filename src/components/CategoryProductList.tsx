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

  const normalizedSearch = search.trim().toLowerCase();

  const filteredProducts = products.filter((product) =>
    product.nameBn.toLowerCase().includes(normalizedSearch),
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "low-high") {
      return a.today - b.today;
    }

    if (sort === "high-low") {
      return b.today - a.today;
    }

    return a.id - b.id;
  });

  function clearSearch() {
    setSearch("");
  }

  return (
    <section className="w-full min-w-0">
      {/* Heading and Search */}
      <div className="mb-4 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="break-words text-lg font-extrabold">
          পণ্যের তালিকা
        </h2>

        <label className="flex min-h-11 w-full min-w-0 items-center gap-2 rounded-xl border border-[#dce8df] bg-white px-3 py-2.5 focus-within:border-green-600 sm:max-w-sm">
          <Search
            size={18}
            aria-hidden="true"
            className="shrink-0 text-gray-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="পণ্যের নাম লিখে খুঁজুন..."
            aria-label="পণ্যের নাম দিয়ে খুঁজুন"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
          />

          {search.length > 0 && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="সার্চ মুছুন"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100"
            >
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </label>
      </div>

      {/* Product Count and Sorting */}
      <div className="mb-4 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p
          className="text-xs text-gray-500"
          aria-live="polite"
        >
          মোট {sortedProducts.length}টি পণ্য
        </p>

        <label className="flex min-w-0 items-center gap-2 text-sm">
          <span className="shrink-0 font-semibold text-gray-600">
            দাম অনুযায়ী:
          </span>

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as SortOption)
            }
            aria-label="দাম অনুযায়ী পণ্য সাজান"
            className="min-h-11 min-w-0 flex-1 rounded-lg border border-[#dce8df] bg-white px-2 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 sm:flex-none sm:px-3"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-high">কম দাম থেকে বেশি</option>
            <option value="high-low">বেশি দাম থেকে কম</option>
          </select>
        </label>
      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="min-w-0 max-w-full"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        /* Empty Search Results */
        <div className="min-w-0 rounded-xl border border-[#dce8df] bg-white px-4 py-8 text-center sm:py-10">
          <Search
            className="mx-auto mb-3 text-gray-400"
            size={30}
            aria-hidden="true"
          />

          <p className="break-words font-bold text-gray-700">
            কোনো পণ্য পাওয়া যায়নি
          </p>

          <p className="mt-1 break-words text-sm leading-6 text-gray-500">
            অন্য নাম দিয়ে খুঁজে দেখুন।
          </p>

          {search.length > 0 && (
            <button
              type="button"
              onClick={clearSearch}
              className="mt-4 inline-flex min-h-10 items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              সার্চ মুছুন
            </button>
          )}
        </div>
      )}
    </section>
  );
}
