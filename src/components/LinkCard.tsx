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
      className="relative flex min-h-14 w-full items-center justify-center rounded-xl border border-neutral-300 bg-white px-12 py-4 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 dark:border-neutral-700 dark:bg-neutral-900"
    >
      {link.title}
      <span className="absolute right-4 text-xs tabular-nums text-neutral-400">
        {count.toLocaleString()}
      </span>
    </a>
  );
}
