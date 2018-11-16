import { Injectable, NgZone } from '@angular/core';
import { Events, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import Auth0Cordova from '@auth0/cordova';
import Auth0 from 'auth0-js';

import { environment } from '../../environments/environment';
import { FirebaseAuthApiProvider } from '../providers/firebase-api/firebase-api';
import { FitbitApiProvider } from '../providers/fitbit-api/fitbit-api';
import { GeolocationProvider } from '../providers/geolocation/geolocation';


@Injectable()
export class AuthService {
  auth0: any;
  accessToken: string;
  idToken: string;
  user: any;
  userSubject = new BehaviorSubject<any>(null);
  errorSubject = new BehaviorSubject<any>(null);

  constructor(
    public zone: NgZone,
    public events: Events,
    public plft: Platform,
    public fireAuthAPI: FirebaseAuthApiProvider,
    public fitbitAPI: FitbitApiProvider, 
    public geo: GeolocationProvider
  ) {
    this.user = this.getStorageVariable('profile');
    this.idToken = this.getStorageVariable('id_token');
    if (this.plft.is("desktop")) {
      this.auth0 = new Auth0.WebAuth(environment.auth0Config.web);
    } else {
      this.auth0 = new Auth0.WebAuth(environment.auth0Config.app);
    }
  }

  public getUserSubject(): Observable<any> {
    return this.userSubject.asObservable();
  }
  public getErrorSubject(): Observable<any> {
    return this.errorSubject.asObservable();
  }

  private getStorageVariable(name) {
    return JSON.parse(window.localStorage.getItem(name));
  }

  private setStorageVariable(name, data) {
    window.localStorage.setItem(name, JSON.stringify(data));
  }

  private setIdToken(token) {
    this.idToken = token;
    this.setStorageVariable('id_token', token);
  }

  private setAccessToken(token) {
    this.accessToken = token;
    this.setStorageVariable('access_token', token);
  }

  public isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    let time = new Date().getTime();
    if (!( time < expiresAt) || !this.getStorageVariable('profile')) {
      this.clearSession();
      return false;
    }else{
      return true;
    }
    // return time < expiresAt;
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
      } else if (err) {
        this.errorSubject.next(err);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {

    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (err) {
        throw err;
      }

      if (profile) {
        this.setStorageVariable('profile', this.senitizeProfile(profile));
        // Set the time that the access token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        this.setIdToken(authResult.idToken);
        this.setAccessToken(authResult.accessToken);
        this.setStorageVariable('expires_at', expiresAt);
        console.log("Custom Login Token: ", profile.firebase.token);
        console.log("Profile: ", profile);
        this.fireAuthAPI.loginUserWithToken(profile.firebase.token, profile).then(
          firedata => {
            this.zone.run(() => {
              this.user = profile;
            });
            this.geo.updateLocation().then(res => {
              console.log('location update completed.');
              this.userSubject.next(this.user);
            });
          },
          e => {
            console.log("error from firebase custom login", e);
            console.log(e);
          }
        );
      };

    });

  }

  public senitizeProfile(profile) {

    profile.user_metadata = profile.user_metadata || {};

    profile.auth = profile["http://sbfl.com/profile/auth"] || {}
    profile.fitbit = profile["http://sbfl.com/profile/auth"] || {}
    delete profile["http://sbfl.com/profile/auth"];

    profile.identities = profile["http://sbfl.com/profile/identities"] || {}
    delete profile["http://sbfl.com/profile/identities"];

    profile.identities.map((elem, i) => {
      var key = elem.provider;
      profile.identities.splice(i, 1);
      profile.identities[key] = elem;
      return;
    });

    profile.groups = profile["http://sbfl.com/groups"] || {}
    delete profile["http://sbfl.com/groups"];

    let data = profile["http://sbfl.com/profile/data"] || {}
    delete profile["http://sbfl.com/profile/data"];
    for (var attrname in data) { profile[attrname] = data[attrname]; }

    profile.firebase = profile["http://sbfl.com/profile/firebase"] || {}
    delete profile["http://sbfl.com/profile/firebase"];

    return profile;
  }

  public login() {
    if (this.plft.is('desktop')) {
      this.auth0.authorize();
      return true;
    }
    const client = new Auth0Cordova(environment.auth0Config.app);

    const options = {
      scope: 'openid profile offline_access'
    };

    client.authorize(options, (err, authResult) => {
      if (err) {
        // console.log(err);
        throw err;
      }
      this.setSession(authResult);
      // console.log(authResult);
      // this.setIdToken(authResult.idToken);
      // this.setAccessToken(authResult.accessToken);

      // const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      // this.setStorageVariable('expires_at', expiresAt);

      // this.auth0.client.userInfo(this.accessToken, (err, profile) => {
      //   if (err) {
      //     // console.log(err);
      //     throw err;
      //   }

      //   this.setStorageVariable('profile', this.senitizeProfile(profile));

      //   this.fireAuthAPI.loginUserWithToken(profile.firebase.token, profile).then(
      //     firedata => {
      //       console.log("SIGN IN");
      //       // console.log(profile.fitbit.access_token, profile.fitbit.user_id);
      //       // Subscribe to fitbit data update notification

      //       // this.fitbitAPI.subscribe(profile.fitbit.access_token, profile.fitbit.user_id).subscribe(
      //       //   subscriptionData => {

      //       // console.log(subscriptionData);
      //       this.zone.run(() => {
      //         this.user = profile;
      //       });
      //       this.userSubject.next(this.user);
      //       // this.events.publish('authChanged', this.isAuthenticated());
      //       // },
      //       // errordata => {
      //       //   console.log(errordata);
      //       // });

      //     },
      //     e => {
      //       // console.log("error from firebase custom login");
      //       // console.log(e);
      //     }
      //   );
      // });
    });
  }

  public clearSession() {
    window.localStorage.removeItem('profile');
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('id_token');
    window.localStorage.removeItem('expires_at');
    window.localStorage.removeItem('lat');
    window.localStorage.removeItem('lng');

    this.idToken = null;
    this.accessToken = null;
    this.user = null;

    this.userSubject.next(null);
    this.errorSubject.next(null);
  }
  public logout() {
    this.fireAuthAPI.logoutUser();
    this.clearSession();
    
    this.events.publish('auth:changed', this.isAuthenticated());
  }
}
