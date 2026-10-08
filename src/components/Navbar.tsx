"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const categories = [
  { name: "সব", slug: "" },
  { name: "চাল", slug: "chal" },
  { name: "ডাল", slug: "dal" },
  { name: "সবজি", slug: "sobji" },
  { name: "মাছ", slug: "mach" },
  { name: "মাংস", slug: "mangsho" },
  { name: "ডিম", slug: "dim" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-5 lg:px-6">
        {/* Top Header */}
        <div className="flex min-h-[88px] items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex min-w-0 items-center gap-2.5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-600 shadow-sm">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={38}
                height={38}
                priority
                className="h-9 w-9 object-contain"
              />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-xl font-black tracking-tight text-[#172033] sm:text-2xl">
                বাজার দর
              </h1>

              <p className="text-[10px] text-slate-500 sm:text-xs">
                ২৪ আশ্বিন ১৪৩৩
              </p>
            </div>
          </Link>

          {/* Desktop Auth */}
          <div className="hidden items-center gap-2 sm:flex">
            <Link
              href="/signin"
              className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-green-700"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-700"
            >
              সাইন আপ
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 sm:hidden"
            aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Categories */}
        <nav className="hidden overflow-x-auto pb-3 sm:block">
          <div className="flex items-center justify-center gap-1.5">
            {categories.map((category, index) => {
              const href =
                index === 0 ? "/" : `/category/${category.slug}`;

              return (
                <Link
                  key={category.name}
                  href={href}
                  className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition ${
                    index === 0
                      ? "bg-green-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-slate-100 py-4 sm:hidden">
            <nav className="grid grid-cols-2 gap-2">
              {categories.map((category, index) => {
                const href =
                  index === 0 ? "/" : `/category/${category.slug}`;

                return (
                  <Link
                    key={category.name}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-lg px-4 py-3 text-center text-sm font-semibold transition ${
                      index === 0
                        ? "bg-green-600 text-white"
                        : "bg-slate-50 text-slate-700 hover:bg-green-50 hover:text-green-700"
                    }`}
                  >
                    {category.name}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
              <Link
                href="/signin"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg bg-green-600 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-green-700"
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