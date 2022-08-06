import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { Product } from "../types";
import { REACT_APP_BACKEND_URL } from "@env";

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: REACT_APP_BACKEND_URL + '/api/products',
            prepareHeaders: (headers) => {
                const token = 'e664caf28ff5f848107bc6398f325392902a1cfa9650d69e448258e15c05e37146ff5bcaf2383388799942ebf1b1e4283e39cc613448d369a6e019b0e00f61c6e31c4ce50bc45277ac482760b51945d027a869e8b08301b9f11d34a2b924a5225fd421d53f65430d13b28b123ffb0f5588939dcabd21b37f793e98036f018dfa';
                headers.set('Authorization', `Bearer ${token}`);
                headers.set('Content-Type', `application/json`);
                return headers;
            }
        }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/?populate=image',
        }),
        getSingleProduct: builder.query({
            query: (id) => `/${id}?populate=image`
        })
    })
})

export const { useGetProductsQuery, useGetSingleProductQuery } = productsApi;