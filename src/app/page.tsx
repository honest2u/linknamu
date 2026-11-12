import Profile from "@/components/Profile";
import LinkCard from "@/components/LinkCard";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/data/profile";
import { getClickCounts } from "@/lib/mongodb";

// 매 요청마다 최신 클릭 수를 불러옴
export const dynamic = "force-dynamic";

export default async function Home() {
  const counts = await getClickCounts();

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[440px] flex-col px-7 pb-10 pt-6 sm:px-8 sm:pt-10">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>

      <div className="mt-4 sm:mt-6">
        <Profile name={profile.name} bio={profile.bio} image={profile.image} />
      </div>

      <ul className="mt-12 flex flex-col gap-4 sm:gap-5">
        {links.map((link) => (
          <li key={link.id}>
            <LinkCard link={link} initialCount={counts[link.id] ?? 0} />
          </li>
        ))}
      </ul>

      <footer className="mt-auto pt-16 text-center text-[11px] font-medium tracking-[0.2em] text-stone-400 dark:text-stone-500">
        링크나무
      </footer>
    </main>
  );
}
