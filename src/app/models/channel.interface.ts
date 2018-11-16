export interface Channel {
    id?: string;
    uid?: string;
    name?: string;
    photoUrl?: string;
    type?: string; // "help-line", "one-to-one", "group"
    default?: boolean;
    status?: string;
    subscribers?: any;
    lastMessage?: string;
    updatedAt: number;
}