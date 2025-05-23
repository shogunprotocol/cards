import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppKitProvider } from "./providers/AppKitProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Wallet Dashboard",
  description: "AI-powered crypto wallet management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-gray-100 min-h-screen`}>
        <AppKitProvider>
          {children}
        </AppKitProvider>
      </body>
    </html>
  );
}
