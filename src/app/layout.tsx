import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "顺时游 - 智慧旅游规划",
  description: "AI驱动的智能旅游规划平台",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}