import { Vendor } from "../../vendors-module/store/vendor.reducers";

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