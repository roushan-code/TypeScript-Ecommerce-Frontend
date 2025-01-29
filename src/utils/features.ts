import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types";
import { SerializedError } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";

type ResType = {
    data: MessageResponse;
} | {
    error: FetchBaseQueryError | SerializedError;
};

export const responseToast = (res: ResType,
    navigate: NavigateFunction | null,
    url: string
) => {
    if ("data" in res) {
        toast.success(res.data.message);
        navigate && navigate(url);
    }else{
        const error = res.error as FetchBaseQueryError;
        toast.error((error.data as MessageResponse).message);
    }

}

export const getLastMonths = () => {
    const currentDate = moment();

    currentDate.date(1);

    const last6Month: string[] = [];
    const last12Month: string[] = [];

    for (let i = 0; i < 6; i++) {
        const monthDate = currentDate.clone().subtract(i, 'months')
        last6Month.unshift(monthDate.format('MMM'));
    }
    for (let i = 0; i < 12; i++) {
        const monthDate = currentDate.clone().subtract(i, 'months')
        last12Month.unshift(monthDate.format('MMM'));
    }

    return { last6Month, last12Month };

}