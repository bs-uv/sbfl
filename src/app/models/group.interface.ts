import { GeoLoc } from './geoloc';

export interface Group {
    name: string,
    category: string,
    location: string,
    place_id?: string,
    _geoloc?: GeoLoc,
    weekdays?: any,
    startTime?: any,
    duration?: any,
    description?: string
}

