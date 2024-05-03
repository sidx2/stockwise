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
    vendors: any[];
    numberOfAssets: number
}




