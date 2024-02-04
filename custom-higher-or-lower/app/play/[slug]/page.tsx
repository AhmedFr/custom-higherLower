"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import Link from "next/link";
import { Item } from "@/types/Item";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetcategoryValuesQuery,
  useGetCategoryQuery,
} from "@/redux/services/category";
import { useRouter } from "next/navigation";

export default function PlayPage({ params }: { params: { slug: string } }) {
  const [score, setScore] = useState(0);
  const [nextItemIndex, setNextItemIndex] = useState(0);
  const { data, isLoading: areValuesLoading } = useGetcategoryValuesQuery({
    category_slug: params.slug,
  });
  const router = useRouter();
  const {
    data: fetchedCategory,
    isError,
    isLoading: isCategoryLoading,
  } = useGetCategoryQuery({ slug: params.slug });

  const goToCategories = () => {
    router.push("/categories");
  };

  return (
    <main className="">
      {isError && (
        <div className="flex flex-wrap justify-center items-center gap-4 min-h-screen">
          <h2 className="text-2xl font-bold">
            Seems like this category does not exist (yet!)
          </h2>
          <Button className="w-fit" onClick={goToCategories}>
            Go back to categories
          </Button>
        </div>
      )}
      <div className="px-10 py-4 grid grid-cols-3 bg-slate-900 text-white">
        <Link
          href={`/categories/${params.slug}`}
          className="text-2xl font-bold"
        >
          {isCategoryLoading && <Skeleton />}
          {fetchedCategory?.name}
        </Link>
        <h2 className="text-2xl place-self-center font-bold">Score: {score}</h2>
        <h2 className="text-2xl place-self-end font-bold">
          Highscore:{" "}
          {isCategoryLoading && <Skeleton className="rounded-full w-2 h-2" />}{" "}
          {!isCategoryLoading && fetchedCategory && 0}
        </h2>
      </div>
      {areValuesLoading && <Skeleton className="h-96" />}
      {!areValuesLoading && data && (
        <div className="flex justify-between items-center">
          <div className="relative items-center flex w-full h-[800px] justify-center flex-col gap-8">
            <div className="absolute -z-10 top-0 left-0 right-0 bottom-0 w-full h-full bg-black bg-opacity-50">
              <Image
                src={data.initial_item.image}
                fill
                alt={data.initial_item.name}
              />
            </div>
            <div className="absolute -z-10 top-0 left-0 right-0 bottom-0 w-full h-ful bg-black bg-opacity-50" />
            <h1 className="text-6xl font-bold text-white drop-shadow">
              {data.initial_item.name}
            </h1>
            <p className="text-xl font-bold text-white drop-shadow">has</p>
            <h1 className="text-6xl font-bold text-white drop-shadow">
              {data.initial_item.value}
            </h1>
            <p className="text-xl font-bold text-white drop-shadow">
              {fetchedCategory && fetchedCategory.metric}
            </p>
          </div>
          <div className="relative flex items-center justify-center w-full h-[800px] flex-col gap-8">
            <div className="absolute -z-10 top-0 left-0 right-0 bottom-0 w-full h-ful">
              <Image
                src={data.values[nextItemIndex].image}
                fill
                alt={data.values[nextItemIndex].name}
              />
            </div>
            <div className="absolute -z-10 top-0 left-0 right-0 bottom-0 w-full h-ful bg-black bg-opacity-50" />
            <h1 className="text-6xl font-bold text-white drop-shadow">
              {data.values[nextItemIndex].name}
            </h1>
            <p className="text-xl font-bold text-white drop-shadow">has</p>
            <div className="flex flex-col gap-2">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400">
                Higher
                <ArrowBigUp />
              </Button>
              <Button size="lg" className="bg-red-400 hover:bg-red-300">
                Lower
                <ArrowBigDown />
              </Button>
            </div>
            <p className="text-xl font-bold text-white drop-shadow">
              {fetchedCategory && fetchedCategory.metric}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
