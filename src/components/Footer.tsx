
export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-center text-xs leading-5 text-slate-600 sm:flex-row sm:gap-4 sm:px-6 sm:text-left">
        <p>© {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।</p>

        <p>
          বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক নজরে দেখুন।
        </p>
      </div>
    </footer>
  );
}
