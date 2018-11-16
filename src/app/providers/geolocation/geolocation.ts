
import { Injectable } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation';
import { BehaviorSubject, Observable } from 'rxjs';

/*
  Generated class for the GeolocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeolocationProvider {

  locationSubject = new BehaviorSubject<any>(null);

  constructor(private geolocation: Geolocation) {

  }

  public getLocationSubject(): Observable<any> {
    return this.locationSubject.asObservable();
  }

  private getStorageVariable(name) {
    return JSON.parse(window.localStorage.getItem(name));
  }

  private setStorageVariable(name, data) {
    window.localStorage.setItem(name, JSON.stringify(data));
  }

  public getlat() {
    return this.getStorageVariable('lat');
  }

  public getlng() {
    return this.getStorageVariable('lng');
  }

  public aroundLatLng() {
    let lat = this.getlat();
    let lng = this.getlng();
    let latlng = lat + ', ' + lng;

    console.log(latlng);
    if (lat && lng) {
      return latlng;
    } else {
      return '0,0';
    }

  }

  updateLocationByPoint(latitude, longitude) {
    this.setStorageVariable('lat', latitude);
    this.setStorageVariable('lng', longitude);
  }
  
  updateLocation() {
    console.log('Location is updating ....');
    return this.calculateGeoLocation().then((resp) => {
      this.setStorageVariable('lat', resp.coords.latitude);
      this.setStorageVariable('lng', resp.coords.longitude);
      return resp;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  calculateGeoLocation() {
    return this.geolocation.getCurrentPosition();
  }

}
