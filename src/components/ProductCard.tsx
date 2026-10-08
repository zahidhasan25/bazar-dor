import Link from "next/link";
import type { Product } from "@/lib/api";
import {
  formatBengaliNumber,
  unitName,
} from "@/lib/bengali-number";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
    >
      <article className="rounded-xl border border-[#dce8df] bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md">
        <div className="flex items-start gap-3">
          {/* Product Icon */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f5f8f5] text-2xl">
            {product.image || product.categoryIcon}
          </div>

          {/* Product Info */}
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-extrabold text-[#17251c] group-hover:text-green-700">
              {product.nameBn}
            </h3>

            <p className="mt-0.5 text-[11px] text-gray-500">
              {unitName(product.unit)}
            </p>

            <div className="mt-4 flex items-end justify-between gap-2">
              <div>
                <p className="text-[10px] text-gray-500">
                  আজকের দাম
                </p>

                <p className="text-lg font-black text-[#17251c]">
                  {formatBengaliNumber(product.today)} টাকা
                </p>
              </div>

              {isUp && (
                <span className="shrink-0 rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-500">
                  ▲ {formatBengaliNumber(product.change.pct)}%
                </span>
              )}

              {isDown && (
                <span className="shrink-0 rounded-full bg-green-50 px-2 py-1 text-[10px] font-bold text-green-600">
                  ▼ {formatBengaliNumber(Math.abs(product.change.pct))}%
                </span>
              )}

              {!isUp && !isDown && (
                <span className="shrink-0 rounded-full bg-gray-50 px-2 py-1 text-[10px] font-bold text-gray-500">
                  — অপরিবর্তিত
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}