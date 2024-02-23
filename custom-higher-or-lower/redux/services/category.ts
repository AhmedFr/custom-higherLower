import { api } from "@/redux/services/api";
import {
  CreateCategoryRequest,
  CreateCategoryResponse,
  GetCategoriesRequest,
  GetCategoriesResponse,
  GetCategoryRequest,
  GetCategoryResponse,
  GetCategoryValuesRequest,
  GetCategoryValuesResponse,
  PlayRequest,
  PlayResponse,
  SetScoreRequest,
  SetScoreResponse,
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
      forceRefetch: () => true,
    }),
    createCategory: build.mutation<
      CreateCategoryResponse,
      CreateCategoryRequest
    >({
      query: (body) => ({
        url: "/category",
        method: "POST",
        body,
      }),
    }),
    play: build.mutation<PlayResponse, PlayRequest>({
      query: (body) => ({
        url: "/play",
        method: "POST",
        body,
      }),
    }),
    setScore: build.mutation<SetScoreResponse, SetScoreRequest>({
      query: (body) => ({
        url: "/score",
        method: "POST",
        invalidatesTags: ["category"],
        body,
      }),
    }),
    like: build.mutation<SetScoreResponse, { category_id: string }>({
      query: (body) => ({
        url: "/like",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetcategoryValuesQuery,
  useCreateCategoryMutation,
  usePlayMutation,
  useSetScoreMutation,
  useLikeMutation,
} = categoryApi;
