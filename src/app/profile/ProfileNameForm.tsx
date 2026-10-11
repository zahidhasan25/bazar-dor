
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfileNameForm({
  initialName,
}: {
  initialName: string;
}) {
  const [name, setName] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (trimmedName.length > 80) {
      toast.error("নাম ৮০ অক্ষরের মধ্যে রাখুন।");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: trimmedName }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "নাম সংরক্ষণ করা যায়নি।");
        return;
      }

      toast.success("নাম সফলভাবে সংরক্ষণ হয়েছে।");
      router.refresh();
    } catch {
      toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <label
        htmlFor="profile-name"
        className="block text-sm font-medium text-slate-700"
      >
        নাম
      </label>

      <input
        id="profile-name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        maxLength={80}
        required
        placeholder="আপনার নাম লিখুন"
        autoComplete="name"
        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
      />

      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-md bg-green-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-60"
      >
        {saving ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ"}
      </button>
    </form>
  );
}
