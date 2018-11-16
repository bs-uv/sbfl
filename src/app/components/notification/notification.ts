import { Component } from '@angular/core';
import { FcmProvider } from '../../providers/firebase-api/firebase-api';
import { ToastController, Platform } from '@ionic/angular';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';

/**
 * Generated class for the NotificationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'notification',
  templateUrl: 'notification.html'
})
export class NotificationComponent {


  constructor(
    public fcm: FcmProvider,
    public toastCtrl: ToastController,
    private platform: Platform
  ) {
    // Get a FCM token
    fcm.getToken();
    this.init();

  }

  async init() {
    if (!this.platform.is('android') && !this.platform.is('ios')) {
      // This is web platform
      const toast = await this.toastCtrl.create({
        message: "This is webplatform, cordova plugin for FCM will not work",
        duration: 3000,
        position: 'top'
      });
      return await toast.present();

    }

    // Listen to incoming messages
    this.fcm.listenToNotifications().pipe(
      tap(msg => {

        let messageText: string;
        console.log(msg);
        // messageText = msg.body;

        if (this.platform.is('android')) {
          // messageText = msg.body;
        }

        if (this.platform.is('ios')) {
          // messageText = msg.aps.alert.body;
        }
        
        this.showToast(messageText);


      })
    )
      .subscribe();
  }

  async showToast(messageText) {
    // show a toast
    const toast = await this.toastCtrl.create({
      message: messageText,
      duration: 3000,
      position: 'top'
    });
    return await toast.present();
  }
}
