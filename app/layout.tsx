import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Furniture Studio - Reliable Furniture for Everyday Use",
  description: "Reliable furniture for everyday use. Wholesale from 5 units. Easy to assemble, perfected to excellence. Own production.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

