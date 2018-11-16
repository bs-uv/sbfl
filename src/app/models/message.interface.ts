export interface Message {
    id?: string;
    uid: string;
    body: string;
    // readStatus: boolean;
    readBy: any;
    createdAt: any;
}