import { Meta } from "./meta.interface";
import { Badge } from "./badge.interface";

export interface User {
    access_token?: string;
    avgBedtime?: string;
    avgWakeupTime?: string;
    badge: Badge[];
    lastAction?: string;
    lastUpdate?: number;
    local?: string;
    meta: Meta;
    name: string;
    offsetFromUTCMillis?: number;
    photoURL: string;
    quarter: number;
    regDate?: string;
    score: number;
    timezone?: string;
    wakeupTime?: string;
}