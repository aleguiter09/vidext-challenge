import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/providers/TRPCProvider";
import { Toaster } from "@/components/ui/sonner";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { serverClient } from "@/server/serverClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vidext Challenge",
  description: "Vidext Challenge",
  icons: {
    icon: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const docs = await serverClient.getAll();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex">
          <TRPCProvider>
            <Sidebar initialDocs={docs} />
            <main className="flex-1">
              {children}
              <Toaster />
            </main>
          </TRPCProvider>
        </div>
      </body>
    </html>
  );
}
