"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { useGetCategoriesQuery } from "@/redux/services/category";
import { useCallback, useState } from "react";
import { SkeletonCard } from "@/components/ui/skeletonCard";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import { usePathname, useSearchParams } from "next/navigation";

const SORT_OPTIONS = ["createdAt"];
const ORDER_OPTIONS = ["ASC", "DESC"];
const CATEGORIES_PER_PAGE = 12;

const formSchema = z.object({
  search: z.string(),
  sort: z.enum(["createdAt"]),
  order: z.enum(["ASC", "DESC"]),
});

export default function CategoriesPage() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sort, setSort] = useState<"createdAt">("createdAt");
  const [order, setOrder] = useState<"ASC" | "DESC">("DESC");
  const pathname = usePathname();

  const urlSort = searchParams.get("sort");
  const urlOrder = searchParams.get("order");
  if (urlSort && SORT_OPTIONS.includes(urlSort)) {
    setSort(urlSort as "createdAt");
  }
  if (urlOrder && ORDER_OPTIONS.includes(urlOrder)) {
    setOrder(urlOrder as "ASC" | "DESC");
  }

  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: search,
      sort: sort,
      order: order,
    },
  });

  const { data, isLoading, refetch } = useGetCategoriesQuery({
    search,
    sort,
    order,
    page,
  });

  function handleSearch(values: z.infer<typeof formSchema>) {
    setSearch(values.search);
    refetch();
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <main className="flex flex-col gap-32">
      <div>
        <h1 className="drop-shadow-blue text-9xl font-bold text-center">
          Categories
        </h1>
      </div>

      <div className="flex flex-col gap-8 px-40">
        <Form {...form}>
          <form
            className="flex justify-between"
            onSubmit={form.handleSubmit(handleSearch)}
          >
            <div className="flex gap-2">
              <FormField
                name="search"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} placeholder="Search" />
                )}
              />
              <Button type="submit">Search</Button>
            </div>
            <div className="flex gap-8">
              <FormField
                name="sort"
                control={form.control}
                render={() => (
                  <ToggleGroup value={sort} type="single">
                    <ToggleGroupItem
                      onClick={() => {
                        setSort("createdAt");
                      }}
                      value="createdAt"
                    >
                      Date
                    </ToggleGroupItem>
                  </ToggleGroup>
                )}
              />
              <Separator orientation="vertical" />
              <FormField
                name="order"
                control={form.control}
                render={({ field }) => (
                  <ToggleGroup value={order} type="single">
                    <ToggleGroupItem
                      onClick={() => {
                        setOrder("ASC");
                      }}
                      value="ASC"
                    >
                      <ArrowUp />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      onClick={() => {
                        setOrder("DESC");
                      }}
                      value="DESC"
                    >
                      <ArrowDown />
                    </ToggleGroupItem>
                  </ToggleGroup>
                )}
              />
            </div>
          </form>
        </Form>
        <div className="grid gap-2 grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }, (_, i) => <SkeletonCard key={i} />)
            : data?.categories.map((category) => (
                <CategoryCard key={category.id} {...category} />
              ))}
          {!isLoading && data?.categories.length === 0 && (
            <div className="h-80 text-center text-2xl font-bold col-span-4">
              No categories found
            </div>
          )}
        </div>
        <Pagination>
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href={`${pathname}?${createQueryString("page", (page - 1).toString())}`}
                />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink>{page}</PaginationLink>
            </PaginationItem>
            {!isLoading && data?.categories.length === CATEGORIES_PER_PAGE && (
              <PaginationItem>
                <PaginationNext
                  href={`${pathname}?${createQueryString("page", (page + 1).toString())}`}
                />
              </PaginationItem>
            )}
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
