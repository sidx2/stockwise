export interface User {
    _id: string
    name: string
    email: string
    password: string,
    role: string,
}

export interface Org {
    _id: string
    name: string,
    email: string,
    admins: [],
    employees: [],
    address: string
}

// Reducers for global module
export interface IGlobalState {
    user: User,
    org: Org,
    isLoggedIn: boolean
}