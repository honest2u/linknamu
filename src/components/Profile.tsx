import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  image?: string;
};

// 바깥 링 + 아래로 떨어지는 따뜻한 그림자로 살짝 떠 있는 느낌을 줌
const avatarFrame =
  "rounded-full p-1 bg-gradient-to-b from-white to-white/40 shadow-[0_14px_32px_-12px_rgba(140,80,40,0.45),0_2px_6px_rgba(140,80,40,0.08)] dark:from-white/20 dark:to-white/5 dark:shadow-[0_14px_32px_-12px_rgba(0,0,0,0.7)]";

export default function Profile({ name, bio, image }: Props) {
  return (
    <section className="flex flex-col items-center text-center">
      <div className={avatarFrame}>
        {image ? (
          <Image
            src={image}
            alt={`${name} 프로필 사진`}
            width={150}
            height={150}
            priority
            unoptimized={image.endsWith(".svg")}
            className="h-[150px] w-[150px] rounded-full object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-stone-200 text-4xl font-semibold text-stone-600 dark:bg-stone-800 dark:text-stone-300"
          >
            {name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
        {name}
      </h1>
      {/* "|"로 구분된 소개는 줄을 나눠서 표시 */}
      <p className="mt-2 max-w-[300px] text-[15px] leading-relaxed text-stone-500 dark:text-stone-400">
        {bio.split("|").map((line, i) => (
          <span key={i} className="block">
            {line.trim()}
          </span>
        ))}
      </p>
    </section>
  );
}
