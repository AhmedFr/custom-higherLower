import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CategoryCard } from "@/components/ui/CategoryCard";

export type User = {
  id: number;
  name: string;
  avatar: string;
};

export type Category = {
  id: number;
  slug: string;
  name: string;
  description: string;
  created_at: string;
  likes: number;
  cover_image: string;
  author: User;
  metric: string;
  number_of_values: number;
};

const categories: Category[] = [
  {
    id: 1,
    name: "Books",
    description: "Books",
    created_at: "2021-10-10T18:25:43.511Z",
    likes: 10,
    cover_image: "https://picsum.photos/200",
    slug: "books",
    author: {
      id: 1,
      name: "John Doe",
      avatar: "https://picsum.photos/200",
    },
    metric: "popularity",
    number_of_values: 10,
  },
  {
    id: 2,
    name: "Movies",
    slug: "movies",
    description: "Movies",
    created_at: "2021-10-10T18:25:43.511Z",
    likes: 10,
    cover_image: "https://picsum.photos/200",
    author: {
      id: 1,
      name: "John Doe",
      avatar: "https://picsum.photos/200",
    },
    metric: "popularity",
    number_of_values: 10,
  },
  {
    id: 3,
    name: "Games",
    slug: "games",
    description: "Games",
    created_at: "2021-10-10T18:25:43.511Z",
    likes: 10,
    cover_image: "https://picsum.photos/200",
    author: {
      id: 1,
      name: "John Doe",
      avatar: "https://picsum.photos/200",
    },
    metric: "popularity",
    number_of_values: 10,
  },
  {
    id: 4,
    name: "Music",
    description: "Music",
    slug: "music",
    created_at: "2021-10-10T18:25:43.511Z",
    likes: 15,
    cover_image: "https://picsum.photos/200",
    author: {
      id: 2,
      name: "Jane Smith",
      avatar: "https://picsum.photos/200",
    },
    metric: "popularity",
    number_of_values: 12,
  },
  {
    id: 5,
    name: "Technology",
    description: "Technology",
    slug: "technology",
    created_at: "2021-10-10T18:25:43.511Z",
    likes: 8,
    cover_image: "https://picsum.photos/200",
    author: {
      id: 2,
      name: "Jane Smith",
      avatar: "https://picsum.photos/200",
    },
    metric: "innovation",
    number_of_values: 8,
  },
  {
    id: 6,
    name: "Travel",
    description: "Travel",
    slug: "travel",
    created_at: "2021-10-10T18:25:43.511Z",
    likes: 20,
    cover_image: "https://picsum.photos/200",
    author: {
      id: 3,
      name: "Bob Johnson",
      avatar: "https://picsum.photos/200",
    },
    metric: "adventure",
    number_of_values: 15,
  },
  {
    id: 7,
    name: "Food",
    description: "Food",
    slug: "food",
    created_at: "2021-10-10T18:25:43.511Z",
    likes: 12,
    cover_image: "https://picsum.photos/200",
    author: {
      id: 3,
      name: "Bob Johnson",
      avatar: "https://picsum.photos/200",
    },
    metric: "taste",
    number_of_values: 10,
  },
  {
    id: 8,
    name: "Fitness",
    slug: "fitness",
    description: "Fitness",
    created_at: "2021-10-10T18:25:43.511Z",
    likes: 18,
    cover_image: "https://picsum.photos/200",
    author: {
      id: 4,
      name: "Alice Williams",
      avatar: "https://picsum.photos/200",
    },
    metric: "health",
    number_of_values: 14,
  },
  {
    id: 9,
    name: "Art",
    description: "Art",
    slug: "art",
    created_at: "2021-10-10T18:25:43.511Z",
    likes: 25,
    cover_image: "https://picsum.photos/200",
    author: {
      id: 4,
      name: "Alice Williams",
      avatar: "https://picsum.photos/200",
    },
    metric: "creativity",
    number_of_values: 18,
  },
  {
    id: 10,
    name: "Sports",
    slug: "sports",
    description: "Sports",
    created_at: "2021-10-10T18:25:43.511Z",
    likes: 14,
    cover_image: "https://picsum.photos/200",
    author: {
      id: 5,
      name: "Charlie Davis",
      avatar: "https://picsum.photos/200",
    },
    metric: "athleticism",
    number_of_values: 11,
  },
];

export default function CategoriesPage() {
  return (
    <main className="flex flex-col gap-32">
      <div>
        <h1 className="drop-shadow-blue text-9xl font-bold text-center">
          Categories
        </h1>
      </div>

      <div className="flex flex-col gap-8 px-40">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Input placeholder="Search" />
            <Button type="submit">Search</Button>
          </div>
          <div className="flex gap-8">
            <ToggleGroup defaultValue="popularity" type="single">
              <ToggleGroupItem value="popularity">Popularity</ToggleGroupItem>
              <ToggleGroupItem value="date">Date</ToggleGroupItem>
            </ToggleGroup>
            <Separator orientation="vertical" />
            <ToggleGroup defaultValue="newest" type="single">
              <ToggleGroupItem value="newest">
                <ArrowUp />
              </ToggleGroupItem>
              <ToggleGroupItem value="oldest">
                <ArrowDown />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <div className="grid gap-2 grid-cols-4">
          {categories.map((category, i) => (
            <CategoryCard key={i} {...category} />
          ))}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <section className="flex justify-center pb-16">
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
    </main>
  );
}
