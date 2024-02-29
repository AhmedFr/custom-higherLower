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
import { useAppSelector } from "@/redux/hooks";
import { useToast } from "@/components/ui/use-toast";

export default function PlayPage({ params }: { params: { slug: string } }) {
  const [score, setScore] = useState(0);
  const [currentItem, setCurrentItem] = useState<Item>({
    id: "",
    name: "",
    image: "",
  });
  const [nextItemIndex, setNextItemIndex] = useState(0);
  const [hasLost, setHasLost] = useState(false);
  const user = useAppSelector((state) => state.user);
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
  const { toast } = useToast();

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

            if (!user.isLogged) {
              toast({
                title: "You need to be logged in to save your score",
                description: "Login or create an account to save your score",
              });
            }
            setScoreMutation({
              category_id: fetchedCategory?.id || "",
              score: score,
            })
              .unwrap()
              .then((payload) => {
                if (!payload.success) {
                  toast({
                    title: "An error occurred",
                    description: "Could not save your score",
                  });
                }
                toast({
                  title: "Score saved",
                  description: "Your score has been saved",
                });
              })
              .catch(() => {
                toast({
                  title: "Score not saved",
                  description: "Are you logged in? if so try again later",
                });
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
            })
              .unwrap()
              .then((payload) => {
                console.log({ payload });
                if (!payload.success) {
                  toast({
                    title: "An error occurred",
                    description: "Could not save your score",
                  });
                }
                toast({
                  title: "Score saved",
                  description: "Your score has been saved",
                });
              })
              .catch(() => {
                toast({
                  title: "Score not saved",
                  description: "Are you logged in? if so try again later",
                });
              });
          }
        });
    }
  }

  function handlePlayAgain() {
    setScore(0);
    setHasLost(false);
    refetch();
  }

  return (
    <main className="">
      {hasLost && (
        <div className="absolute top-20 bottom-0 right-0 left-0 z-10 text-white bg-black bg-opacity-80 flex flex-col pt-20 items-center gap-8">
          <h2 className="text-2xl lg:text-6xl font-bold">
            You lost! Your score was {score}
          </h2>
          <Button
            className="w-44 text-black"
            variant="outline"
            onClick={goToCategories}
          >
            Go back to categories
          </Button>
          <Button
            className="w-44 bg-lime-100 hover:bg-lime-200 text-black"
            variant="outline"
            onClick={handlePlayAgain}
          >
            Play again
          </Button>
        </div>
      )}
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
      <div className="px-10 py-4 flex justify-between lg:grid lg:grid-cols-3 bg-slate-900 text-white">
        <Link
          href={`/categories/${params.slug}`}
          className="text-2xl font-bold"
        >
          {isCategoryLoading && <Skeleton />}
          {fetchedCategory?.name}
        </Link>
        <h2 className="text-2xl place-self-center font-bold">Score: {score}</h2>
      </div>
      {areValuesLoading && <Skeleton className="h-96" />}
      {!areValuesLoading && data && (
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="relative items-center flex w-full h-[325px] lg:h-[800px] justify-center flex-col gap-8">
            <div className="absolute -z-10 top-0 left-0 right-0 bottom-0 w-full h-full bg-black bg-opacity-50">
              <Image
                src={currentItem.image}
                fill
                alt={currentItem.name}
                className="transition-opacity opacity-0 duration-[2s]"
                onLoadingComplete={(image) => {
                  image.classList.remove("opacity-0");
                }}
              />
            </div>
            <div className="absolute -z-10 top-0 left-0 right-0 bottom-0 w-full h-ful bg-black bg-opacity-50" />
            <h1 className="text-2xl lg:text-6xl font-bold text-white drop-shadow">
              {currentItem.name}
            </h1>
            <p className="text-xl font-bold text-white drop-shadow">has</p>
            <h1 className="text-2xl lg:text-6xl font-bold text-white drop-shadow">
              {currentItem.value}
            </h1>
            <p className="text-xl font-bold text-white drop-shadow">
              {fetchedCategory && fetchedCategory.metric}
            </p>
          </div>
          {!hasLost && (
            <div className="relative flex items-center justify-center w-full h-[320px] lg:h-[800px] flex-col gap-8">
              <div className="absolute -z-10 top-0 left-0 right-0 bottom-0 w-full h-ful">
                <Image
                  src={data.values[nextItemIndex].image}
                  fill
                  alt={data.values[nextItemIndex].name}
                  className="transition-opacity opacity-0 duration-[2s]"
                  onLoadingComplete={(image) => {
                    image.classList.remove("opacity-0");
                  }}
                />
              </div>
              <div className="absolute -z-10 top-0 left-0 right-0 bottom-0 w-full h-ful bg-black bg-opacity-50" />
              <h1 className="text-2xl lg:text-6xl font-bold text-white drop-shadow">
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
          )}
        </div>
      )}
    </main>
  );
}
