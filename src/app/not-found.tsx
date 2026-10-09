
import Link from "next/link";
import { Home, Search, ShoppingBasket } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f1f7f2] px-4 py-10 text-[#17251c]">
      <section className="w-full max-w-lg rounded-2xl border border-[#dce8df] bg-white p-6 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-green-50 text-green-700">
          <ShoppingBasket size={42} strokeWidth={1.7} />
        </div>

        <p className="mt-6 text-6xl font-black tracking-tight text-green-700 sm:text-7xl">
          404
        </p>

        <h1 className="mt-4 text-2xl font-black sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-gray-500 sm:text-base">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
          লিংকটি ভুল হতে পারে অথবা পেজটি আর উপলভ্য নেই।
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            <Home size={18} />
            হোম পেজে ফিরে যান
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#dce8df] px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-green-50 hover:text-green-700"
          >
            <Search size={18} />
            পণ্য খুঁজুন
          </Link>
        </div>

        <p className="mt-8 text-xs text-gray-400">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
      </section>
    </main>
  );
}
