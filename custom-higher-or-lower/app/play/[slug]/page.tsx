"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetcategoryValuesQuery,
  useGetCategoryQuery,
} from "@/redux/services/category";
import { useRouter } from "next/navigation";
import {
  usePlayMutation,
  useSetScoreMutation,
} from "@/redux/services/category";
import { useEffect } from "react";
import { Item } from "@/types/Item";

export default function PlayPage({ params }: { params: { slug: string } }) {
  const [score, setScore] = useState(0);
  const [currentItem, setCurrentItem] = useState<Item>({
    id: "",
    name: "",
    image: "",
  });
  const [nextItemIndex, setNextItemIndex] = useState(0);
  const [hasLost, setHasLost] = useState(false);
  const {
    data,
    isLoading: areValuesLoading,
    refetch,
  } = useGetcategoryValuesQuery({
    category_slug: params.slug,
  });
  const router = useRouter();
  const {
    data: fetchedCategory,
    isError,
    isLoading: isCategoryLoading,
  } = useGetCategoryQuery({ slug: params.slug });
  const [play] = usePlayMutation();
  const [setScoreMutation] = useSetScoreMutation();

  useEffect(() => {
    if (data) {
      setCurrentItem(data.initial_item);
    }
  }, [data]);

  const goToCategories = () => {
    router.push("/categories");
  };

  async function handleHigher() {
    if (data && currentItem) {
      await play({
        item_id: currentItem.id,
        next_item_id: data.values[nextItemIndex].id,
        guess: "higher",
      })
        .unwrap()
        .then((res) => {
          setCurrentItem(res.next_item);
          if (res.success) {
            setScore(score + 1);
            if (nextItemIndex == data.values.length - 1) {
              refetch();
              setNextItemIndex(0);
            } else {
              setNextItemIndex(nextItemIndex + 1);
            }
          } else {
            setHasLost(true);
            setScoreMutation({
              category_id: fetchedCategory?.id || "",
              score: score,
            });
          }
        });
    }
  }

  async function handleLower() {
    if (data && currentItem) {
      await play({
        item_id: currentItem.id,
        next_item_id: data.values[nextItemIndex].id,
        guess: "lower",
      })
        .unwrap()
        .then((res) => {
          setCurrentItem(res.next_item);
          if (res.success) {
            setScore(score + 1);
            if (nextItemIndex == data.values.length - 1) {
              refetch();
              setNextItemIndex(0);
            } else {
              setNextItemIndex(nextItemIndex + 1);
            }
          } else {
            setHasLost(true);
            setScoreMutation({
              category_id: fetchedCategory?.id || "",
              score: score,
            });
          }
        });
    }
  }

  return (
    <main className="">
      {hasLost && (
        <div className="flex flex-wrap justify-center items-center gap-4 min-h-screen">
          <h2 className="text-2xl font-bold">
            You lost! Your score was {score}
          </h2>
          <Button className="w-fit" onClick={goToCategories}>
            Go back to categories
          </Button>
        </div>
      )}
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
        {/* <h2 className="text-2xl place-self-end font-bold">
          Highscore:{" "}
          {isCategoryLoading && <Skeleton className="rounded-full w-2 h-2" />}{" "}
          {!isCategoryLoading && fetchedCategory && 0}
        </h2> */}
      </div>
      {areValuesLoading && <Skeleton className="h-96" />}
      {!areValuesLoading && data && (
        <div className="flex justify-between items-center">
          <div className="relative items-center flex w-full h-[800px] justify-center flex-col gap-8">
            <div className="absolute -z-10 top-0 left-0 right-0 bottom-0 w-full h-full bg-black bg-opacity-50">
              <Image src={currentItem.image} fill alt={currentItem.name} />
            </div>
            <div className="absolute -z-10 top-0 left-0 right-0 bottom-0 w-full h-ful bg-black bg-opacity-50" />
            <h1 className="text-6xl font-bold text-white drop-shadow">
              {currentItem.name}
            </h1>
            <p className="text-xl font-bold text-white drop-shadow">has</p>
            <h1 className="text-6xl font-bold text-white drop-shadow">
              {currentItem.value}
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
              <Button
                onClick={handleHigher}
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-400"
              >
                Higher
                <ArrowBigUp />
              </Button>
              <Button
                onClick={handleLower}
                size="lg"
                className="bg-red-400 hover:bg-red-300"
              >
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
