import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getProducts, type Product } from "@/lib/api";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import ProfileActions from "./ProfileActions";
import ProfileNameForm from "./ProfileNameForm";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "U";

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

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
    <div className="flex min-h-screen flex-col bg-[#f0f6f1] text-[#17251c]">
      <Navbar />

      <PriceTicker products={products} />

      <main className="flex w-full flex-1 justify-center px-4 py-10 sm:py-14">
        <div className="w-full max-w-2xl">
          <header className="mb-5">
            <h1 className="text-2xl font-bold text-slate-900">
              আমার প্রোফাইল
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
            </p>
          </header>

          <section className="flex flex-col gap-4 rounded-xl border border-[#e1eae3] bg-white p-5 shadow-sm sm:flex-row sm:items-center">
            {avatar ? (
              <img
                src={avatar}
                alt={`${displayName} প্রোফাইল ছবি`}
                referrerPolicy="no-referrer"
                className="h-[70px] w-20 shrink-0 rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-[70px] w-20 shrink-0 items-center justify-center rounded-lg bg-green-100 text-xl font-bold text-green-800">
                {getInitials(displayName)}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h2 className="break-words font-bold text-slate-900">
                {displayName}
              </h2>
              <p className="mt-1 break-all text-sm text-slate-500">
                {user.email}
              </p>
            </div>

            <div className="shrink-0">
              <ProfileActions />
            </div>
          </section>

          <section className="mt-5 rounded-xl border border-[#e1eae3] bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-5 text-lg font-bold text-slate-900">
              তথ্য
            </h2>

            <ProfileNameForm initialName={displayName} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
