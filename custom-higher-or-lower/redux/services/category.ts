import { api } from "@/redux/services/api";
import {
  GetCategoriesRequest,
  GetCategoriesResponse,
  GetCategoryRequest,
  GetCategoryResponse,
  GetCategoryValuesRequest,
  GetCategoryValuesResponse,
} from "@/types/Category";

export const categoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<GetCategoriesResponse, GetCategoriesRequest>({
      query: (params) => ({
        url: "/categories",
        method: "GET",
        params,
      }),
    }),
    getCategory: build.query<GetCategoryResponse, GetCategoryRequest>({
      query: ({ slug }) => ({
        url: `/category?slug=${slug}`,
        method: "GET",
      }),
    }),
    getcategoryValues: build.query<
      GetCategoryValuesResponse,
      GetCategoryValuesRequest
    >({
      query: ({ category_slug }) => ({
        url: `/values?category_slug=${category_slug}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetcategoryValuesQuery,
} = categoryApi;
