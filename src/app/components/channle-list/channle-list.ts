import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseMessageApiProvider } from '../../providers/firebase-api/firebase-api';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { ISubscription } from 'rxjs/Subscription';

/**
 * Generated class for the ChannleListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'channle-list',
  templateUrl: 'channle-list.html'
})
export class ChannleListComponent {
  details: boolean = false;
  friendSubscription: ISubscription;
  channelSubscription: ISubscription;

  friends: any[];
  channels: any[];

  userId: string;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public auth: AuthService,
    public fireAPI: FirebaseMessageApiProvider, ) {
    
  }

  toggle() {
    this.details = !this.details;
  }

  async showConfirm(channelId: string) {
    let confirm = await this.alertCtrl.create({
      header: 'Would you like to proceed?',
      message: 'This operation will permanently remove this channel information and cannot be undone.',
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
            this.removeChannel(channelId);
          }
        }
      ]
    });
    return await confirm.present();
  }

  removeChannel(channelId: string) {
    this.fireAPI.removeChannel(channelId).then(
      data => {
        console.log("Channel removed");
      }
    )
  }

  openDetails(details: string, channelId: string) {
    // ##CHANGE_ROUTE##
    // this.navCtrl.push(details, {
    //   channelId: channelId
    // });
  }

  ngOnInit() {
    var userId = this.auth.user.sub;
    this.userId = userId;

    // this.fireAPI.getChannles(userId, 'help-line').subscribe(
    //   clannels => {
    //     console.log('Snapshot has changed');
    //     this.helplines = clannels.map(elem => {
    //       elem['name'] = "All Coaches";
    //       return elem;
    //     });
    //   }
    // );
    
    this.friendSubscription = this.fireAPI.getChannles(userId, 'one-to-one-member').subscribe(
      friends => {
        console.log("friends", friends);
        this.friends = friends.map(elem => {
          // let coach;
          // Object.keys(elem['subscribers']).forEach(function (key, index) {
          //   if (key != userId) {
          //     coach = elem['subscribers'][key];
          //   }
          // });
          // elem['name'] = coach['name'];
          // elem['photoUrl'] = coach['photoUrl'];
          return elem;
        });
      }
    );
    this.channelSubscription = this.fireAPI.getChannles(userId, 'one-to-one-coach').subscribe(
      clannels => {
        console.log('Snapshot has changed');
        this.channels = clannels.map(elem => {
          let coach;
          Object.keys(elem['subscribers']).forEach(function (key, index) {
            if (key != userId) {
              coach = elem['subscribers'][key];
            }
          });
          // elem['name'] = coach['name'];
          // elem['photoUrl'] = coach['photoUrl'];
          return elem;
        });
      }
    );
  }

  ngOnDestroy(){
    this.friendSubscription.unsubscribe();
    this.channelSubscription.unsubscribe();
  }

}
