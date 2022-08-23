import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { Product } from "../types";
import { REACT_APP_BACKEND_URL, REACT_APP_TOKEN } from "@env";

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: REACT_APP_BACKEND_URL + '/api/products',
            prepareHeaders: (headers) => {
                const token = REACT_APP_TOKEN;
                headers.set('Authorization', `Bearer ${token}`);
                headers.set('Content-Type', `application/json`);
                return headers;
            }
        }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], string>({
            query: (query) => `/?populate=image&filters[title][$contains]=${query}`,
        }),
        getSingleProduct: builder.query({
            query: (id) => `/${id}?populate=image`
        })
    })
})

export const { useGetProductsQuery, useGetSingleProductQuery } = productsApi;