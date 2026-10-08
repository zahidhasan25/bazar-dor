import Image from "next/image";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-5 sm:px-5 lg:px-6">
      <div className="grid min-h-[300px] items-center overflow-hidden rounded-2xl border border-[#dce8df] bg-white px-5 py-7 shadow-sm sm:px-8 sm:py-8 lg:grid-cols-[1fr_330px] lg:px-10">
        {/* Hero Content */}
        <div className="relative z-10">
          <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-[11px] font-bold text-green-700 sm:text-xs">
            অক্টোবর, ২০২৬
          </span>

          <h1 className="mt-4 max-w-2xl text-3xl font-black leading-[1.2] tracking-tight text-[#17251c] sm:text-4xl lg:text-[44px]">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও অন্যান্য
            প্রয়োজনীয় পণ্যের আজকের বাজার দর এক জায়গায়।
          </p>

          <a
            href="#সব-পণ্য"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 active:scale-[0.98]"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        {/* Hero Image */}
        <div className="mt-7 flex items-center justify-center lg:mt-0">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের পণ্যের ঝুড়ি"
            width={320}
            height={250}
            priority
            sizes="(max-width: 640px) 190px, (max-width: 1024px) 240px, 320px"
            className="h-auto w-[190px] object-contain sm:w-[230px] lg:w-[300px]"
          />
        </div>
      </div>
    </section>
  );
}