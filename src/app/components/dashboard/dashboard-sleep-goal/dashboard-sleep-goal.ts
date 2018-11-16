import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FitbitApiProvider } from '../../../providers/fitbit-api/fitbit-api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import * as moment from 'moment';

/**
 * Generated class for the DashboardSleepGoalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'dashboard-sleep-goal',
  templateUrl: 'dashboard-sleep-goal.html'
})
export class DashboardSleepGoalComponent {

  fitbit_access_token: string;
  fitbit_user_id: string;
  progressPercent: number;

  constructor(
    public auth: AuthService,
    private fitbit: FitbitApiProvider

  ) {
    this.auth = auth;
    this.fitbit_access_token = this.auth.user.fitbit.access_token;
    this.fitbit_user_id = this.auth.user.fitbit.user_id;

    // Initially progress percent will be zero
    this.progressPercent = 0;

    this.calcualetSleepGoalProgress();
  }

  /**
   * Calculate Sleep goal progress percent
   */
  calcualetSleepGoalProgress() {
    this.fitbit.getSleepGoal(this.fitbit_access_token, this.fitbit_user_id).subscribe(

      sg => {

        var sleepGoal = sg.goal.minDuration;
        var programStartDate = this.fitbit.getStartDate(sg.goal.updatedOn, this.auth.user.createdAt);
        this.fitbit.getSleepLog(this.fitbit_access_token, this.fitbit_user_id, programStartDate).subscribe(
          logdata => {
            var sleepLog = logdata.sleep;
            var weeklySleepDuration = this.getSleep(sleepLog, true);
            var weeklySleepGoal = sleepGoal * this.getNumberOfSleepDays(sleepLog);
            
            if (weeklySleepDuration > weeklySleepGoal) { //user has exceeded the weekly goal; so show 100% progress              
              this.progressPercent = 100;
            } else {
              this.progressPercent = (weeklySleepDuration / weeklySleepGoal) * 100;
            }
          },
          err => {
            console.log(err);
          });
      },
      err => {
        console.log(err);
      }
    );
  }


  /**
   * Calculate Average/Summation of Sleep
   * @param log 
   */
  getSleep(log = [], isSum = false) {
    var avg = 0;
    var sum = 0;

    if (log.length > 0) {
      sum = log.reduce((prevVal, elem) => prevVal + elem.minutesAsleep, 0);
    }

    if (isSum) { // Return Summation of sleep log
      return parseFloat(sum.toFixed(2));      
    } else { // Return Average of sleep per day
      var totalDays = this.getNumberOfSleepDays(log);
      avg = (sum / totalDays);
      return parseFloat(avg.toFixed(2));
    }

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
