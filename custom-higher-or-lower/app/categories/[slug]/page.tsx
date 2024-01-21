import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Leaderboard } from "@/components/ui/LeaderBoard";
import { Category } from "@/app/categories/page";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { User, ThumbsUp, Cake, Hash } from "lucide-react";

export default function Page({ params }: { params: { slug: string } }) {
  const fetchedCategory: Category = {
    id: 1,
    name: "Books",
    description: "Find which book has the most sales",
    created_at: "2021-10-10T18:25:43.511Z",
    likes: 10,
    cover_image: "https://picsum.photos/200",
    slug: "books",
    author: {
      id: 1,
      name: "John Doe",
      avatar: "https://picsum.photos/200",
    },
    metric: "sales",
    number_of_values: 10,
  };
  const simplifiedDate = new Date(
    fetchedCategory.created_at,
  ).toLocaleDateString("en-UK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const heroTextCss =
    "w-72 h-16 bg-[length:200%_auto] italic px-2 font-extrabold bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] text-2xl text-transparent  bg-clip-text animate-gradient";

  const highscores = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://picsum.photos/200",
      score: 10,
    },
    {
      id: 2,
      name: "John Doe",
      avatar: "https://picsum.photos/200",
      score: 10,
    },
    {
      id: 3,
      name: "John Doe",
      avatar: "https://picsum.photos/200",
      score: 10,
    },
    {
      id: 4,
      name: "John Doe",
      avatar: "https://picsum.photos/200",
      score: 10,
    },
    {
      id: 5,
      name: "John Doe",
      avatar: "https://picsum.photos/200",
      score: 10,
    },
  ];

  console.log(params.slug);

  return (
    <main className="flex flex-col gap-32 py-8">
      <div className="px-20 pt-16 gap-8 place-items-center grid grid-cols-3">
        <div className="w-full flex flex-col gap-2">
          <h1 className="text-4xl font-bold">{fetchedCategory.name}</h1>
          <p>{fetchedCategory.description}</p>
          <div className="flex gap-2">
            <Badge className="gap-1 items-center">
              <User size={12} />
              {fetchedCategory.author.name}
            </Badge>
            <Badge className="gap-1 items-center">
              <ThumbsUp size={12} />
              {fetchedCategory.likes}
            </Badge>
            <Badge className="gap-1 items-center">
              <Cake size={12} />
              {simplifiedDate}
            </Badge>
            <Badge className="gap-1 items-center">
              <Hash size={12} />
              {fetchedCategory.number_of_values} values
            </Badge>
          </div>
          <Image
            src={fetchedCategory.cover_image}
            width={600}
            height={400}
            className="w-[400px] rounded h-[200px]"
            alt={fetchedCategory.name}
          />
        </div>
        <div className="flex shadow-xl flex-col h-full text-white px-8 w-full py-8 rounded-lg justify-between items-center border border-slate-300 bg-gradient-to-b from-indigo-400 to-white">
          <h2 className="text-3xl text-center font-bold">Ready to play ?</h2>
          <Link
            className="bg-slate-900 rounded-xl"
            href={`/play/${fetchedCategory.slug}`}
          >
            <Button className={heroTextCss}>Play</Button>
          </Link>
        </div>
        <Leaderboard users={highscores} />
      </div>
    </main>
  );
}
