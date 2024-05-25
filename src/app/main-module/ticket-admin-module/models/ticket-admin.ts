export interface Ticket {
    _id?: string;
    issueType: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    status?: 'open' | 'processing' | 'resolved' | 'closed';
    createdBy?: string;
    userName?: string;
    assetId?: string;
    orgId?: string;
    remark?: string;
    createdAt?: Date;
}

export interface UpdateStatus {
    ticketId?: string,
    status: string,
    remark?: string
}

export interface TicketAdminState {
    allTickets: Ticket[];
    loading: boolean
}
