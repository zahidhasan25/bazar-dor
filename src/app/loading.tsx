
export default function Loading() {
  return (
    <main
      className="min-h-screen animate-pulse bg-[#f1f7f2]"
      aria-label="পণ্যের তথ্য লোড হচ্ছে"
      aria-busy="true"
    >
      {/* Header Skeleton */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-[76px] max-w-6xl items-center justify-between gap-3 px-3 sm:min-h-[88px] sm:px-5 lg:px-6">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-slate-200 sm:h-12 sm:w-12" />
            <div className="space-y-2">
              <div className="h-5 w-28 rounded bg-slate-200 sm:w-36" />
              <div className="h-3 w-20 rounded bg-slate-100" />
            </div>
          </div>
          <div className="hidden gap-3 sm:flex">
            <div className="h-10 w-20 rounded-lg bg-slate-100" />
            <div className="h-10 w-24 rounded-lg bg-slate-200" />
          </div>
          <div className="h-10 w-10 rounded-lg bg-slate-200 sm:hidden" />
        </div>

        <div className="mx-auto hidden max-w-6xl gap-3 px-5 pb-3 sm:flex lg:px-6">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="h-9 w-16 rounded-full bg-slate-100"
            />
          ))}
        </div>
      </header>

      {/* Price Ticker Skeleton */}
      <div className="flex min-h-10 items-center gap-5 overflow-hidden border-b border-slate-200 bg-slate-50 px-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-4 w-40 shrink-0 rounded bg-slate-200" />
        ))}
      </div>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-5 sm:py-8 lg:px-6">
        {/* Hero Skeleton */}
        <section className="rounded-2xl border border-[#dce8df] bg-white p-5 shadow-sm sm:p-8">
          <div className="h-4 w-28 rounded bg-slate-200" />
          <div className="mt-5 h-8 w-full max-w-md rounded bg-slate-200 sm:h-10" />
          <div className="mt-3 h-4 w-full max-w-lg rounded bg-slate-100" />
          <div className="mt-6 h-11 w-36 rounded-lg bg-slate-200" />
          <div className="mt-8 h-28 w-full rounded-xl bg-slate-100 sm:h-36" />
        </section>

        {/* Section Heading */}
        <section>
          <div className="mb-5 h-6 w-44 rounded bg-slate-200" />

          {/* Product Card Skeletons */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <article
                key={index}
                className="rounded-xl border border-[#dce8df] bg-white p-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="h-11 w-11 shrink-0 rounded-lg bg-slate-200" />

                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="h-4 w-24 max-w-full rounded bg-slate-200" />
                    <div className="h-3 w-16 rounded bg-slate-100" />

                    <div className="mt-4 flex items-end justify-between gap-2">
                      <div className="space-y-2">
                        <div className="h-3 w-16 rounded bg-slate-100" />
                        <div className="h-5 w-24 max-w-full rounded bg-slate-200" />
                      </div>
                      <div className="h-6 w-14 shrink-0 rounded-full bg-slate-100" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Footer Skeleton */}
      <footer className="border-t border-[#dce8df] bg-white px-4 py-5">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-4 w-56 max-w-full rounded bg-slate-200" />
          <div className="h-4 w-64 max-w-full rounded bg-slate-100" />
        </div>
      </footer>

      <p className="sr-only">পণ্যের তথ্য লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন।</p>
    </main>
  );
}
