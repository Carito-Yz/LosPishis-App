import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rtdbBaseUrl = process.env.EXPO_PUBLIC_BASE_URL_RTDB

export const shopApi = createApi({
    reducerPath: "shopApi",
    //BaseQuery para hacer fetch a la base y obtener los datos
    baseQuery: fetchBaseQuery({baseUrl: rtdbBaseUrl}),
    //Funciones que vamos a usar en la app
    endpoints: (builder) => ({
        getCategories: builder.query({query: () => 'categories.json'}),
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy=%22category%22&equalTo=%22${category}%22`,
            transformResponse: (response) => response ? Object.values(response) : []
        }),
    })
})

export const { useGetCategoriesQuery, useGetProductsByCategoryQuery } = shopApi