import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllProductResponse, CategoriesResponse, DeleteProductRequest, MessageResponse, NewPorductRequest, ProductResponse, SearchProductsRequest, SearchProductsResponse, UpdateProductRequest } from "../../types/api-types";

export const productAPI = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/` }),
    tagTypes: ["product"],
    endpoints: (builder) => ({
        latestProducts: builder.query<AllProductResponse, string>({
            query: () => ({url: "latestProducts", credentials: "include"}),
            providesTags: ["product"]
        }),
        allProducts: builder.query<AllProductResponse, string>({
            query: (id) => ({url: `admin/products?id=${id}`, credentials: "include"}),
            providesTags: ["product"]
        }),
        categories: builder.query<CategoriesResponse, string>({
            query: () => ({url: `categories`, credentials: "include"}),
            providesTags: ["product"]
        }),
        searchProducts: builder.query<SearchProductsResponse, SearchProductsRequest>({
            query: ({ price, search, sort, category, page }) => {
                let base = `all?search=${search}&page=${page}`

                if (price) base += `&price=${price}`;
                if (sort) base += `&sort=${sort}`;
                if (category) base += `&category=${category}`;
                return ({url: base, credentials: "include"});
            },
            providesTags: ["product"]
        }),
        productDetails: builder.query<ProductResponse, string>({
            query: (id) => ({url: id, credentials: "include"}),
            providesTags: ["product"]
        }),
        newProduct: builder.mutation<MessageResponse, NewPorductRequest>({
            query: ({formData, id}) => ({
                url: `newProduct?id=${id}`,
                method: "POST",
                body: formData,
                credentials: "include"
            }),
            invalidatesTags: ["product"]
        }),
        updateProduct: builder.mutation<MessageResponse, UpdateProductRequest>({
            query: ({formData, userId, productId}) => ({
                url: `${productId}?id=${userId}`,
                method: "PUT",
                body: formData,
                credentials: "include"
            }),
            invalidatesTags: ["product"]
        }),
        deleteProduct: builder.mutation<MessageResponse, DeleteProductRequest>({
            query: ({ userId, productId}) => ({
                url: `${productId}?id=${userId}`,
                method: "DELETE",
                credentials: "include"
            }),
            invalidatesTags: ["product"]
        }),
    }),
});

export const {
    useLatestProductsQuery,
    useAllProductsQuery,
    useCategoriesQuery,
    useSearchProductsQuery,
    useNewProductMutation,
    useProductDetailsQuery,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productAPI;