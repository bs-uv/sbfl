import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Liquid",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Liquid night club is one of the most popular clubs in Madison, WI.",
  };


  constructor(public http: Http) {
    let items = [
      {
        "userName": "Midnight Madness",
        "profilePic": "assets/img/eventArt/midnightMadness.jpg",
        "about": "Liquid night club is one of the most popular clubs in Madison, WI.",
        "date": "10/20/17",
        "emailAddress": "info@liquidmadison.com",

        "quarter": "1",
        "userScore": "325",
        "weightGoal": "3/4",
        "sleepGoal": "1/2",
        "bloodPressureGoal": "+5",
      }
      /*{
        "name": "Midnight Madness",
        "profilePic": "assets/img/eventArt/midnightMadness.jpg",
        "about": "Liquid night club is one of the most popular clubs in Madison, WI.",
        "date": "10/20/17",
        "venue": "Liquid",
        "doors": "10pm",
        "ages": "21+",
        "address": "624 University Ave, Madison, WI 53715",
        "phoneNumber": "(608) 257-1122",
        "emailAddress": "info@liquidmadison.com",
        "ticketTier1": {
          "name": "General Admission",
          "location": "Main Floor",
          "price": "$15.50"
        },
        "ticketTier2": {
          "name": "General Admission",
          "location": "Upper Deck",
          "price": "$20.50"
        },
        "ticketTier3": {
          "name": "VIP Admission",
          "location": "Opera Box",
          "price": "$60.25"
        },
        "ticketTier4": {
          "name": "",
          "location": "",
          "price": ""
        },
        "ticketTier5": {
          "name": "",
          "location": "",
          "price": ""
        }
      },
      {
        "name": "Dillon Francis",
        "profilePic": "assets/img/eventArt/dillonFrancis.jpg",
        "about": "Liquid night club is one of the most popular clubs in Madison, WI.",
        "date": "10/27/17",
        "venue": "Liquid",
        "doors": "10pm",
        "ages": "21+",
        "address": "624 University Ave, Madison, WI 53715",
        "phoneNumber": "(608) 257-1122",
        "emailAddress": "info@liquidmadison.com",
        "ticketTier1": {
          "name": "General Admission",
          "location": "Main Floor",
          "price": "$15.50"
        },
        "ticketTier2": {
          "name": "General Admission",
          "location": "Upper Deck",
          "price": "$20.50"
        },
        "ticketTier3": {
          "name": "VIP Admission",
          "location": "Opera Box",
          "price": "$60.25"
        },
        "ticketTier4": {
          "name": "",
          "location": "",
          "price": ""
        },
        "ticketTier5": {
          "name": "",
          "location": "",
          "price": ""
        }
      }*/
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
