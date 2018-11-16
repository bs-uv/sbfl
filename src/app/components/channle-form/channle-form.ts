import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { FirebaseMessageApiProvider } from '../../providers/firebase-api/firebase-api';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/take';
import { Channel } from '../../models/channel.interface';
import { ISubscription } from 'rxjs/Subscription';
/**
 * Generated class for the ChannleFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'channle-form',
  templateUrl: 'channle-form.html'
})
export class ChannleFormComponent {

  coachSubscription: ISubscription;
  channelSubscription: ISubscription;

  text: string;
  coaches = [];

  constructor(
    public navCtrl: NavController, public navParams: NavParams, 
    public auth: AuthService,
    public fireAPI: FirebaseMessageApiProvider,
  ) {
    this.auth = auth;


  }

  ngOnInit() {
    this.coachSubscription =this.fireAPI.getCoaches().subscribe(
      allcoaches => {

        this.channelSubscription = this.fireAPI.getChannles(this.auth.user.sub, 'one-to-one-coach').subscribe(
          channels => {
            let existCoaches = [];
            channels.map(elem => {
              Object.keys(elem['subscribers']).forEach(function (key, index) {
                existCoaches.push(key);
              });
            });
            this.coaches = allcoaches.filter(coache => {
              return !(existCoaches.indexOf(coache.id) > -1);
            })

          }
        );
      }
    );
  }

  ngOnDestroy(){
    this.coachSubscription.unsubscribe();
    this.channelSubscription.unsubscribe();
  }

  addCoach(coach) {

    this.processChannelCreation(coach);

  }

  openDetails(details: string, channelId: string) {
    // ##CHANGE_ROUTE##
    // this.navCtrl.setRoot(details, {
    //   channelId: channelId
    // });

    // this.navCtrl.push(details, {
    //   channelId: channelId
    // });
  }

  private processChannelCreation(coach) {

    var subscribe = {};
    subscribe[coach.id] = {
      // name: coach.name,
      // photoUrl: coach.photoURL,
      subscribe: true,
    };

    subscribe[this.auth.user.sub] = {
      // name: this.auth.user.name,
      // photoUrl: this.auth.user.picture,
      subscribe: true,
    }

    var channelData: Channel = {
      name: coach.name + " & " + this.auth.user.name,
      photoUrl: "",
      type: "one-to-one-coach",
      subscribers: subscribe,
      updatedAt: new Date().getTime()
    };

    this.fireAPI.createChannel(channelData).then(
      res => {
        console.log("Success", res.id);
        // this.openDetails("MessageDetailsPage",  res.id);
        this.openDetails("MessagePage",  res.id);
      },
      err => {
        console.log("Error", err);
      }
    ).catch(e => {
      console.log("Exception", e)
    });

  }
}
