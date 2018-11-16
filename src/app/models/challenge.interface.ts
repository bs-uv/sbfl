import { ChallengeMember } from "./challenge-member.interface";

export interface Challenge {
    title: string,
    category: string,
    target: string,
    createdBy: string,
    unit?: string,
    // createdAt: string | number,
    updatedAt: string | number,
    members?: any
}

