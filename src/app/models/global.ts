export interface User {
    _id: string
    name: string
    email: string
    password: string,
    role: string,
    token?: string,
}

export interface Org {
    _id: string
    name: string,
    email: string,
    admins: [],
    employees: [],
    address: string
}