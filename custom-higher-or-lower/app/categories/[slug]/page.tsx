"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Leaderboard } from "@/components/ui/LeaderBoard";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { User, ThumbsUp, Cake, Hash } from "lucide-react";
import { useGetCategoryQuery } from "@/redux/services/category";
import { SkeletonCard } from "@/components/ui/skeletonCard";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { slug: string } }) {
  const {
    data: fetchedCategory,
    isLoading,
    isError,
  } = useGetCategoryQuery({
    slug: params.slug,
  });
  const router = useRouter();

  const heroTextCss =
    "w-48 lg:w-72 gap-2 h-16 bg-[length:200%_auto] italic px-2 font-extrabold bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] text-2xl text-transparent  bg-clip-text animate-gradient";

  const goToCategories = () => {
    router.push("/categories");
  };

  return (
    <main className="flex flex-col gap-32 py-8">
      {isLoading && <SkeletonCard />}
      {isError && (
        <div className="px-10 flex flex-wrap justify-center items-center gap-4 min-h-screen">
          <h2 className="text-2xl font-bold">
            Seems like this category does not exist (yet!)
          </h2>
          <Button className="w-fit" onClick={goToCategories}>
            Go back to categories
          </Button>
        </div>
      )}
      {!isLoading && fetchedCategory && (
        <div className="px-10 lg:px-20 pt-8 lg:pt-16 gap-8 place-items-center grid grid-cols-1 lg:grid-cols-3">
          <div className="w-full flex flex-col gap-2">
            <h1 className="text-4xl font-bold">{fetchedCategory.name}</h1>
            <p>{fetchedCategory.description}</p>
            <div className="flex flex-wrap lg:flex-none gap-2">
              <Badge className="gap-1 items-center">
                <User size={12} />
                {fetchedCategory.author.username}
              </Badge>
              <Badge className="gap-1 items-center">
                <ThumbsUp size={12} />
                {fetchedCategory.likes}
              </Badge>
              <Badge className="gap-1 items-center">
                <Cake size={12} />
                {new Date(fetchedCategory.createdAt).toLocaleDateString(
                  "en-UK",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}
              </Badge>
              <Badge className="gap-1 items-center">
                <Hash size={12} />
                {fetchedCategory.total_values} values
              </Badge>
            </div>
            <Image
              src={fetchedCategory.image}
              width={600}
              height={400}
              className="w-[400px] rounded h-[200px]"
              alt={fetchedCategory.name}
            />
          </div>
          <div className="flex shadow-xl flex-col gap-4 h-full text-white px-8 w-full py-8 rounded-lg justify-between items-center border border-slate-300 bg-gradient-to-b from-indigo-400 to-white">
            <h2 className="text-3xl text-center font-bold">Ready to play ?</h2>
            <Link
              className="bg-slate-900 rounded-xl"
              href={`/play/${params.slug}`}
            >
              <Button className={heroTextCss}>Play</Button>
            </Link>
          </div>
          <Leaderboard scores={fetchedCategory.highScores ?? []} />
        </div>
      )}
    </main>
  );
}
