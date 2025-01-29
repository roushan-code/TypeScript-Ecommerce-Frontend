import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BarResponse, LineResponse, PieResponse, StatsResponse } from "../../types/api-types";

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/dashboard/` }),
    endpoints: (builder) => ({
        stats: builder.query<StatsResponse,string>({
            query: (id) => ({url: `stats?id=${id}`, credentials: 'include'}),
            keepUnusedDataFor: 0
        }),
        pie: builder.query<PieResponse,string>({
            query: (id) => ({url: `pie?id=${id}`, credentials: 'include'}),
            keepUnusedDataFor: 0
        }),
        bar: builder.query<BarResponse,string>({
            query: (id) => ({url: `bar?id=${id}`, credentials: 'include'}),
            keepUnusedDataFor: 0
        }),
        line: builder.query<LineResponse,string>({
            query: (id) => ({url: `line?id=${id}`, credentials: 'include'}),
            keepUnusedDataFor: 0
        }),

    })
});

export const { useStatsQuery, usePieQuery, useBarQuery, useLineQuery } = dashboardApi;