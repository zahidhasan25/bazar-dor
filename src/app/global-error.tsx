
"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="bn">
      <body className="flex min-h-screen items-center justify-center bg-[#f1f7f2] px-4 font-sans text-[#17251c]">
        <main className="w-full max-w-lg rounded-2xl border border-[#dce8df] bg-white p-8 text-center shadow-sm">
          <div className="mb-5 text-5xl" aria-hidden="true">
            ⚠️
          </div>

          <h1 className="text-2xl font-black sm:text-3xl">
            দুঃখিত! সাইটে সমস্যা হয়েছে
          </h1>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            এই মুহূর্তে পেজটি দেখানো যাচ্ছে না।
            আবার চেষ্টা করুন অথবা কিছুক্ষণ পরে ফিরে আসুন।
          </p>

          <button
            type="button"
            onClick={() => reset()}
            className="mt-7 rounded-lg bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            আবার চেষ্টা করুন
          </button>
        </main>
      </body>
    </html>
  );
}
