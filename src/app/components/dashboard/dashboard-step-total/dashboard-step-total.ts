import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { AuthService } from '../../../services/auth.service';
import { FirebaseProfileApiProvider } from '../../../providers/firebase-api/firebase-profile-api';
import { chartData, dataset } from '../../../models/util.data';
import { UNIT } from '../../../mocks/resources/unites';
import * as moment from 'moment';

import { OnDestroy } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";
/**
 * Generated class for the DashboardStepTotalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'dashboard-step-total',
  templateUrl: 'dashboard-step-total.html'
})
export class DashboardStepTotalComponent {

  private subscription: ISubscription;
  private firesubscription: ISubscription;

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
    this.dataset = dataset['default'];
    this.chartData = chartData['default'];

    this.chart = new Chart(this.chartData);
    this.unit = UNIT.default;
    this.nodata = true;

    if (this.auth.user && this.auth.user.locale == "en_US") {
      this.unit = UNIT.en_US;
    }

  }

  ngAfterViewInit() {
    this.firesubscription = this.fireProfileAPI.getUserFromDB(this.auth.user.sub).subscribe(
      firebaseProfile => {
        if (this.nodata) {
          this.doSubscription();
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  private doSubscription() {

    this.subscription = this.fireProfileAPI.getProfile(this.auth.user.sub).subscribe(
       data => {
        let log = data.meta.step.log;

        if (log.length > 7) {
          log.splice(0, (log.length - 7));
        }

        let stepsData = log.map((elem) => parseInt(elem.value, 10));
        let categories = (log.map((elem) => moment(elem.dateTime).format("ddd")));

        // this.dataset.data = stepsData;
        // this.chart.removeSerie(0);
        // this.chart.addSerie(this.dataset);

        this.dataset.data = stepsData;
        this.chartData.xAxis.categories = categories;
        this.chartData.series = [
          this.dataset
        ];

        this.chart = new Chart(this.chartData);
        if (this.chart.ref) {
          this.chart.ref.redraw();
        }
      },
      err => {
        console.log(err);
      }
    );

  }

  ngOnDestroy() {
    this.firesubscription.unsubscribe();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
