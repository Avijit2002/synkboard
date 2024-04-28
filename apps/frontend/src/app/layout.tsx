import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Synkboard",
  description: "Brain Strom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link
        rel="shortcut icon"
        href="/synkboard-favicon-color.png"
        type="image/x-icon"
      />
      <body className={inter.className}>
        <ClerkProvider>
          <ReactQueryClientProvider>
            {children}
          </ReactQueryClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
