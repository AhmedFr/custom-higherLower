import { createSlice } from "@reduxjs/toolkit";
import { Category } from "@/types/Category";

export interface CategoryState {
  currentCategory: Category | null;
}

const initialState: CategoryState = {
  currentCategory: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
});

export default categorySlice.reducer;
