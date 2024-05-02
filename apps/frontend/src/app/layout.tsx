import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

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
      <body className={poppins.className}>
        <ClerkProvider>
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </ClerkProvider>
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            classNames: {
              title: "text-lg",
              
            },
          }}
        />
      </body>
    </html>
  );
}
