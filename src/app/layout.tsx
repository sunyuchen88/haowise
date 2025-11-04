import type { Metadata } from "next";
import "./globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Chatbot from "@/components/Chatbot";

export const metadata: Metadata = {
  title: "Haowise - AI自动化与智能基础设施服务",
  description: "Haowise为全球企业提供领先的AI自动化与智能基础设施服务，包括RPA实施、低代码平台开发、AI Agent与GPU算力资源的高效配置",
  keywords: "AI, 自动化, RPA, 低代码, GPU, 云计算, 数字化转型",
  authors: [{ name: "Haowise" }],
  creator: "Haowise",
  publisher: "Haowise",
  robots: "index, follow",
  openGraph: {
    title: "Haowise - AI自动化与智能基础设施服务",
    description: "Haowise为全球企业提供领先的AI自动化与智能基础设施服务，包括RPA实施、低代码平台开发、AI Agent与GPU算力资源的高效配置",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <LanguageProvider>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </LanguageProvider>
        <Chatbot />
      </body>
    </html>
  );
}