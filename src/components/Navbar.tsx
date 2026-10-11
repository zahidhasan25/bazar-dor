"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  LogOut,
  UserRound,
  ChevronDown,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const categories = [
  { name: "সব", href: "/" },
  { name: "চাল", href: "/category/chal" },
  { name: "ডাল", href: "/category/dal" },
  { name: "সবজি", href: "/category/sobji" },
  { name: "মাছ", href: "/category/mach" },
  { name: "মাংস", href: "/category/mangsho" },
  { name: "ডিম", href: "/category/dim-dui" },
];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "U";

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

function Avatar({
  image,
  name,
  className = "h-8 w-8",
}: {
  image?: string | null;
  name: string;
  className?: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [image]);

  if (image && !imageFailed) {
    return (
      <img
        src={image}
        alt={`${name} প্রোফাইল ছবি`}
        referrerPolicy="no-referrer"
        onError={() => setImageFailed(true)}
        className={`${className} shrink-0 rounded-full object-cover`}
      />
    );
  }

  return (
    <span
      aria-label={`${name} প্রোফাইল`}
      className={`${className} flex shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-800`}
    >
      {getInitials(name)}
    </span>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const isLoggedIn = Boolean(user);

  const userName =
    user?.name?.trim() || user?.email || "ব্যবহারকারী";
  const userEmail = user?.email || "";
  const userImage = user?.image || null;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setUserMenuOpen(false);
      }
    }

    function handleOutsideClick(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  function closeMenus() {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  async function handleSignOut() {
    if (signingOut) return;

    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(
          result.error.message ||
            "লগ আউট করা যায়নি। আবার চেষ্টা করুন।",
        );
        return;
      }

      toast.success("সফলভাবে লগ আউট হয়েছে।");
      closeMenus();
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("লগ আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSigningOut(false);
    }
  }

  function UserMenu({ mobile = false }: { mobile?: boolean }) {
    if (isPending) {
      return (
        <span className="px-3 py-2 text-sm text-slate-400">
          অপেক্ষা করুন...
        </span>
      );
    }

    if (!isLoggedIn) {
      return (
        <div
          className={
            mobile
              ? "grid grid-cols-2 gap-2"
              : "flex items-center gap-1.5"
          }
        >
          <Link
            href="/signin"
            onClick={closeMenus}
            className="rounded-md px-3 py-2 text-center text-sm font-semibold text-slate-700 transition hover:bg-green-50 hover:text-green-700"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            onClick={closeMenus}
            className="rounded-md bg-green-700 px-3.5 py-2 text-center text-sm font-semibold text-white transition hover:bg-green-800"
          >
            সাইন আপ
          </Link>
        </div>
      );
    }

    if (mobile) {
      return (
        <div className="space-y-1.5">
          <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3">
            <Avatar
              image={userImage}
              name={userName}
              className="h-10 w-10 text-sm"
            />

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-800">
                {userName}
              </p>
              <p className="truncate text-xs text-slate-500">
                {userEmail}
              </p>
            </div>
          </div>

          <Link
            href="/profile"
            onClick={closeMenus}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-green-50"
          >
            <UserRound size={18} />
            আমার প্রোফাইল
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
          >
            <LogOut size={18} />
            {signingOut ? "অপেক্ষা করুন..." : "লগ আউট"}
          </button>
        </div>
      );
    }

    return (
      <div className="relative" ref={userMenuRef}>
        <button
          type="button"
          onClick={() => setUserMenuOpen((open) => !open)}
          aria-expanded={userMenuOpen}
          aria-haspopup="menu"
          className="flex max-w-56 items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1.5 pr-2.5 transition hover:border-green-300 hover:bg-green-50"
        >
          <Avatar
            image={userImage}
            name={userName}
            className="h-8 w-8 text-xs"
          />

          <span className="max-w-32 truncate text-sm font-semibold text-slate-700">
            {userName}
          </span>

          <ChevronDown
            size={15}
            className={`shrink-0 text-slate-500 transition ${
              userMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {userMenuOpen && (
          <div
            role="menu"
            className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 bg-green-50/70 p-3.5">
              <Avatar
                image={userImage}
                name={userName}
                className="h-10 w-10 text-sm"
              />

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-800">
                  {userName}
                </p>
                <p className="mt-1 truncate text-xs text-slate-500">
                  {userEmail}
                </p>
              </div>
            </div>

            <div className="p-1.5">
              <Link
                href="/profile"
                role="menuitem"
                onClick={closeMenus}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-green-50 hover:text-green-700"
              >
                <UserRound size={17} />
                আমার প্রোফাইল
              </Link>

              <button
                type="button"
                role="menuitem"
                onClick={handleSignOut}
                disabled={signingOut}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60"
              >
                <LogOut size={17} />
                {signingOut ? "অপেক্ষা করুন..." : "লগ আউট"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <header className="relative z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-3 sm:px-5 lg:px-6">
        <div className="flex min-h-[62px] items-center justify-between gap-3 sm:min-h-[66px]">
          <Link
            href="/"
            onClick={closeMenus}
            className="flex min-w-0 items-center gap-2"
            aria-label="বাজার দর হোম পেজ"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-700 sm:h-10 sm:w-10">
              <Image
                src="/logo-icon.png"
                alt=""
                width={34}
                height={34}
                priority
                className="h-7 w-7 object-contain sm:h-8 sm:w-8"
              />
            </span>

            <span className="min-w-0">
              <span className="block truncate text-lg font-black tracking-tight text-[#172033] sm:text-xl">
                বাজার দর
              </span>
              <span className="block text-[10px] text-slate-500 sm:text-[11px]">
                আজকের বাজার মূল্য
              </span>
            </span>
          </Link>

          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <UserMenu />
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:hidden"
            aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        <nav
          aria-label="পণ্যের ক্যাটাগরি"
          className="hidden overflow-x-auto sm:block"
        >
          <div className="flex min-w-max items-center gap-1 border-t border-slate-100 py-1.5">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                aria-current={
                  isActive(category.href) ? "page" : undefined
                }
                className={`whitespace-nowrap rounded-md px-3.5 py-2 text-[13px] font-semibold transition ${
                  isActive(category.href)
                    ? "bg-green-700 text-white"
                    : "text-slate-600 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </nav>

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-slate-100 py-3 sm:hidden"
          >
            <nav
              aria-label="মোবাইল ক্যাটাগরি"
              className="grid grid-cols-2 gap-2"
            >
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  onClick={closeMenus}
                  aria-current={
                    isActive(category.href) ? "page" : undefined
                  }
                  className={`rounded-lg px-3 py-2.5 text-center text-sm font-semibold transition ${
                    isActive(category.href)
                      ? "bg-green-700 text-white"
                      : "bg-slate-50 text-slate-700 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            <div className="mt-3 border-t border-slate-100 pt-3">
              <UserMenu mobile />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
