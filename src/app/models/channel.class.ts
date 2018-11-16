import { Channel } from './channel.interface';

export class ChannelClass implements Channel {
    id?: string;
    uid: string;
    name?: string;
    photoUrl?: string;    
    type?: string; // "help-line", "one-to-one", "group"
    default?: boolean;
    status?: string;
    subscribers?: any;
    lastMessage?: string;
    updatedAt: number;

    constructor(obj?: Channel) {

        this.photoUrl = (obj.photoUrl) ? obj.photoUrl : 'https://spotlight.dlme.clir.org/assets/default-52adc3dc03639885e8aa93763e29868269dd3b9dad4689f140c0175b4f945922.png';
        this.uid = (obj.uid) ? obj.uid : '';
        this.name = (obj.name) ? obj.name : '';
        this.default = (obj.default) ? obj.default : false;
        this.status = (obj.status) ? obj.status : '';
        this.subscribers = (obj.subscribers) ? obj.subscribers : '';
        this.type = (obj.type) ? obj.type : 'one-to-one';
        this.updatedAt = (obj.updatedAt) ? obj.updatedAt : new Date().getTime();
    }
}