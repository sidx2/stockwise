import { Org, User } from "../../models/global";

export interface LoginCredentials {
    email: string,
    password: string,
}

export interface SignupCredentials {
    name: string,
    email: string,
    password: string,
    role: string,
}

export interface CreateOrgCredentials {
    email: string,
    name: string,
}

export interface IAuthState {
    isLoading: boolean,
}