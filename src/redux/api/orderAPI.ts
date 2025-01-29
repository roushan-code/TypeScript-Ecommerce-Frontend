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
                };
            },
            invalidatesTags: ['orders'],
        }),
        updateOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
            query: ({userId, orderId}) => {
                return {
                    url: `${orderId}?id=${userId}`,
                    method: 'PUT',
                };
            },
            invalidatesTags: ['orders'],
        }),
        deleteOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
            query: ({userId, orderId}) => {
                return {
                    url: `${orderId}?id=${userId}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['orders'],
        }),
        allOrders: builder.query<AllOrdersResponse, string>({
            query: (id) => `all?id=${id}`,
            providesTags: ['orders'],
        }),
        myOrder: builder.query<AllOrdersResponse, string>({
            query: (id) => `my?id=${id}`,
            providesTags: ['orders'],
        }),
        OrderDetails: builder.query<OrederDetailsResponse, string>({
            query: (id) => id,
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