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
        productsFilteredByCategory: [],
        productsFilteredBySubCategory: [],
        productSelected: {}
    },
    reducers:{
        selectCategory: (state, action) => {
            state.categorySelected = action.payload
        },
        selectSubCategory: (state, action) => {
            state.subCategorySelected = action.payload
        },
        filterProductsByCategory: (state) => {
            state.productsFilteredByCategory = state.products.filter(product => product.category.toLowerCase() === state.categorySelected.toLowerCase())
        },
        filterProductsBySubCategory: (state) => {
            state.productsFilteredBySubCategory = state.products.filter(product => product.subCategory.toLowerCase() === state.subCategorySelected.toLowerCase())
        },
        selectProduct: (state, action) => {
            state.productSelected = action.payload
        }
    }
})

export const {selectCategory, selectSubCategory, filterProductsByCategory, filterProductsBySubCategory, selectProduct} = shopSlice.actions

export default shopSlice.reducer