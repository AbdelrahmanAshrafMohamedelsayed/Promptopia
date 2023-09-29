import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* for cool background */}
        <div className="main">
          <div className="gradient" />
        </div>
        {/* for cool background */}

        <main className="app">{children}</main>
      </body>
    </html>
  );
}
