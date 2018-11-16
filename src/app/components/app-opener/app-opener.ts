import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FirebaseProfileApiProvider } from '../../providers/firebase-api/firebase-api';
import { AuthService } from '../../services/auth.service';
import { ISubscription } from 'rxjs/Subscription';
// import { dateDataSortValue } from '@ionic/angular/util/datetime-util';
import { ValueTransformer } from '@angular/compiler/src/util';
import { Observable } from 'rxjs/Rx';
/**
 * Generated class for the AppOpenerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-opener',
  templateUrl: 'app-opener.html'
})
export class AppOpenerComponent {

  lastSyncTime: any;
  currentTime: any;

  display: boolean = false;
  nodata: boolean = true;
  timer: any;

  profileData: any;

  private subscription: ISubscription;
  private firesubscription: ISubscription;

  constructor(
    public platform: Platform,
    public auth: AuthService,
    private fireProfileAPI: FirebaseProfileApiProvider
  ) {
    this.nodata = true;
  }

  ngAfterViewInit() {
    this.firesubscription = this.fireProfileAPI.getUserFromDB(this.auth.user.sub).subscribe(
      firebaseProfile => {
        console.log('Called');
        if (this.nodata) {
          this.doSubscription();
        }
      }
    );
  }

  private doSubscription() {

    this.subscription = this.fireProfileAPI.getFullProfile(this.auth.user.sub).subscribe(
      data => {
        if (data) {
          this.nodata = false;
          this.profileData = data;
          console.log("Profile has been updated");
          this.processData();

          if (!this.timer) {
            this.timer = Observable.timer(2000, 1000);
            this.timer.subscribe(t => { this.processData(); });
          }

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

    if (this.profileData.device && this.profileData.device.lastSyncTime > 0) {

      let interval = 10;
      if (this.profileData.settings && this.profileData.settings.fitbit && this.profileData.settings.fitbit.reminderMin) {
        interval = this.profileData.settings.fitbit.reminderMin * 1;
      }

      this.lastSyncTime = this.profileData.device.lastSyncTime;
      if(this.lastSyncTime == "25200000"){

      }
      this.currentTime = new Date().valueOf();

      const buffer = interval * 60 * 1000; // Convert min to milisecond

      this.display = (this.currentTime > this.lastSyncTime + buffer) && (this.lastSyncTime > "25200000");

    }
  }

  public open() {

    let storeConst = {
      fitbitApp: {
        ios: {
          storeUrl: 'itms-apps://itunes.apple.com/us/app/fitbit/id462638897?mt=8',
          appId: 'fitbit://'
        },
        android: {
          storeUrl: 'market://details?id=com.fitbit.FitbitMobile',
          appId: 'com.fitbit.FitbitMobile'
        }
      }
    }

    if (this.platform.is('android')) {
      let appId = storeConst.fitbitApp.android.appId;
      let appStarter = (window as any).startApp.set({ "package": appId });
      appStarter.start(function (msg) {
        console.log('starting Fitbit: ' + msg);
      }, function (err) {
        console.log('Fitbit app not installed', err);
        window.open(storeConst.fitbitApp.android.storeUrl, '_system');
      });
    } else if (this.platform.is('ios')) {
      let appId = storeConst.fitbitApp.ios.appId;
      let appStarter = (window as any).startApp.set(appId);
      appStarter.start(function (msg) {
        console.log('starting Fitbit app: ' + msg);
      }, function (err) {
        console.log('Fitbit app not installed', err);
        window.open(storeConst.fitbitApp.ios.storeUrl, '_system'
        );
      });
    } else {
      let msg_err = "Platform not supported";
      alert(msg_err);
      console.log(msg_err);
    }

  }
  // public open() {
  //   let destination = '23.777176,90.399452';

  //   if (this.platform.is('ios')) {
  //     window.open('maps://?q=' + destination, '_system');
  //   } else {
  //     let label = encodeURI('My Label');
  //     window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
  //   }

  // }

  ngOnDestroy() {
    this.firesubscription.unsubscribe();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  log(){
    this.fireProfileAPI.getAvailableUsersForChallenge(this.auth.user.sub).subscribe(
      res => {
        console.log(res);
      }
    )
  }
}
