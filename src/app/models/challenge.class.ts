
import { Challenge } from "./challenge.interface";

export class ChallengeClass {
    title: string;
    category: string;
    target: string;
    createdBy: string;
    // createdAt: string | number;
    updatedAt: string | number;

    constructor(obj?: Challenge) {
        this.title = (obj.title) ? obj.title : '';
        this.category = (obj.category) ? obj.category : '';
        this.target = (obj.target) ? obj.target : '';
        this.createdBy = (obj.createdBy) ? obj.createdBy : '';
        // this.createdAt = (obj.createdAt) ? obj.createdAt : new Date().getTime();
        this.updatedAt = (obj.updatedAt) ? obj.updatedAt : new Date().getTime();
    }
}
