"use client";
import { Category } from "@/app/categories/page";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import Link from "next/link";

type Item = {
  id: number;
  name: string;
  value: number;
  image: string;
};

export default function PlayPage({ params }: { params: { slug: string } }) {
  const [score, setScore] = useState(0);
  const fetchedCategory: Category = {
    id: 1,
    name: "Books",
    description: "Find which book has the most sales",
    created_at: "2021-10-10T18:25:43.511Z",
    likes: 10,
    cover_image: "https://picsum.photos/500",
    slug: "books",
    author: {
      id: 1,
      name: "John Doe",
      avatar: "https://picsum.photos/200",
    },
    metric: "sales",
    number_of_values: 10,
  };

  const previousItem: Item = {
    id: 1,
    name: "Harry Potter",
    value: 10,
    image: "https://picsum.photos/500",
  };
  const nextItem: Item = {
    id: 1,
    name: "Titanic",
    value: 12,
    image: "https://picsum.photos/600",
  };

  return (
    <main className="">
      <div className="px-10 py-4 grid grid-cols-3 bg-slate-900 text-white">
        <Link
          href={`/categories/${fetchedCategory.slug}`}
          className="text-2xl font-bold"
        >
          {fetchedCategory.name}
        </Link>
        <h2 className="text-2xl place-self-center font-bold">Score: {score}</h2>
        <h2 className="text-2xl place-self-end font-bold">Highscore: {53}</h2>
      </div>
      <div className="flex justify-between items-center">
        <div className="relative items-center flex w-full h-[800px] justify-center flex-col gap-8">
          <div className="absolute -z-10 top-0 left-0 right-0 bottom-0 w-full h-full bg-black bg-opacity-50">
            <Image src={previousItem.image} fill alt={previousItem.name} />
          </div>
          <div className="absolute -z-10 top-0 left-0 right-0 bottom-0 w-full h-ful bg-black bg-opacity-50" />
          <h1 className="text-6xl font-bold text-white drop-shadow">
            {previousItem.name}
          </h1>
          <p className="text-xl font-bold text-white drop-shadow">has</p>
          <h1 className="text-6xl font-bold text-white drop-shadow">
            {previousItem.value}
          </h1>
          <p className="text-xl font-bold text-white drop-shadow">
            {fetchedCategory.metric}
          </p>
        </div>
        <div className="relative flex items-center justify-center w-full h-[800px] flex-col gap-8">
          <div className="absolute -z-10 top-0 left-0 right-0 bottom-0 w-full h-ful">
            <Image src={nextItem.image} fill alt={nextItem.name} />
          </div>
          <div className="absolute -z-10 top-0 left-0 right-0 bottom-0 w-full h-ful bg-black bg-opacity-50" />
          <h1 className="text-6xl font-bold text-white drop-shadow">
            {nextItem.name}
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
            {fetchedCategory.metric}
          </p>
        </div>
      </div>
    </main>
  );
}
