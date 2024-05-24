export interface IAddEmployee {
    name: string;
    email: string;
    role: string;
}

export interface Employee {
    _id: string,
    name: string,
    email: string,
    role: string
}

export interface IEmployeesState {
    employees: Employee[]
}

