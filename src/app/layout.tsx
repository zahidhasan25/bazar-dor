import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bazardor.com"),

  title: {
    default: "বাজার দর | BazarDor — আজকের বাজার মূল্য",
    template: "%s | বাজার দর",
  },

  description:
    "বাংলাদেশের চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিমসহ নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর ও বিভিন্ন বাজারের দামের তুলনা দেখুন।",

  applicationName: "BazarDor",

  keywords: [
    "বাজার দর",
    "আজকের বাজার দর",
    "বাংলাদেশের বাজার মূল্য",
    "নিত্যপ্রয়োজনীয় পণ্যের দাম",
    "চালের দাম",
    "ডালের দাম",
    "সবজির দাম",
    "মাছের দাম",
    "মাংসের দাম",
    "BazarDor",
  ],

  openGraph: {
    type: "website",
    locale: "bn_BD",
    siteName: "বাজার দর",
    title: "বাজার দর | আজকের বাজার মূল্য",
    description:
      "নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম ও বিভিন্ন বাজারের মূল্যতথ্য এক নজরে দেখুন।",
    url: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body>
        {children}

        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 3000,
            style: {
              maxWidth: "calc(100vw - 32px)",
              borderRadius: "12px",
              fontSize: "14px",
            },
            success: {
              duration: 2500,
              iconTheme: {
                primary: "#16a34a",
                secondary: "#ffffff",
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: "#dc2626",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
