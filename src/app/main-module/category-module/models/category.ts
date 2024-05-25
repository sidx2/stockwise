import { Vendor } from "../../vendors-module/store/vendor.reducers";

export interface CustomField {
    label: string;
    type: string;
    required: boolean;
}

export interface Category {
    _id: string;
    name: string;
    identificationType: "unique" | "non-unique";
    orgId: string;
    customFields: CustomField[]
    vendors: Vendor[];
    numberOfAssets: number
}

export interface CategoryState {
    categories: Category[]
    loading: boolean
}


