import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Channel } from '../../models';
import { FirebaseMessageApiProvider, FirebaseProfileApiProvider } from '../../providers/firebase-api/firebase-api';
import { take } from 'rxjs/operators';
import { NavController, NavParams } from '@ionic/angular';

/**
 * Generated class for the MemberProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'member-profile',
  templateUrl: 'member-profile.html'
})
export class MemberProfileComponent {

  member: any;
  @Input('uid') uid: string;
  @Input('memberId') memberId: string;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private auth: AuthService,
    private fireAPI: FirebaseMessageApiProvider,
    private fireProfileService: FirebaseProfileApiProvider
  ) {

  }

  ngOnChanges() {

  }

  openDetails(details: string, channelId: string) {
    // ##CHANGE_ROUTE##

    // this.navCtrl.push(details, {
    //   channelId: channelId
    // });
  }
  public processChannelCreation() {

    this.fireProfileService.getProfile(this.memberId).pipe(take(1)).subscribe(
      data => {
        this.member = data;
        let subscribe = {};

        const userA = this.memberId;
        const userB = this.auth.user.sub;

        console.log(data);

        subscribe[userA] = {
          // name: '',
          // photoUrl: '',
          subscribe: true,
        };

        subscribe[userB] = {
          // name: this.auth.user.name,
          // photoUrl: this.auth.user.picture,
          subscribe: true,
        }

        let channelData: Channel = {
          name: this.member.name + " & " + this.auth.user.name,
          photoUrl: "",
          type: "one-to-one-member",
          subscribers: subscribe,
          updatedAt: new Date().getTime()
        };


        // Find whether this one to one member channel is already exist
        this.fireAPI.validateOneToOneChannle(userA, userB, "one-to-one-member").pipe(take(1)).subscribe(
          cdata => {
            if(cdata.length > 0){
              // Channel already exist
              console.log(cdata);
              this.openDetails("MessageDetailsPage", cdata[0]['id']);
            }else{
              // Create new channel
              this.fireAPI.createChannel(channelData).then(
                res => {
                  console.log("Success", res.id);
                  this.openDetails("MessageDetailsPage", res.id);
                },
                err => {
                  console.log("Error", err);
                }
              ).catch(e => {
                console.log("Exception", e)
              });
            }
          },
          err => {
            console.log(err);
          }
        )

        

      }
    );

  }
}
