import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationProvider } from '../../providers/firebase-api/firebase-api';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { ISubscription } from 'rxjs/Subscription';

/**
 * Generated class for the NotificationListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'notification-list',
  templateUrl: 'notification-list.html'
})
export class NotificationListComponent {

  notificationSubscription: ISubscription;
  list: any[];

  userId: string;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public auth: AuthService,
    public fireAPI: NotificationProvider, ) {
    
  }

  async showConfirm(notificationId: string) {
    let confirm = await this.alertCtrl.create({
      header: 'Would you like to proceed?',
      message: 'This operation will permanently remove this notification and cannot be undone.',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.remove(notificationId);
          }
        }
      ]
    });
    return await confirm.present();
  }

  remove(notificationId: string) {
    this.fireAPI.removeNotification(this.userId, notificationId).then(
      data => {
        console.log("Notification removed");
      }
    )
  }


  ngOnInit() {
    var userId = this.auth.user.sub;
    this.userId = userId;
    
    this.notificationSubscription = this.fireAPI.getNotification(userId).subscribe(
      data => {
        console.log("Notification", data);
        this.list = data.map(elem => {
          return elem;
        });
      }
    );
  }

  ngOnDestroy(){
    this.notificationSubscription.unsubscribe();
  }

}
