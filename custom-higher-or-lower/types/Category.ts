import { Item } from "@/types/Item";
import { Score } from "@/types/Score";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  metric: string;
  author_id: number;
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

export type UserItem = {
  name: string;
  value: number;
};

export type CreateCategoryRequest = {
  name: string;
  description: string;
  image: string;
  metric: string;
  values: UserItem[];
};

export type CreateCategoryResponse = {
  success: boolean;
  category: Category;
};

export type PlayRequest = {
  item_id: string;
  next_item_id: string;
  guess: "higher" | "lower";
};

export type PlayResponse = {
  success: boolean;
  next_item: Item;
};

export type SetScoreRequest = {
  category_id: string;
  score: number;
};

export type SetScoreResponse = {
  success: boolean;
};
