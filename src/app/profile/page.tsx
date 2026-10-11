import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  UserRound,
  Mail,
  ShieldCheck,
  Pencil,
} from "lucide-react";

import { auth } from "@/lib/auth";
import { getProducts, type Product } from "@/lib/api";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import ProfileActions from "./ProfileActions";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?callbackURL=%2Fprofile");
  }

  const user = session.user;

  const fullName =
    "fullName" in user && typeof user.fullName === "string"
      ? user.fullName.trim()
      : "";

  const displayName =
    fullName || user.name?.trim() || "ব্যবহারকারী";

  const avatar = user.image;

  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("বাজারদরের তথ্য লোড করা যায়নি:", error);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f1f7f2] text-[#17251c]">
      <Navbar />

      <PriceTicker products={products} />

      <main className="w-full flex-1 px-4 py-8 sm:py-10">
        <div className="mx-auto w-full max-w-3xl">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              আমার প্রোফাইল
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              আপনার ব্যক্তিগত তথ্য দেখুন ও অ্যাকাউন্ট পরিচালনা করুন।
            </p>
          </header>

          {/* প্রোফাইল পরিচিতি */}
          <section className="rounded-xl border border-[#dce8df] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {avatar ? (
                <img
                  src={avatar}
                  alt="প্রোফাইলের ছবি"
                  className="h-16 w-16 shrink-0 rounded-full border border-slate-200 object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800">
                  <UserRound size={30} />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <h2 className="break-words text-lg font-bold text-slate-900">
                  {displayName}
                </h2>

                <p className="mt-1 break-all text-sm text-slate-500">
                  {user.email}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs font-medium">
                  <ShieldCheck
                    size={15}
                    className={
                      user.emailVerified
                        ? "text-green-700"
                        : "text-amber-600"
                    }
                  />

                  <span
                    className={
                      user.emailVerified
                        ? "text-green-700"
                        : "text-amber-600"
                    }
                  >
                    {user.emailVerified
                      ? "ইমেইল যাচাই করা হয়েছে"
                      : "ইমেইল এখনো যাচাই করা হয়নি"}
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <ProfileActions />
              </div>
            </div>
          </section>

          {/* অ্যাকাউন্টের তথ্য */}
          <section className="mt-5 rounded-xl border border-[#dce8df] bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-slate-900">
                অ্যাকাউন্টের তথ্য
              </h2>

              <Link
                href="/profile/edit"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-green-200 px-3 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                <Pencil size={15} />
                তথ্য পরিবর্তন
              </Link>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="mb-1 flex items-center gap-2 text-sm text-slate-500">
                  <UserRound size={16} />
                  <span>নাম</span>
                </div>

                <p className="break-words font-medium text-slate-900">
                  {displayName}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="mb-1 flex items-center gap-2 text-sm text-slate-500">
                  <Mail size={16} />
                  <span>ইমেইল ঠিকানা</span>
                </div>

                <p className="break-all font-medium text-slate-900">
                  {user.email}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="mb-1 flex items-center gap-2 text-sm text-slate-500">
                  <ShieldCheck size={16} />
                  <span>অ্যাকাউন্টের অবস্থা</span>
                </div>

                <p
                  className={`font-medium ${
                    user.emailVerified
                      ? "text-green-700"
                      : "text-amber-600"
                  }`}
                >
                  {user.emailVerified
                    ? "যাচাইকৃত অ্যাকাউন্ট"
                    : "ইমেইল যাচাই করা বাকি"}
                </p>
              </div>
            </div>

            <p className="mt-5 text-xs leading-6 text-slate-500">
              আপনার ইমেইল ঠিকানা এখানে দেখানো হচ্ছে।
              ইমেইল পরিবর্তনের সুবিধা আলাদাভাবে যুক্ত করতে হবে।
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}