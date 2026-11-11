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
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-6">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>

      <div className="mt-6">
        <Profile name={profile.name} bio={profile.bio} image={profile.image} />
      </div>

      <ul className="mt-10 flex flex-col gap-6">
        {links.map((link) => (
          <li key={link.id}>
            <LinkCard link={link} initialCount={counts[link.id] ?? 0} />
          </li>
        ))}
      </ul>

      <footer className="mt-auto pt-12 text-center text-xs text-neutral-400">
        링크나무
      </footer>
    </main>
  );
}
