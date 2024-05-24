import { Vendor } from "../store/vendor.reducers";

export interface Editor {
    _id: string,
    name: string,
}

export interface IVendorUpdate {
    vendor: Vendor,
    orgId: string,
}