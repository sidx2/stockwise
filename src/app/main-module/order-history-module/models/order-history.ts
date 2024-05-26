import { Org } from "../../../models/global"

export interface Admin {
    name: string,
    email: string,
    role: string,
}

export interface CartItem {
    vendor: { name: string, _id: string },
    quantity: number,
    item: { _id: string, name: string, categoryId: string }
}

export interface Order {
    _id: string,
    org: Org,
    admin: Admin,
    cart: CartItem[],
    status: string,
    isActive: true,
    createdAt: Date
}

export interface IStatusUpdated {
    _id: string,
    updatedStatus: string,

}
export interface IHistoryState {
    history: Order[],
    isLoading: boolean
}
