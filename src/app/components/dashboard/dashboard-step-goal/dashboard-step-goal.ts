import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FitbitApiProvider } from '../../../providers/fitbit-api/fitbit-api';

/**
 * Generated class for the DashboardStepGoalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'dashboard-step-goal',
  templateUrl: 'dashboard-step-goal.html'
})
export class DashboardStepGoalComponent {

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

    this.calcualetDistanceGoalProgress();
  }

  /**
   * Calculate Sleep goal progress percent
   */
  calcualetDistanceGoalProgress() {

    // Get Program Start Date
    var programStartDate = this.fitbit.getProgramStartDate(this.auth.user.createdAt);

    this.fitbit.getActivityGoal(this.fitbit_access_token, this.fitbit_user_id, programStartDate).subscribe(

      goalData => {

        var stepGoal = goalData.goals.steps;
        
        this.fitbit.getActivityLog(this.fitbit_access_token, this.fitbit_user_id, 'steps', programStartDate).subscribe(
          logdata => {
            
            var log = logdata["activities-steps"];
            var weeklyDuration = this.getValue(log, true);
            var weeklyGoal = stepGoal * this.getNumberOfDays(log);

            if (weeklyDuration > weeklyGoal) { //user has exceeded the weekly goal; so show 100% progress              
              this.progressPercent = 100;
            } else {
              this.progressPercent = (weeklyDuration / weeklyGoal) * 100;
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
   * Calculate Average/Summation of Step
   * @param log 
   */
  getValue(log = [], isSum = false) {
    var avg = 0;
    var sum = 0;

    if (log.length > 0) {
      sum = log.reduce((prevVal, elem) => prevVal + parseFloat(elem.value), 0);
    }

    if (isSum) { // Return Summation of Step log
      return parseFloat(sum.toFixed(2));
    } else { // Return Average of Step per day
      var totalDays = this.getNumberOfDays(log);
      avg = (sum / totalDays);
      return parseFloat(avg.toFixed(2));
    }

  }


  /**
   * Calculate Number of Step Log Days
   * @param log 
   */
  getNumberOfDays(log = []) {

    var uniqueDates = 1;

    if (log.length > 0) {
      var allDates = log.map(elem => elem.dateTime);
      uniqueDates = (Array.from(new Set(allDates))).length;
    }

    return uniqueDates;
  }
}
