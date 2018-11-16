import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retryWhen';
// import * as moment from 'moment';
// import { CacheService } from "ionic-cache";
import { environment } from '../../../environments/environment';
import { UtilsService } from '../../providers/utils/utils.service';
/*
  Generated class for the NewsApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsApiProvider {

  url: string = "https://newsapi.org";

  constructor(public http: Http, public utils: UtilsService) {

  }

  public sources(){
    let endpoint = "v2/sources";
    let params = {
      language: 'en',
      country: 'us'
    }
    return this.get(endpoint, params);
  }

  // Call Heading API 
  public articles(tab: string, filter?: any[]) {
    
    var page = (filter && filter['page'])?(filter['page'] * 1):1;
    var category = (filter && filter['category'])?this.utils.sanitizeString(filter['category'].toString()):'';
    var source = (filter && filter['source'])?this.utils.sanitizeString(filter['source'].toString()):'';
    var query = (filter && filter['query'])?this.utils.sanitizeString(filter['query']):'';

    var endpoint = 'v2/top-headlines';
    var parames = {
      country: "us",
      language: 'en',
    };

    if(tab == 'everything'){
      delete parames.country;
      endpoint = 'v2/everything';
    }

    if (page) {
      parames['page'] = page;
    }
    
    if (source) {
      delete parames.country;
      parames['sources'] = source;
    }

    if (query) {
      delete parames.country;
      parames['q'] = query;
    }

    // if (category) {
    //   // delete parames.country;
    //   parames['category'] = category;
    //   // endpoint = 'v2/everything';

    // }

    // var endpoint = 'v2/top-headlines?country=us&language=en&sources=espn&apiKey=' + environment.newsapi.apiKey;
    // var endpoint = 'v2/top-headlines?sources=espn&apiKey=' + environment.newsapi.apiKey;
    // var endpoint = 'v2/top-headlines?country=us&apiKey=' + environment.newsapi.apiKey;


    return this.get(endpoint, parames);

  }
  /**
   * API GET Call
   * @param endpoint 
   * @param access_token 
   * @param params 
   */
  private get(endpoint: string, params?: any) {
    console.log(this.url + '/' + endpoint);
    params['apiKey'] = environment.newsapi.apiKey;
    let headers = new Headers({
      // 'Content-Type': 'application/json; charset=utf-8',
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
    let ttl = 1;
    let request = this.http.get(url, options).map(res => res.json());
    return request;
    // return this.cache.loadFromObservable(url, request, null, ttl);
  }
}
