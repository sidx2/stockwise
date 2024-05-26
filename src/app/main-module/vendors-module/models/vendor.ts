export interface Vendor {
    _id: string
    name: string,
    address: string,
    email: string,
    phone: string,
    orgId: string
}

export interface IVendorsState {
    vendors: Vendor[],
    isLoading: boolean,
}

export interface Editor {
    _id: string,
    name: string,
}

export interface IVendorUpdate {
    vendor: Vendor,
    orgId: string,
}