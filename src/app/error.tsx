"use client";

import { useEffect } from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f1f7f2] px-4 py-10 text-[#17251c]">
      <section className="w-full max-w-lg rounded-2xl border border-[#dce8df] bg-white p-6 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <AlertTriangle size={40} strokeWidth={1.7} />
        </div>

        <h1 className="mt-6 text-2xl font-black sm:text-3xl">
          দুঃখিত! কিছু একটা সমস্যা হয়েছে
        </h1>

        <p className="mt-3 text-sm leading-7 text-gray-500 sm:text-base">
          পেজটি লোড করার সময় অপ্রত্যাশিত সমস্যা হয়েছে।
          আবার চেষ্টা করুন অথবা হোম পেজে ফিরে যান।
        </p>

        {error.digest && (
          <p className="mt-3 text-xs text-gray-400">
            Error ID: {error.digest}
          </p>
        )}

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            <RefreshCw size={18} />
            আবার চেষ্টা করুন
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#dce8df] px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-green-50 hover:text-green-700"
          >
            <Home size={18} />
            হোম পেজে যান
          </Link>
        </div>

        <p className="mt-8 text-xs text-gray-400">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
      </section>
    </main>
  );
}