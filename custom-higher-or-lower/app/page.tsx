import {
  ArrowBigDown,
  ArrowBigUp,
  Baby,
  Book,
  Building,
  Cake,
  Car,
  Dribbble,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const heroTextCss =
    "bg-[length:200%_auto] italic px-2 font-extrabold bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] text-9xl text-transparent  bg-clip-text animate-gradient";

  return (
    <div className="px-10 flex flex-col gap-16">
      <section className="grid grid-cols-2 py-24">
        <div className="self-center">
          <span className={heroTextCss}>Custom </span>
          <h1 className="pl-5 italic text-6xl font-bold">
            Higher or Lower game
          </h1>
          <p className="pt-10 text-2xl pl-5">
            Play Higher or Lower with your own custom categories!
          </p>
        </div>
        <div>
          <div className="relative w-full overflow-hidden">
            <div className="pointer-events-none absolute -top-1 z-10 h-20 w-full bg-gradient-to-b from-white to-transparent" />
            <div className="pointer-events-none absolute -left-1 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute -right-1 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent" />
            <div className="mx-auto grid h-[200px] w-[300px] animate-skew-scroll-bottom-to-top grid-cols-6 gap-1 sm:w-[600px]">
              {Array.from({ length: 50 }).map((_, i) => (
                <ArrowBigUp
                  key={i}
                  className="text-emerald-400 animate-top-to-bottom w-20 h-20 transition-all hover:scale-[1.025]"
                />
              ))}
            </div>
          </div>
          <div className="relative w-full overflow-hidden">
            <div className="pointer-events-none absolute -bottom-1 z-10 h-20 w-full bg-gradient-to-t from-white to-transparent" />
            <div className="pointer-events-none absolute -left-1 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute -right-1 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent" />
            <div className="mx-auto  grid h-[200px] w-[300px] animate-skew-scroll-top-to-bottom grid-cols-6 gap-1 sm:w-[600px]">
              {Array.from({ length: 50 }).map((_, i) => (
                <ArrowBigDown
                  key={i}
                  className="text-red-400 animate-bottom-to-top w-20 h-20 transition-all hover:scale-[1.025]"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-8 items-center">
        <h1 className="text-center text-6xl font-bold">
          Find your dream category
        </h1>
        <div className="w-full inline-flex flex-nowrap [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] [mask-left:_linear-gradient(to_left,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] overflow-hidden">
          <ul className="px-4 animate-infinite-scroll-r-to-l flex w-full items-center justify-center gap-8">
            {Array.from({ length: 2 }).map((_, i) => (
              <>
                <li>
                  <Dribbble className="w-20 h-20" />
                </li>
                <li>
                  <Cake className="w-20 h-20" />
                </li>
                <li>
                  <Baby className="w-20 h-20" />
                </li>
                <li>
                  <Book className="w-20 h-20" />
                </li>
                <li>
                  <Car className="w-20 h-20" />
                </li>
                <li>
                  <Building className="w-20 h-20" />
                </li>
              </>
            ))}
          </ul>
          <ul
            aria-hidden={true}
            className="px-4 animate-infinite-scroll-r-to-l flex w-full items-center justify-center gap-8"
          >
            {Array.from({ length: 2 }).map((_, i) => (
              <>
                <li>
                  <Dribbble className="w-20 h-20" />
                </li>
                <li>
                  <Cake className="w-20 h-20" />
                </li>
                <li>
                  <Baby className="w-20 h-20" />
                </li>
                <li>
                  <Book className="w-20 h-20" />
                </li>
                <li>
                  <Car className="w-20 h-20" />
                </li>
                <li>
                  <Building className="w-20 h-20" />
                </li>
              </>
            ))}
          </ul>
        </div>
        <div className="w-full inline-flex flex-nowrap [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] [mask-left:_linear-gradient(to_left,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] overflow-hidden">
          <ul className="px-4 animate-infinite-scroll-l-to-r flex w-full items-center justify-center gap-8">
            {Array.from({ length: 2 }).map((_, i) => (
              <>
                <li>
                  <Dribbble className="w-20 h-20" />
                </li>
                <li>
                  <Cake className="w-20 h-20" />
                </li>
                <li>
                  <Baby className="w-20 h-20" />
                </li>
                <li>
                  <Book className="w-20 h-20" />
                </li>
                <li>
                  <Car className="w-20 h-20" />
                </li>
                <li>
                  <Building className="w-20 h-20" />
                </li>
              </>
            ))}
          </ul>
          <ul
            aria-hidden={true}
            className="px-4 animate-infinite-scroll-l-to-r flex w-full items-center justify-center gap-8"
          >
            {Array.from({ length: 2 }).map((_, i) => (
              <>
                <li>
                  <Dribbble className="w-20 h-20" />
                </li>
                <li>
                  <Cake className="w-20 h-20" />
                </li>
                <li>
                  <Baby className="w-20 h-20" />
                </li>
                <li>
                  <Book className="w-20 h-20" />
                </li>
                <li>
                  <Car className="w-20 h-20" />
                </li>
                <li>
                  <Building className="w-20 h-20" />
                </li>
              </>
            ))}
          </ul>
        </div>
        <Button className="w-fit">
          <Link href="/categories">Browse all categories</Link>
        </Button>
      </section>

      <section className="flex justify-center">
        <div className="bg-gradient-to-r items-center from-blue-600 to-white rounded-2xl w-2/3 border flex justify-between wfull px-20 shadow-xl py-10 border-slate-200">
          <div>
            <h1 className="text-white text-xl font-bold">
              Did not found a category you like ?
            </h1>
            <h1 className="text-white text-xl font-bold">Create your own !</h1>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-500" size="lg">
            <Link href="/maker">Create</Link>
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-12 py-24">
        <h1 className="text-center text-6xl font-bold">How to play ?</h1>
        <div className="px-20 w-full grid grid-cols-3 gap-4">
          <div className="border h-60 p-4 rounded-lg border-slate-300 shadow-lg">
            <h1 className="pb-1 text-2xl font-bold">1 - Find a category</h1>
            <p>
              Find a category you like or want to discover. Each category has a
              description and the values metric.
            </p>
          </div>
          <div className="border h-60 p-4 rounded-lg border-slate-300 shadow-lg">
            <h1 className="pb-1 text-2xl font-bold">2 - Goal</h1>
            <p>
              Your goal will be to compare the value of the item on the left
              with the one on the right. And get the longest streak of right
              answers.
            </p>
          </div>
          <div className="border h-60 p-4 rounded-lg border-slate-300 shadow-lg">
            <h1 className="pb-1 text-2xl font-bold">3 - How ?</h1>
            <p>
              If you think the value of the item on the right is higher, click
              on the arrow pointing up. If you think the value of the item on
              the right is lower, click on the arrow pointing down.
            </p>
          </div>
          <div className="border h-60 p-4 rounded-lg border-slate-300 shadow-lg">
            <h1 className="pb-1 text-2xl font-bold">4 - Score</h1>
            <p>
              Every good answer is a point, get the longest streak and rank
              first !
            </p>
          </div>
          <div className="flex justify-between bg-gradient-to-r items-center h-60 from-emerald-600 col-span-2 text-white to-white border px-12 py-4 rounded-lg border-slate-300 shadow-lg">
            <h1 className="text-2xl font-bold ">
              Now that you know everything,
              <br /> have fun !
            </h1>
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500">
              <Link href="/categories">Play</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
