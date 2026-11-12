import type { Metadata } from "next";
// Pretendard: 한글을 글자 묶음 단위로 쪼갠 버전이라 화면에 쓰인 글자만 내려받음
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `${profile.name} | 링크나무`,
  description: profile.bio,
};

// 페이지가 그려지기 전에 테마를 적용해서 화면 깜빡임을 막음
const themeScript = `
try {
  const saved = localStorage.getItem("theme");
  const dark = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle("dark", dark);
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div aria-hidden className="warm-backdrop fixed inset-0 -z-10" />
        {children}
      </body>
    </html>
  );
}
