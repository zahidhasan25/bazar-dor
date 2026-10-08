import type { Product } from "@/lib/api";
import {
  formatBengaliNumber,
  unitName,
} from "@/lib/bengali-number";

type PriceTickerProps = {
  products: Product[];
};

export default function PriceTicker({
  products,
}: PriceTickerProps) {
  const tickerProducts = products.slice(0, 12);

  const items = [...tickerProducts, ...tickerProducts];

  return (
    <div className="overflow-hidden border-b border-slate-200 bg-slate-50">
      <div className="ticker-track flex min-h-10 items-center whitespace-nowrap">
        {items.map((product, index) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          return (
            <div
              key={`${product.id}-${index}`}
              className="flex shrink-0 items-center gap-2 px-5 text-sm"
            >
              <span>{product.image}</span>

              <span className="font-semibold text-slate-800">
                {product.nameBn}
              </span>

              <span className="font-bold text-slate-900">
                {formatBengaliNumber(product.today)} টাকা/
                {unitName(product.unit)
                  .replace("প্রতি ", "")
                  .replace("প্রতি", "")}
              </span>

              {isUp && (
                <span className="font-bold text-green-600">
                  ▲ {formatBengaliNumber(product.change.pct)}%
                </span>
              )}

              {isDown && (
                <span className="font-bold text-red-500">
                  ▼{" "}
                  {formatBengaliNumber(
                    Math.abs(product.change.pct),
                  )}
                  %
                </span>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        .ticker-track {
          width: max-content;
          animation: ticker 32s linear infinite;
        }

        @keyframes ticker {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}