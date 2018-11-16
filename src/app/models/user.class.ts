import { User } from './user.interface';
import { Badge } from './badge.interface';
import { Meta } from './meta.interface';


export class UserClass implements User {
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

    constructor(obj?: User) {

        // this.photoUrl = (obj.photoUrl) ? obj.photoUrl : 'https://spotlight.dlme.clir.org/assets/default-52adc3dc03639885e8aa93763e29868269dd3b9dad4689f140c0175b4f945922.png';
        // this.uid = (obj.uid) ? obj.uid : '';
        // this.name = (obj.name) ? obj.name : '';
        // this.default = (obj.default) ? obj.default : false;
        // this.status = (obj.status) ? obj.status : '';
        // this.subscribers = (obj.subscribers) ? obj.subscribers : '';
        // this.type = (obj.type) ? obj.type : 'one-to-one';
        // this.updatedAt = (obj.updatedAt) ? obj.updatedAt : new Date().getTime();
    }
}