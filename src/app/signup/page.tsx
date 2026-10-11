"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Eye,
  EyeOff,
  ArrowLeft,
  ShoppingBasket,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PriceTicker from "@/components/PriceTicker";
import { getProducts, type Product } from "@/lib/api";

function SignUpForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignUp(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (loading) return;

    setError("");

    if (password !== confirmPassword) {
      const message = "দুটি পাসওয়ার্ড মিলছে না।";
      setError(message);
      toast.error(message);
      return;
    }

    if (password.length < 8) {
      const message = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (result.error) {
        const message =
          result.error.message ||
          "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।";

        setError(message);
        toast.error(message);
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      const message =
        "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignUp(
    provider: "google" | "github",
  ) {
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result.error) {
        const message =
          result.error.message ||
          "সোশ্যাল অ্যাকাউন্ট দিয়ে প্রবেশ করা যায়নি।";

        setError(message);
        toast.error(message);
        setLoading(false);
      }
    } catch {
      const message = "সাইন আপ করা যায়নি। আবার চেষ্টা করুন।";

      setError(message);
      toast.error(message);
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[450px] px-4 py-5 sm:py-7">
      <Link
        href="/"
        className="mb-3 inline-flex items-center gap-1.5 text-xs text-slate-600 transition hover:text-green-700"
      >
        <ArrowLeft size={15} />
        হোম পেজে ফিরে যান
      </Link>

      <section className="rounded-xl border border-green-100 bg-white px-5 py-5 shadow-sm sm:px-7 sm:py-6">
        <Link
          href="/"
          className="mb-4 flex items-center justify-center gap-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-700">
            <ShoppingBasket size={22} />
          </span>

          <span className="text-xl font-bold text-green-800">
            বাজার দর
          </span>
        </Link>

        <header className="mb-5 text-center">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-1.5 text-xs leading-5 text-slate-500">
            আপনার তথ্য দিয়ে বাজার দর-এ যোগ দিন।
          </p>
        </header>

        <form onSubmit={handleSignUp} className="space-y-3.5">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              আপনার নাম
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="আপনার পুরো নাম লিখুন"
              required
              disabled={loading}
              className="min-h-10 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-slate-50"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              ইমেইল ঠিকানা
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="আপনার ইমেইল লিখুন"
              required
              disabled={loading}
              className="min-h-10 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-slate-50"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              পাসওয়ার্ড
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর লিখুন"
                required
                disabled={loading}
                className="min-h-10 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 pr-11 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-slate-50"
              />

              <button
                type="button"
                aria-label={
                  showPassword
                    ? "পাসওয়ার্ড লুকান"
                    : "পাসওয়ার্ড দেখুন"
                }
                aria-pressed={showPassword}
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-slate-500 hover:text-green-700"
              >
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>

            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                minLength={8}
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                placeholder="আবার পাসওয়ার্ড লিখুন"
                required
                disabled={loading}
                className="min-h-10 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 pr-11 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-slate-50"
              />

              <button
                type="button"
                aria-label={
                  showConfirmPassword
                    ? "পাসওয়ার্ড লুকান"
                    : "পাসওয়ার্ড দেখুন"
                }
                aria-pressed={showConfirmPassword}
                onClick={() =>
                  setShowConfirmPassword((value) => !value)
                }
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-slate-500 hover:text-green-700"
              >
                {showConfirmPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="break-words rounded-lg bg-red-50 p-2.5 text-xs leading-5 text-red-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="min-h-10 w-full rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-2.5">
          <div className="h-px flex-1 bg-slate-200" />

          <span className="shrink-0 text-[11px] text-slate-400">
            অথবা দিয়ে চালিয়ে যান
          </span>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="space-y-2">
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSocialSignUp("google")}
            className="flex min-h-10 w-full items-center justify-center gap-2.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 48 48"
              className="h-5 w-5 shrink-0"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.97 46.98 31.87 46.98 24.55Z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.44-4.89 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.97 6.19C6.51 42.62 14.62 48 24 48Z"
              />
            </svg>

            Google দিয়ে চালিয়ে যান
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleSocialSignUp("github")}
            className="flex min-h-10 w-full items-center justify-center gap-2.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[9px] font-bold text-white">
              GH
            </span>

            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-slate-600">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-green-700 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </section>
    </div>
  );
}

export default function SignUpPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let active = true;

    getProducts()
      .then((data) => {
        if (active) {
          setProducts(data);
        }
      })
      .catch(() => {
        if (active) {
          setProducts([]);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-[#f1f7f2]">
      <Navbar />

      <PriceTicker products={products} />

      <main className="flex flex-1 items-center justify-center">
        <Suspense
          fallback={
            <div className="py-12 text-center text-sm text-slate-500">
              লোড হচ্ছে...
            </div>
          }
        >
          <SignUpForm />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}