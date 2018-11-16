import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { FirebaseProfileApiProvider } from '../../../providers/firebase-api/firebase-profile-api';
import { AuthService } from '../../../services/auth.service';
import * as moment from 'moment';
/**
 * Generated class for the DashboardSleepTotalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'dashboard-sleep-total',
  templateUrl: 'dashboard-sleep-total.html'
})
export class DashboardSleepTotalComponent {

  totalSleep: number;

  dataset = {
    name: "Sleep Total",
    data: [],
    color: '#28B9D6',
  };

  xAxis = {
    lineWidth: 0,
    minorGridLineWidth: 0,
    lineColor: 'transparent',
    labels: {
      enabled: true,
      style: {
        color: 'white'
      }
    },
    minorTickLength: 0,
    tickLength: 0,
    categories: []
  };

  chartData = {
    chart: {
      backgroundColor: 'rgba(0,0,0,0)',
      type: 'column',
      height: 180,
      margin: [0, 10, 30, 5],
      events: {
        redraw: function () {

        }
      }
    },
    title: {
      text: null
    },
    credits: {
      enabled: false
    },
    colorAxis: {
      labels: {
        enabled: false
      }
    },
    legend: {
      enabled: false
    },
    xAxis: this.xAxis,
    yAxis: {
      // plotLines: [{
      //   color: '#f7c0c0', // Color value
      //   dashStyle: 'solid', // Style of the plot line. Default to solid
      //   value: 8, // Value of where the line will appear
      //   width: 1 // Width of the line    
      // }],
      min: -.1,
      startOnTick: false,
      gridLineWidth: 0,
      labels: {
        enabled: false
      },
      title: {
        text: null
      }
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          inside: false,
          crop: false,
          overflow: "none",
          style: {
            color: '#FFFFFF',
            fontSize: "10px",
            fontWeight: 'bold',
            textOutline: '0px',
          }
        },
        borderColor: '#303030',
        borderRadius: 7
      },
      column: {
        pointPadding: 0.025,
        borderWidth: 1,
        /* Here is the setting to limit the maximum column width. */
        maxPointWidth: 20
      }
    },
    series: [
      this.dataset
    ]
    
  };

  chart: Chart;

  constructor(
    public auth: AuthService,
    private fireProfileAPI: FirebaseProfileApiProvider

  ) {
    this.auth = auth;
    this.chart = new Chart(this.chartData);

  }

  ngAfterViewInit() {
    this.fireProfileAPI.getProfile(this.auth.user.sub).subscribe(
      data => {
        var log = data.meta.sleep.log;

        var weeklySleepData = this.getSleepTotalPerDay(log).reverse();
        if (weeklySleepData.length > 7) {
          weeklySleepData.splice(0, (weeklySleepData.length - 7));
        }
        
        var weeklySleepGoal = log * this.getNumberOfSleepDays(log);

        // Conver minute to hour
        weeklySleepGoal = parseFloat((weeklySleepGoal / (60)).toFixed(2));

        var stepsData = (weeklySleepData.map((elem) => elem.duration));
        
        

        var categories = (weeklySleepData.map((elem) => moment(elem.dateOfSleep).format("ddd")));

        this.totalSleep = parseFloat((stepsData.reduce((previousValue, currentValue) => previousValue + currentValue, 0)).toFixed(1));

        this.dataset.data = stepsData;
        this.chartData.xAxis.categories = categories;
        this.chartData.series = [
          this.dataset
        ];

        // console.log(stepsData);
        // console.log(categories);

        this.chart = new Chart(this.chartData);
        if(this.chart.ref){
          this.chart.ref.redraw();
        }
        
      },
      err => {
        console.log("---------ERROR------------");
        console.log(err);
      }
    );
  }



  /**
   * Calculate Average/Summation of Sleep
   * @param log 
   */
  getSleepTotalPerDay(log = []) {
    var obj = {};
    var item = null, key = null, value = null, c;
    for (c = 0; c < log.length; c++) {
      item = log[c];
      key = item.dateOfSleep;
      value = item.minutesAsleep;

      if (!obj[key]) obj[key] = value;
      else obj[key] += value;
    }
    return Object.keys(obj).map(function (key) {
      return {
        dateOfSleep: key,
        duration: parseFloat((obj[key] / (60)).toFixed(2))
      };
    });
  }



  /**
   * Calculate Number of Sleep Log Days
   * @param log 
   */
  getNumberOfSleepDays(log = []) {

    var uniqueDates = 1;

    if (log.length > 0) {
      var allDates = log.map(elem => elem.dateOfSleep);
      uniqueDates = (Array.from(new Set(allDates))).length;
    }

    return uniqueDates;
  }

}
