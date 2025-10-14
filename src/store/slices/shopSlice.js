import { createSlice } from "@reduxjs/toolkit";
import categories from "../../data/categories.json"
import products from "../../data/products.json"

const shopSlice = createSlice({
    name: "shop",
    initialState:{
        categories,
        products,
        categorySelected: "",
        subCategorySelected: "",
        productSelected: {}
    },
    reducers:{
        selectCategory: (state, action) => {
            state.categorySelected = action.payload
        },
        selectSubCategory: (state, action) => {
            state.subCategorySelected = action.payload
        },
        selectProduct: (state, action) => {
            state.productSelected = action.payload
        }
    }
})

export const {selectCategory, selectSubCategory, selectProduct} = shopSlice.actions

export default shopSlice.reducer