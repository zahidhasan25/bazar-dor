
"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const categories = [
  { name: "সব", slug: "", href: "/" },
  { name: "চাল", slug: "chal", href: "/category/chal" },
  { name: "ডাল", slug: "dal", href: "/category/dal" },
  { name: "সবজি", slug: "sobji", href: "/category/sobji" },
  { name: "মাছ", slug: "mach", href: "/category/mach" },
  { name: "মাংস", slug: "mangsho", href: "/category/mangsho" },
  { name: "ডিম", slug: "dim-dui", href: "/category/dim-dui" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  function closeMenu() {
    setMenuOpen(false);
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function categoryClass(href: string, mobile = false) {
    const active = isActive(href);

    if (mobile) {
      return `rounded-lg px-3 py-3 text-center text-sm font-semibold transition ${
        active
          ? "bg-green-600 text-white shadow-sm"
          : "bg-slate-50 text-slate-700 hover:bg-green-50 hover:text-green-700"
      }`;
    }

    return `whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition lg:px-5 ${
      active
        ? "bg-green-600 text-white shadow-sm"
        : "text-slate-600 hover:bg-green-50 hover:text-green-700"
    }`;
  }

  return (
    <header className="relative z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-3 sm:px-5 lg:px-6">
        <div className="flex min-h-[76px] items-center justify-between gap-2 sm:min-h-[88px] sm:gap-4">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex min-w-0 items-center gap-2 sm:gap-2.5"
            aria-label="বাজার দর হোম পেজ"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-600 shadow-sm sm:h-12 sm:w-12">
              <Image
                src="/logo-icon.png"
                alt=""
                width={38}
                height={38}
                priority
                className="h-8 w-8 object-contain sm:h-9 sm:w-9"
              />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-lg font-black tracking-tight text-[#172033] sm:text-2xl">
                বাজার দর
              </h1>
              <p className="text-[10px] text-slate-500 sm:text-xs">
                ২৪ আশ্বিন ১৪৩৩
              </p>
            </div>
          </Link>

          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <Link
              href="/signin"
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-green-700"
            >
              সাইন ইন
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 sm:px-5"
            >
              সাইন আপ
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:hidden"
            aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        <nav
          aria-label="পণ্যের ক্যাটাগরি"
          className="hidden overflow-x-auto pb-3 sm:block"
        >
          <div className="flex min-w-max items-center justify-center gap-1.5">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                aria-current={isActive(category.href) ? "page" : undefined}
                className={categoryClass(category.href)}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </nav>

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-slate-100 py-4 sm:hidden"
          >
            <nav
              aria-label="মোবাইল ক্যাটাগরি"
              className="grid grid-cols-2 gap-2"
            >
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  onClick={closeMenu}
                  aria-current={isActive(category.href) ? "page" : undefined}
                  className={categoryClass(category.href, true)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
              <Link
                href="/signin"
                onClick={closeMenu}
                className="rounded-lg border border-slate-200 px-3 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                onClick={closeMenu}
                className="rounded-lg bg-green-600 px-3 py-3 text-center text-sm font-bold text-white transition hover:bg-green-700"
              >
                সাইন আপ
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
