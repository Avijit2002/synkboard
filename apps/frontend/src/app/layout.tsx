import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";
import { Poppins } from 'next/font/google'
 
const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

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
          <ReactQueryClientProvider>
            {children}
          </ReactQueryClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
