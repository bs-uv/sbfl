import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retryWhen';
import * as moment from 'moment';


/*
  Generated class for the FitbitApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FitbitApiProvider {
  url: string = 'https://api.fitbit.com';

  constructor(public http: Http) {

  }

  // Calculatr Quarter of a program for a user
  public getQuarter(createdAt: string) {
    // var parts = memberSince.split('-');
    var one_month = 1000 * 60 * 60 * 24 * 30;

    // var memberShipDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    var memberShipDate = new Date(createdAt);
    var today = new Date();

    var difference_ms = today.getTime() - memberShipDate.getTime();
    var quarter = Math.ceil(difference_ms / one_month) % 4;

    return (quarter > 0) ? quarter : 4;

  }

  // Calculate Start Date
  public getStartDate(date1, date2) {
    if (new Date(date1) > new Date(date2)) {
      return moment(new Date(date1)).format("YYYY-MM-DD");
    } else {
      return moment(new Date(date2)).format("YYYY-MM-DD");
    }
  }

  // Calculate Program Start Date
  public getProgramStartDate(createdAt: string) {
    var one_day = 1000 * 60 * 60 * 24;
    var one_month = one_day * 30;
    var one_program = one_month * 4;
    var memberShipDate = new Date(createdAt);
    var today = new Date();

    var difference_ms = today.getTime() - memberShipDate.getTime();
    var program = Math.floor(difference_ms / one_program);
    var programStartDate = memberShipDate.getTime() + (program * one_program) + one_day;

    return programStartDate;

  }

  // Call Weight Goal API 
  public getWeightGoal(access_token, user_id) {

    var endpoint = '1/user/' + user_id + '/body/log/weight/goal.json';
    return this.get(endpoint, access_token);

  }

  // Call Weight Log API
  public getWeightLog(access_token, user_id, startDate: any = false) {

    var baseDate = this.getToday(7);
    var endpoint = '1/user/' + user_id + '/body/log/weight/date/' + baseDate + '/7d.json';

    if (startDate) {
      var endDate = this.getToday();
      endpoint = '1/user/' + user_id + '/body/weight/date/' + this.urlDate(startDate) + '/' + this.urlDate(endDate) + '.json';
    }
    
    return this.get(endpoint, access_token);

  }

  // Call Activity Goal 
  public getActivityGoal(access_token, user_id, date) {
    var endpoint = '1/user/' + user_id + '/activities/date/' + this.urlDate(date) + '.json';
    return this.get(endpoint, access_token);

  }

  // Call Activity Log 
  public getActivityLog(access_token, user_id, resource, startDate: any = false) {
    var endpoint = '1/user/' + user_id + '/activities/' + resource + '/date/today/7d.json';

    if (startDate) {
      var endDate = this.getToday();
      endpoint = '1/user/' + user_id + '/activities/' + resource + '/date/' + this.urlDate(startDate) + '/' + this.urlDate(endDate) + '.json';
    }

    return this.get(endpoint, access_token);
  }

  // Call Fat Goal API 
  public getFatGoal(access_token, user_id) {
    var endpoint = '1/user/' + user_id + '/body/log/fat/goal.json';
    return this.get(endpoint, access_token);

  }

  // Call Fat Log API 
  public getFatLog(access_token, user_id, startDate?: string) {
    var baseDate = this.getToday(7);
    var endpoint = '1/user/' + user_id + '/body/log/fat/date/' + baseDate + '/7d.json';

    if (startDate) {
      endpoint = '1/user/' + user_id + '/body/log/fat/date/' + startDate + '.json';
    }

    return this.get(endpoint, access_token);

  }

  // Call Sleep Goal API 
  public getSleepGoal(access_token, user_id) {

    var endpoint = '1/user/' + user_id + '/sleep/goal.json';
    return this.get(endpoint, access_token);

  }

  // Call Sleep Log API 
  public getSleepLog(access_token, user_id, startDate?: string) {

    var baseDate = this.getToday(7);
    var todayDate = this.getToday();
    var endpoint = '1.2/user/' + user_id + '/sleep/date/' + baseDate + '/' + todayDate + '.json';

    if (moment(startDate) > moment(baseDate)) {
      var endpoint = '1.2/user/' + user_id + '/sleep/date/' + startDate + '/' + todayDate + '.json';
    }

    return this.get(endpoint, access_token);

  }

  // Call Food Goal API 
  public getFoodGoal(access_token, user_id) {

    var endpoint = '1/user/' + user_id + '/foods/log/goal.json';
    return this.get(endpoint, access_token);

  }

  // Call Food Log API
  public getFoodLog(access_token, user_id) {

    var baseDate = this.getToday();
    var endpoint = '1/user/' + user_id + '/foods/log/caloriesIn/date/' + baseDate + '/7d.json';
    return this.get(endpoint, access_token);

  }

  // Call unubscription API
  public getSsubscription(access_token, user_id) {

    var endpoint = '1/user/' + user_id + '/apiSubscriptions.json';
    return this.get(endpoint, access_token);

  }

  // Call Subscription API
  public subscribe(access_token, user_id) {

    var endpoint = '1/user/' + user_id + '/apiSubscriptions/' + user_id + '.json';
    var body = {};
    return this.post(endpoint, access_token, body);

  }

  // Call unubscription API
  public unsubscribe(access_token, user_id) {

    var endpoint = '1/user/' + user_id + '/apiSubscriptions/' + user_id + '.json';
    return this.delete(endpoint, access_token);

  }


  private urlDate(date) {
    return moment(new Date(date)).format("YYYY-MM-DD");
  }

  public getToday(dayBefore?: number) {
    var t = new Date();

    if (dayBefore) {
      t.setDate(t.getDate() - dayBefore);
    }

    var formated = moment(t).format("YYYY-MM-DD");
    return formated;
  }



  /**
   * Fitbit API GET Call
   * @param endpoint 
   * @param access_token 
   * @param params 
   */
  private get(endpoint: string, access_token: String, params?: any) {
    console.log(this.url + '/' + endpoint);
    console.log(access_token);

    let headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + access_token
    });

    let options = new RequestOptions({ headers: headers });

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }
    let url = this.url + '/' + endpoint;
    let cacheKey = url;
    let ttl = 360;
    let request = this.http.get(url, options).map(res => res.json());
    return request;
    // return this.cache.loadFromObservable(url, request, null, ttl);
  }

  /**
   * Fitbit API POST Call
   * @param endpoint 
   * @param access_token 
   * @param body 
   */
  post(endpoint: string, access_token: String, body: any) {
    console.log(this.url + '/' + endpoint);
    console.log(access_token);

    let headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + access_token
    });

    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.url + '/' + endpoint, body, options);
  }

    /**
   * Fitbit API Delete Call
   * @param endpoint 
   * @param access_token 
   * @param body 
   */
  delete(endpoint: string, access_token: String) {
    console.log(this.url + '/' + endpoint);
    console.log(access_token);

    let headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + access_token
    });

    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this.url + '/' + endpoint, options);
  }










  getProfile(access_token, user_id) {

    let headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + access_token
    });

    let options = new RequestOptions({ headers: headers });

    return this.http.get('https://api.fitbit.com/1/user/' + user_id + '/profile.json', options).map(res => res.json());

  }

}
