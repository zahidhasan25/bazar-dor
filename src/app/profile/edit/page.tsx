import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { auth } from "@/lib/auth";
import { getProducts, type Product } from "@/lib/api";

import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import ProfileNameForm from "../ProfileNameForm";

export default async function EditProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?callbackURL=%2Fprofile%2Fedit");
  }

  const user = session.user;

  const fullName =
    "fullName" in user && typeof user.fullName === "string"
      ? user.fullName.trim()
      : "";

  const displayName = fullName || user.name?.trim() || "";

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
        <div className="mx-auto w-full max-w-xl">
          <Link
            href="/profile"
            className="mb-5 inline-flex text-sm font-semibold text-green-700 transition hover:text-green-800"
          >
            ← প্রোফাইলে ফিরে যান
          </Link>

          <header className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              প্রোফাইলের তথ্য পরিবর্তন
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              আপনার নাম পরিবর্তন করে সংরক্ষণ করুন।
            </p>
          </header>

          <section className="rounded-xl border border-[#dce8df] bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 text-lg font-bold text-slate-900">
              ব্যক্তিগত তথ্য
            </h2>

            <ProfileNameForm initialName={displayName} />

            <p className="mt-4 text-xs leading-6 text-slate-500">
              ইমেইল ঠিকানা এই পেজ থেকে পরিবর্তন করা যাবে না।
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}