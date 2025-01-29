import { Bar, CartItems, Line, Order, Pie, Product, ShippingInfo, Stats, User } from "./types";


export type CustomError = {
    status: number;
    data: {
        message: string;
        sucess: boolean;
    }
};
export type MessageResponse = {
    success: boolean;
    message: string;
};
export type AllUsersResponse ={
    success: boolean;
    users: User[];
}
export type UserResponse = {
    success: boolean;
    user: User;
};
export type AllProductResponse = {
    success: boolean;
    products: Product[];
};
export type ProductResponse = {
    success: boolean;
    product: Product;
};
export type AllOrdersResponse = {
    success: boolean;
    orders: Order[];
}
export type OrederDetailsResponse = {
    success: boolean;
    order: Order;
}
export type CategoriesResponse = {
    success: boolean;
    categories: string[];
};

export type SearchProductsResponse = AllProductResponse & {
    totalPage: number;
};

export type StatsResponse = {
    success: boolean;
    stats: Stats;
};
export type PieResponse = {
    success: boolean;
    charts: Pie;
};
export type BarResponse = {
    success: boolean;
    charts: Bar;
};
export type LineResponse = {
    success: boolean;
    charts: Line;
};

export type SearchProductsRequest = {
    price: number;
    category: string;
    search: string;
    sort: string;
    page: number;
};

export type NewPorductRequest = {
    id: string;
    formData: FormData;
};
export type UpdateProductRequest = {
    userId: string;
    productId: string;
    formData: FormData;
};
export type DeleteProductRequest = {
    userId: string;
    productId: string;
};
export type NewOrderRequest = {
    orderItems: CartItems[];
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    shippingInfo: ShippingInfo;
    user: string;
};
export type UpdateOrderRequest = {
    orderId: string;
    userId: string;
};

export type DeleteUserRequest = {
    userId: string;
    adminUserId: string;
}

