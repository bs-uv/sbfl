import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retryWhen';
import { environment } from '../../../environments/environment';

@Injectable()
export class UtilsService {

  constructor(public http: Http) { }

  getFitbitUserId(userId: string) {
    return userId.split("|")[1];
  }

  public getGroupString(str: string) {
    return str.toLocaleLowerCase();
  }

  public isInArray(value, array) {
    return array.indexOf(value) > -1;
  }

  public sanitizeString(str) {
    if (str) {
      str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "").trim();
    }
    return str;
  }

  public parseToken(access_token: string) {
    if (access_token) {
    
        var base64Url = access_token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        let parsedToken = JSON.parse(window.atob(base64));
        return parsedToken;
      

    } else {
      return access_token;
    }
  }

  /**
   * Return App Version Information
   */
  public getAppVersion() {

    let headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(environment.firebaseapi.url + '/version/latest').map(res => res.json());

  }


}
