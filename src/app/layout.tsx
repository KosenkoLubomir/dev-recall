import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UserProvider from '@/components/UserProvider';
import { Analytics } from "@vercel/analytics/next"

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "DevRecall",
    description: "Your personal interview prep space — structured, focused, and made for developers.",
    icons: {
        icon: [
            "/favicon.ico",
            { url: "/images/favicon.png", type: "image/png" },
        ],
        shortcut: [
            { url: "/images/dev-recall-logo.png", type: "image/png" },
        ],
    },
    keywords: [
        "DevRecall",
        "developer interview preparation",
        "technical notes",
        "software engineering interview",
        "engineering memory"
    ],
    authors: [{ name: "DevRecall Team", url: "https://devrecall.com" }],
    metadataBase: new URL("https://devrecall.com"),
    openGraph: {
        title: "DevRecall",
        description: "Organize your dev knowledge and refresh before interviews with your personalized prep hub.",
        url: "https://devrecall.com",
        siteName: "DevRecall",
        images: [
            {
                url: "/images/dev-recall.png", // 1200x630 recommended
                width: 1200,
                height: 630,
                alt: "DevRecall preview"
            }
        ],
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "DevRecall",
        description: "Prep for interviews with notes organized by stack.",
        images: ["/images/dev-recall-logo.png"]
    }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} antialiased`}
      >
      <UserProvider>
          {children}
      </UserProvider>
      <Analytics/>
      </body>
    </html>
  );
}
