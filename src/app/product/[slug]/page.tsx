import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import { getProducts } from "@/lib/api";
import {
  formatBengaliNumber,
  unitName,
} from "@/lib/bengali-number";

type ProductDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

function formatPrice(price: number) {
  return `${formatBengaliNumber(price)} টাকা`;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;

  let products;

  try {
    products = await getProducts();
  } catch {
    return (
      <div className="min-h-screen overflow-x-clip bg-[#f1f7f2] text-[#17251c]">
        <Navbar />

        <main className="mx-auto w-full max-w-6xl px-3 py-10 sm:px-5 sm:py-16 lg:px-6">
          <div className="rounded-2xl border border-[#dce8df] bg-white p-5 text-center sm:p-8">
            <h1 className="break-words text-xl font-black sm:text-2xl">
              পণ্যের তথ্য লোড করা যায়নি
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700"
            >
              হোমে ফিরে যান
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets ?? [];

  const lowestPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : product.today;

  const highestPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : product.today;

  const averagePrice =
    markets.length > 0
      ? Math.round(
          markets.reduce(
            (total, market) =>
              total + (market.min + market.max) / 2,
            0,
          ) / markets.length,
        )
      : product.today;

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f1f7f2] text-[#17251c]">
      <Navbar />

      <PriceTicker products={products} />

      <main className="mx-auto w-full max-w-6xl px-3 py-5 sm:px-5 sm:py-8 lg:px-6">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 sm:text-sm"
        >
          <Link
            href="/"
            className="shrink-0 transition hover:text-green-700"
          >
            হোম
          </Link>

          <span aria-hidden="true">/</span>

          <Link
            href={`/category/${product.category}`}
            className="max-w-full break-words transition hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>

          <span aria-hidden="true">/</span>

          <span className="min-w-0 max-w-full break-words font-semibold text-gray-800">
            {product.nameBn}
          </span>
        </nav>

        {/* Product Summary */}
        <section className="min-w-0 rounded-2xl border border-[#dce8df] bg-white p-4 shadow-sm sm:p-8">
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f1f7f2] text-4xl sm:h-24 sm:w-24 sm:text-5xl">
              {product.image || product.categoryIcon}
            </div>

            <div className="min-w-0 flex-1">
              <p className="break-words text-xs font-bold text-green-700">
                {product.categoryIcon} {product.categoryNameBn}
              </p>

              <h1 className="mt-2 break-words text-2xl font-black leading-tight sm:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-2 break-words text-sm text-gray-500">
                একক: {unitName(product.unit)}
              </p>

              <div className="mt-4 flex min-w-0 flex-wrap items-center gap-2 sm:mt-5 sm:gap-3">
                <span className="max-w-full break-words text-2xl font-black leading-tight sm:text-4xl">
                  {formatPrice(product.today)}
                </span>

                {isUp && (
                  <span className="inline-flex shrink-0 items-center rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
                    ▲ {formatBengaliNumber(product.change.pct)}%
                  </span>
                )}

                {isDown && (
                  <span className="inline-flex shrink-0 items-center rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                    ▼{" "}
                    {formatBengaliNumber(
                      Math.abs(product.change.pct),
                    )}
                    %
                  </span>
                )}

                {!isUp && !isDown && (
                  <span className="inline-flex shrink-0 items-center rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600">
                    অপরিবর্তিত
                  </span>
                )}
              </div>

              <p className="mt-2 break-words text-xs leading-5 text-gray-500">
                বর্তমান API অনুযায়ী আজকের দাম
              </p>
            </div>
          </div>
        </section>

        {/* Market Price Summary */}
        <section className="mt-6 min-w-0">
          <h2 className="mb-4 break-words text-lg font-extrabold sm:text-xl">
            বাজারদরের সারসংক্ষেপ
          </h2>

          <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-3">
            <PriceSummary
              label="সর্বনিম্ন দাম"
              price={lowestPrice}
              color="green"
            />

            <PriceSummary
              label="আনুমানিক গড় দাম"
              price={averagePrice}
              color="blue"
            />

            <PriceSummary
              label="সর্বোচ্চ দাম"
              price={highestPrice}
              color="red"
            />
          </div>

          <p className="mt-2 break-words text-xs leading-5 text-gray-500">
            গড় দাম প্রতিটি বাজারের সর্বনিম্ন ও সর্বোচ্চ দামের
            মধ্যবিন্দুর গড় থেকে হিসাব করা হয়েছে।
          </p>
        </section>

        {/* Price History */}
        <section className="mt-8 min-w-0">
          <h2 className="mb-4 break-words text-lg font-extrabold sm:text-xl">
            আগের দামের তুলনা
          </h2>

          <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <HistoryCard
              label="আজকের দাম"
              price={product.today}
            />

            <HistoryCard
              label="গতকালের দাম"
              price={product.yesterday}
            />

            <HistoryCard
              label="গত সপ্তাহের দাম"
              price={product.lastWeek}
            />

            <HistoryCard
              label="গত মাসের দাম"
              price={product.lastMonth}
            />
          </div>
        </section>

        {/* Market List */}
        <section className="mt-8 min-w-0">
          <div className="mb-4">
            <h2 className="break-words text-lg font-extrabold sm:text-xl">
              বাজারভিত্তিক দাম
            </h2>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              মোট {formatBengaliNumber(markets.length)}টি বাজারের
              মূল্যতথ্য
            </p>
          </div>

          {markets.length > 0 ? (
            <div className="min-w-0 max-w-full overflow-hidden rounded-xl border border-[#dce8df] bg-white shadow-sm">
              <div
                className="max-w-full overflow-x-auto overscroll-x-contain"
                role="region"
                aria-label="বাজারভিত্তিক দামের টেবিল"
                tabIndex={0}
              >
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="bg-[#f5f8f5] text-gray-600">
                    <tr>
                      <th scope="col" className="whitespace-nowrap px-4 py-4 font-bold">
                        বাজার
                      </th>

                      <th scope="col" className="whitespace-nowrap px-4 py-4 font-bold">
                        বিভাগ
                      </th>

                      <th
                        scope="col"
                        className="whitespace-nowrap px-4 py-4 text-right font-bold"
                      >
                        সর্বনিম্ন
                      </th>

                      <th
                        scope="col"
                        className="whitespace-nowrap px-4 py-4 text-right font-bold"
                      >
                        সর্বোচ্চ
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {markets.map((market, index) => (
                      <tr
                        key={`${market.market}-${market.division}-${index}`}
                        className="border-t border-[#edf1ed] transition hover:bg-green-50/50"
                      >
                        <td className="whitespace-nowrap px-4 py-4 font-semibold">
                          {market.market}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-gray-500">
                          {market.division}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-right font-bold text-green-700">
                          {formatPrice(market.min)}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-right font-bold text-red-600">
                          {formatPrice(market.max)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-[#dce8df] bg-white p-5 text-sm leading-6 text-gray-500 sm:p-6">
              এই পণ্যের বাজারভিত্তিক তথ্য এখনো পাওয়া যায়নি।
            </div>
          )}
        </section>

        {/* Back Button */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex min-h-11 max-w-full items-center justify-center rounded-lg border border-[#dce8df] bg-white px-4 py-3 text-center text-sm font-bold text-gray-700 transition hover:bg-green-50 hover:text-green-700 sm:px-5"
          >
            ← সব পণ্যে ফিরে যান
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 border-t border-[#dce8df] bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-3 py-5 text-xs leading-5 text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-5 lg:px-6">
          <p className="break-words">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>

          <p className="break-words">
            সকল দাম বাজারের তথ্য অনুযায়ী পরিবর্তিত হতে পারে।
          </p>
        </div>
      </footer>
    </div>
  );
}

function PriceSummary({
  label,
  price,
  color,
}: {
  label: string;
  price: number;
  color: "green" | "blue" | "red";
}) {
  const styles = {
    green: "bg-green-50 text-green-700",
    blue: "bg-blue-50 text-blue-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <div className="min-w-0 rounded-xl border border-[#dce8df] bg-white p-4 shadow-sm sm:p-5">
      <p className="break-words text-xs text-gray-500">
        {label}
      </p>

      <p
        className={`mt-3 inline-block max-w-full break-words rounded-lg px-3 py-2 text-lg font-black sm:text-xl ${styles[color]}`}
      >
        {formatPrice(price)}
      </p>
    </div>
  );
}

function HistoryCard({
  label,
  price,
}: {
  label: string;
  price: number;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-[#dce8df] bg-white p-4 shadow-sm">
      <p className="break-words text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-2 break-words text-xl font-black">
        {formatPrice(price)}
      </p>
    </div>
  );
}
