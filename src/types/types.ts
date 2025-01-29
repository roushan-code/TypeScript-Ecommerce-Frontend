export type User = {
    _id: string;
    name: string;
    email: string;
    gender: string;
    dob: string;
    photo: string;
    role: string;
}

export type Product = {
    _id: string;
    name: string;
    photo: {
        public_id: string;
        url: string;
      }[];
    price: number;
    stock: number;
    category: String;
}
export type ShippingInfo = {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
}
export type CartItems = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
}
export type OrderItems = Omit<CartItems, "stock"> & { _id: string };

export type Order = {
    orderItems: OrderItems[];
    shippingInfo: ShippingInfo;
    total: number;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    status: string;
    _id: string;
    user: {
        _id: string;
        name: string;
    }
}

type percentChange = {
    revenue: number;
    product: number;
    user: number;
    order: number;
}

type latestTransaction = {
    _id: unknown;
    quantity: number;
    discount: number;
    status: string;
    amount: any;
}

export type Stats = {
    categoryCount: Record<string, number>[],
    count: percentChange,
    percentChange: percentChange,
    chart: {
        order: number[],
        revenue: number[]
    },
    userRatio: {
        male: number;
        female: number;
    },
    latestTransaction: latestTransaction[]
}
export type Pie = {
    orderFullfillment: {
        processing: number;
        shipped: number;
        delivered: number;
    },
    productCategories: Record<string, number>[],
    stockAvailability: {
        inStock: number;
        outOfStock: number;
    },
    revenueDistribution: {
        netMargin: number;
        discount: number;
        productionCost: number;
        burnt: number;
        marketingCost: number;
    },
    adminCustomer: {
        admin: number;
        customer: number;
    },
    usersAgeGroup: {
        teen: number;
        adult: number;
        old: number;
    }
}
export type Bar = {
    products: number[];
    users: number[];
    orders: number[];
}
export type Line = {
    products: number[];
    users: number[];
    discount: number[];
    revenue: number[];
}