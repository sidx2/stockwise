
interface LifecycleEvent {
    userId: string;
    userName: string;
    checkoutDate: Date;
    checkinDate?: Date;
}

export interface AssignedTo {
    userId: string;
    userName: string;
    quantity: number;
}

export interface Item {
    _id?: string;
    name: string;
    identificationType: 'unique' | 'non-unique';
    categoryId: string;
    orgId: string;
    quantity: number;
    serialNumber?: string;
    customFieldsData?: Record<string, any>;
    assignedTo: AssignedTo[];
    status?: string;
    checkedOutQuantity: number;
    itemImage?: string;
    lifecycle?: LifecycleEvent[];
}

export interface CheckinDetails {
    itemId: string,
    quantity: number,
    userId: string
}

export interface CheckoutDetails{
    assignedTo: AssignedTo, 
    itemId: string | undefined
}

export interface UserAsset {
    _id: string;
    name: string;
    itemImage: string;
    serialNumber: string;
    quantity?: number,
    customFieldsData: Record<string, any>; 
  }
  
