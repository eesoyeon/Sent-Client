import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { FontSizeProvider } from "@/contexts/font-size-context";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { queryClient } from "@/lib/react-query";

const pretendard = localFont({
  src: "../fonts/pretendard/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Sent",
  description: "당신의 일상을 체계적으로 관리하세요",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <FontSizeProvider>{children}</FontSizeProvider>
      </body>
    </html>
  );
}
