"use client";

import { useState } from "react";
import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  initialCount: number;
};

export default function LinkCard({ link, initialCount }: Props) {
  const [count, setCount] = useState(initialCount);

  function handleClick() {
    setCount((c) => c + 1);
    // sendBeacon은 페이지를 떠나도 요청이 끝까지 전송됨
    const body = JSON.stringify({ id: link.id });
    const sent = navigator.sendBeacon?.(
      "/api/click",
      new Blob([body], { type: "application/json" })
    );
    if (!sent) {
      fetch("/api/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group relative flex min-h-[60px] w-full items-center justify-center rounded-2xl border border-white/70 bg-white/45 px-14 py-4 text-center text-[15px] font-semibold text-stone-800 shadow-[0_4px_20px_-8px_rgba(140,80,40,0.18)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_8px_24px_-10px_rgba(140,80,40,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 active:translate-y-0 active:scale-[0.99] dark:border-white/10 dark:bg-white/[0.06] dark:text-stone-100 dark:shadow-[0_4px_20px_-8px_rgba(0,0,0,0.5)] dark:hover:bg-white/[0.1]"
    >
      {link.title}
      <span className="absolute right-5 text-xs font-medium tabular-nums text-stone-400 transition-colors group-hover:text-stone-500 dark:text-stone-500 dark:group-hover:text-stone-400">
        {count.toLocaleString()}
      </span>
    </a>
  );
}
