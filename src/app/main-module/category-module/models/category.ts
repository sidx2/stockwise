export interface CustomField {
    label: string;
    type: string;
    required: boolean;
}

export interface Category {
    _id: string;
    name: string;
    identificationType: "Single" | "Mass";
    orgId?: string;
    customFields: CustomField[]
    vendors: string[];
    numberOfAssets: number
}

export interface CategoryState {
    categories: Category[]
    loading: boolean,
    errorMessage: string
}


