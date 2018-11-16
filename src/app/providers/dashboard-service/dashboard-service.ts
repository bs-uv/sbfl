import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FitbitApiProvider } from '../fitbit-api/fitbit-api';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
/*
  Generated class for the DashboardServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DashboardServiceProvider {

  fitbit_access_token: string;
  fitbit_user_id: string;

  constructor(
    public http: Http,
    public auth: AuthService,
    private fitbit: FitbitApiProvider
  ) {
    this.auth = auth;
    this.fitbit_access_token = this.auth.user.fitbit.access_token;
    this.fitbit_user_id = this.auth.user.fitbit.user_id;
  }

  public getQuarterInfo() {
    return this.getGetOrdinal(this.fitbit.getQuarter(this.auth.user.createdAt));
  }

  public getScoreInfo() {
    return 0;
  }

  /**
     * Calculate Weight Goal Progress
     */
  calcualetWeightGoalProgress() {
    

    return Observable.forkJoin([
      this.fitbit.getWeightGoal(this.fitbit_access_token, this.fitbit_user_id),
      this.fitbit.getWeightLog(this.fitbit_access_token, this.fitbit_user_id),
    ])
      // .subscribe(data => {

        

      // },
      // err => {
      //   console.log("Error occured to get weight goal from fitbit");
      //   console.log(err);
      //   return progressPercent = 0;
      // })
      ;
  }

  processWeightGoalCalculation(data){
    // Initially progress percent will be zero
    let progressPercent = 0;
    
    var goal = data[0].goal;
        var weightLog = data[1].weight;

        var change: number;
        var progress: number;

        var AvgWeight = parseFloat(this.getAvgWeight(weightLog));

        if (AvgWeight <= 0) {
          AvgWeight = parseFloat(goal.startWeight);
        }

        if (goal.startWeight < goal.weight) {     // User want to increase weight
          change = goal.weight - goal.startWeight;
          progress = AvgWeight - parseFloat(goal.startWeight);
        } else { // User want to decrease weight
          change = goal.startWeight - goal.weight;
          progress = parseFloat(goal.startWeight) - AvgWeight;
        }



        if (progress >= 0 && change > 0) {
          progressPercent = (progress / change) * 100;
        }

        return progressPercent;
  }
  /**
   * Calculate Average Weight
   * @param weightLog 
   */
  getAvgWeight(weightLog = []) {
    var avgweight = 0;
    var sum = weightLog.reduce(function (prevVal, elem) {
      return prevVal + elem.weight;
    }, 0);

    if (weightLog.length > 0) {
      avgweight = (sum / weightLog.length);
    }
    return avgweight.toFixed(2);
  }


















  private getGetOrdinal(n) {
    var s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

}
