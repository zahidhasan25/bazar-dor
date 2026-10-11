"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

export default function AuthSuccessToast() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const provider = url.searchParams.get("authSuccess");

    if (provider === "google" || provider === "github") {
      toast.success(
        provider === "google"
          ? "Google দিয়ে সফলভাবে লগ ইন হয়েছে!"
          : "GitHub দিয়ে সফলভাবে লগ ইন হয়েছে!"
      );

      url.searchParams.delete("authSuccess");

      window.history.replaceState(
        window.history.state,
        "",
        `${url.pathname}${url.search}${url.hash}`
      );
    }
  }, []);

  return null;
}
