import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllOrdersResponse, MessageResponse, NewOrderRequest, OrederDetailsResponse, UpdateOrderRequest } from "../../types/api-types";

export const orderAPI = createApi({
    reducerPath: 'orderAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/` }),
    tagTypes: ['orders'],
    endpoints: (builder) => ({
        newOrder: builder.mutation<MessageResponse, NewOrderRequest>({
            query: (order) => {
                return {
                    url: 'new',
                    method: 'POST',
                    body: order,
                    credentials: 'include',
                };
            },
            invalidatesTags: ['orders'],
        }),
        updateOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
            query: ({userId, orderId}) => {
                return {
                    url: `${orderId}?id=${userId}`,
                    method: 'PUT',
                    credentials: 'include',
                };
            },
            invalidatesTags: ['orders'],
        }),
        deleteOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
            query: ({userId, orderId}) => {
                return {
                    url: `${orderId}?id=${userId}`,
                    method: 'DELETE',
                    credentials: 'include',
                };
            },
            invalidatesTags: ['orders'],
        }),
        allOrders: builder.query<AllOrdersResponse, string>({
            query: (id) => ({url: `all?id=${id}`, credentials: 'include'}),
            providesTags: ['orders'],
        }),
        myOrder: builder.query<AllOrdersResponse, string>({
            query: (id) => ({url: `my?id=${id}`, credentials: 'include'}),
            providesTags: ['orders'],
        }),
        OrderDetails: builder.query<OrederDetailsResponse, string>({
            query: (id) => ({url: id, credentials: 'include'}),
            providesTags: ['orders'],
        }),
    }),
});

export const { 
    useNewOrderMutation, 
    useAllOrdersQuery,
    useMyOrderQuery,
    useOrderDetailsQuery,
    useUpdateOrderMutation,
    useDeleteOrderMutation

 } = orderAPI;