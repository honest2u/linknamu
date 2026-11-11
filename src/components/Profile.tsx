import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  image?: string;
};

export default function Profile({ name, bio, image }: Props) {
  return (
    <section className="flex flex-col items-center text-center">
      {image ? (
        <Image
          src={image}
          alt={`${name} 프로필 사진`}
          width={144}
          height={144}
          priority
          className="h-36 w-36 rounded-full object-cover ring-2 ring-neutral-200 dark:ring-neutral-800"
        />
      ) : (
        <div
          aria-hidden
          className="flex h-36 w-36 items-center justify-center rounded-full bg-neutral-200 text-4xl font-semibold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
        >
          {name.slice(0, 2).toUpperCase()}
        </div>
      )}
      <h1 className="mt-5 text-xl font-bold">{name}</h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{bio}</p>
    </section>
  );
}
