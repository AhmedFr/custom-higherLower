import { Item } from "@/types/Item";
import { Score } from "@/types/Score";

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  metric: string;
  author_id: number;
  default_image_provider: string;
  total_values?: number;
  highScores?: Score[];
  author: {
    username: string;
    image: string;
  };
};

export type GetCategoriesRequest = {
  limit?: number;
  page?: number;
  search?: string;
  sort?: "createdAt" | "likes";
  order?: "ASC" | "DESC";
};

export type GetCategoriesResponse = {
  total: number;
  page: number;
  limit: number;
  categories: Category[];
};

export type GetCategoryRequest = {
  slug: string;
};

export type GetCategoryValuesRequest = {
  category_slug: string;
};

export type GetCategoryValuesResponse = {
  total: number;
  page: number;
  initial_item: Item;
  values: Item[];
};

export type GetCategoryResponse = Category;
