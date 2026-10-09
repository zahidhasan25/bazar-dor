
"use client";

import { useState } from "react";
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

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low-high") {
      return a.today - b.today;
    }

    if (sort === "high-low") {
      return b.today - a.today;
    }

    return a.id - b.id;
  });

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-extrabold">
          পণ্যের তালিকা
        </h2>

        <label className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-gray-600">
            দাম অনুযায়ী:
          </span>

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as SortOption)
            }
            className="rounded-lg border border-[#dce8df] bg-white px-3 py-2 text-sm outline-none focus:border-green-600"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-high">কম দাম থেকে বেশি</option>
            <option value="high-low">বেশি দাম থেকে কম</option>
          </select>
        </label>
      </div>

      <p className="mb-3 text-xs text-gray-500">
        মোট {sortedProducts.length}টি পণ্য
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
