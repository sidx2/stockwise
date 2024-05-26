import { CartItem } from "../../order-history-module/models/order-history";
import { Vendor } from "../../vendors-module/models/vendor";

export interface IOrderState {
    productVendors: Product[],
    isLoading: boolean,
}

export interface Product {
    _id: string,
    item: {
        _id: string,
        name: string,
        categoryId: string
    },
    vendors: Vendor[],
}

export interface OrderForm {
    product: string,
    vendor: {
        _id: string,
        name: string
    },
    quantity: number,
}

export interface IPlaceOrder {
    org: { _id: string },
    admin: {
        _id: string,
        name: string
    },
    cart: CartItem[],
}