import { GeoLoc } from "./geoloc";
import { Group } from "./group.interface";

export class GroupClass {
    name: string;
    category: string;
    location: string;
    place_id?: string;
    _geoloc?: GeoLoc;
    weekdays?: any;
    startTime?: any;
    duration?: any;
    description?: string;

    constructor(obj?: Group) {
        this.name = (obj.name) ? obj.name : '';
        this.category = (obj.category) ? obj.category : '';
        this.location = (obj.location) ? obj.location : '';
        this.place_id = (obj.place_id) ? obj.place_id : '';
        this._geoloc = (obj._geoloc) ? obj._geoloc : new GeoLoc(0,0);
        this.weekdays = (obj.weekdays) ? obj.weekdays : '';
        this.startTime = (obj.startTime) ? obj.startTime : '';
        this.duration = (obj.duration) ? obj.duration : '';
        this.description = (obj.description) ? obj.description : '';
        // this.updatedAt = (obj.updatedAt) ? obj.updatedAt : new Date().getTime();
    }
}
