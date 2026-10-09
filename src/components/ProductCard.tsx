
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
      className="group block h-full min-w-0 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
    >
      <article className="flex h-full min-w-0 flex-col rounded-xl border border-[#dce8df] bg-white p-3 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md sm:p-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f5f8f5] text-xl sm:h-11 sm:w-11 sm:text-2xl">
            {product.image || product.categoryIcon}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="break-words text-sm font-extrabold leading-5 text-[#17251c] group-hover:text-green-700">
              {product.nameBn}
            </h3>

            <p className="mt-1 text-[11px] leading-4 text-gray-500">
              {unitName(product.unit)}
            </p>
          </div>
        </div>

        <div className="mt-4 flex min-w-0 flex-wrap items-end justify-between gap-x-2 gap-y-2">
          <div className="min-w-0">
            <p className="text-[10px] text-gray-500">
              আজকের দাম
            </p>

            <p className="break-words text-base font-black leading-6 text-[#17251c] sm:text-lg">
              {formatBengaliNumber(product.today)} টাকা
            </p>
          </div>

          <div className="shrink-0">
            {isUp && (
              <span className="inline-flex rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-500">
                ▲ {formatBengaliNumber(product.change.pct)}%
              </span>
            )}

            {isDown && (
              <span className="inline-flex rounded-full bg-green-50 px-2 py-1 text-[10px] font-bold text-green-600">
                ▼ {formatBengaliNumber(Math.abs(product.change.pct))}%
              </span>
            )}

            {!isUp && !isDown && (
              <span className="inline-flex rounded-full bg-gray-50 px-2 py-1 text-[10px] font-bold text-gray-500">
                — অপরিবর্তিত
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
