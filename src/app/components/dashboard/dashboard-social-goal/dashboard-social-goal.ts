import { Component, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { AuthService } from '../../../services/auth.service';
import { FirebaseProfileApiProvider } from '../../../providers/firebase-api/firebase-profile-api';
import { chartData, dataset } from '../../../models/util.data';
import { UNIT } from '../../../mocks/resources/unites';
import * as moment from 'moment';

import { OnDestroy } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";

/**
 * Generated class for the DashboardSocialGoalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'dashboard-social-goal',
  templateUrl: 'dashboard-social-goal.html'
})
export class DashboardSocialGoalComponent {

  private subscription: ISubscription;
  private firesubscription: ISubscription;

  @Input() componentName?: string; // "dietary", "distance", "fat", "floor", "sleep", "step", "weight", "social", "speritual"
  @Input() componentType?: string; // "CURRENT", "GOAL", "PROGRESS", "LOG"
  @Input() title?: string;
  @Input() filter?: string;
  @Input() length?: number;
  @Input() isTotal?: boolean = false;
  @Input() graph?: string;

  progressPercent: number;
  displayText: string;
  displayArray: any;
  total: number;

  dataset: any;
  chartData: any;
  chart: Chart;
  unit: any;
  nodata: boolean;

  profileData: any;

  constructor(
    public auth: AuthService,
    private fireProfileAPI: FirebaseProfileApiProvider

  ) {
    this.auth = auth;
    this.nodata = true;

    if (this.auth.user && this.auth.user.locale == "en_US") {
      this.unit = UNIT.en_US;
    }

  }

  ngAfterViewInit() {
    
    this.firesubscription = this.fireProfileAPI.getProfileSettings(this.auth.user.sub).subscribe(
      firebaseProfile => {
        if (this.nodata) {
          this.doSubscription();
        }
      }
    );
  }

  private doSubscription() {

    this.subscription = this.fireProfileAPI.getProfileSettings(this.auth.user.sub).subscribe(
      data => {
        if (data) {
          this.nodata = false;
          this.profileData = data;
          this.processData();
        } else {
          this.nodata = true;
        }
      },
      err => {
        console.log(err);
      }
    );

  }

  public processData() {
    if (this.auth.user.locale == "en_US") {
      this.unit = UNIT.en_US
    }
    let meta = (this.profileData.meta[this.componentName])?this.profileData.meta[this.componentName]:{
      current: 0,
      goal: 0,
      log: {},
      progress: 0,
      total: 0
    };

    switch (this.componentType) {
      case "PROGRESS":
        this.progressPercent = (meta.progress)?meta.progress:0;
        break;
      case "CURRENT":
        this.progressPercent = (meta.current)?meta.current:0;
        break;
      case "GOAL":
        this.progressPercent = (meta.goal)?meta.goal:0;
        break;
      case "LOG":

        let log = this.applyLog(meta.log, this.componentName, "value");
        var categories = this.applyLog(meta.log, this.componentName, "categories");
        this.total = parseFloat((log.reduce((previousValue, currentValue) => previousValue + currentValue, 0)).toFixed(1));

        // console.log(this.componentName, log);
        this.dataset.data = log;

        // this.chart.removeSerie(0);
        // this.chart.addSerie(this.dataset);
        this.chartData.xAxis.categories = categories;
        this.chartData.series = [
          this.dataset
        ];

        this.chart = new Chart(this.chartData);
        if (this.chart.ref) {
          this.chart.ref.redraw();
        }

        break;
      
      default:
        this.displayText = this.profileData[this.componentName];
        break;
    }

    if (this.filter) {

      if (this.progressPercent) {
        this.progressPercent = this.applyFilter(this.progressPercent, this.filter);
      }
      if (this.displayText) {
        this.displayText = this.applyFilter(this.displayText, this.filter);
      }
      if (this.total) {
        this.total = this.applyFilter(this.total * 60, this.filter);
      }
    }
  }

  private applyFilter(data, filter) {
    let returndata = data;
    switch (filter) {
      case "hour":
        returndata = parseFloat((data / 60).toFixed(2)) + " Hours";
        break;
      case "distance":
      case "weight":
        returndata = data + " " + this.unit[filter];
        break;
      case "number":
        returndata = data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
        break;
      case "position":
        if (data < 2) {
          returndata = data + "st";
        } else if (data < 3) {
          returndata = data + "nd";
        } else if (data < 4) {
          returndata = data + "rd";
        } else {
          returndata = data + "th";
        }
        break;
      default:

        break;
    }
    return returndata;
  }

  private applyLog(log, type, returnType) {
    let returndata = [];
    let categories = [];

    let weeklyData;

    switch (type) {
      case "sleep":
        weeklyData = this.getSleepTotalPerDay(log).reverse();
        if (this.length > 0 && weeklyData.length > this.length) {
          weeklyData.splice(0, (weeklyData.length - this.length));
        }
        returndata = (weeklyData.map((elem) => elem.duration));
        categories = (weeklyData.map((elem) => moment(elem.dateOfSleep).format("ddd")));
        break;

      case "fat":
        weeklyData = this.getFatTotalPerDay(log).reverse();
        if (this.length > 0 && weeklyData.length > this.length) {
          weeklyData.splice(0, (weeklyData.length - this.length));
        }
        returndata = (weeklyData.map((elem) => elem.fat));
        categories = (weeklyData.map((elem) => moment(elem.date).format("ddd")));
        break;

      default:
        if (this.length > 0 && log.length > this.length) {
          log.splice(0, (log.length - this.length));
        }
        returndata = log.map((elem) => parseInt(elem.value, 10));
        categories = (log.map((elem) => moment(elem.dateTime).format("ddd")));
        break;
    }

    if (returnType == 'categories') {
      return categories;
    }
    return returndata;
  }

  getSleepTotalPerDay(log = []) {
    var obj = {};
    var item = null, key = null, value = null, c;
    for (c = 0; c < log.length; c++) {
      item = log[c];
      key = item.dateOfSleep;
      value = item.minutesAsleep;

      if (!obj[key]) obj[key] = value;
      else obj[key] = value;
    }
    return Object.keys(obj).map(function (key) {
      return {
        dateOfSleep: key,
        duration: parseFloat((obj[key] / (60)).toFixed(2))
      };
    });
  }

  getFatTotalPerDay(log = []) {
    var obj = {};
    var item = null, key = null, value = null, c;
    for (c = 0; c < log.length; c++) {
      item = log[c];
      key = item.date;
      value = item.fat;

      if (!obj[key]) obj[key] = value;
      else obj[key] = (obj[key] + value) / 2;
    }
    return Object.keys(obj).map(function (key) {
      return {
        date: key,
        fat: parseFloat((obj[key]).toFixed(2))
      };
    });
  }

  ngOnDestroy() {
    // console.log("destroy");
    this.firesubscription.unsubscribe();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
