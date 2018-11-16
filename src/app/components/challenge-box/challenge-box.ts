import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChallengeService } from '../../providers/firebase-api/firebase-api';
import { CHALLENGES } from '../../mocks/resources/unites';

import { PopoverController } from '@ionic/angular';
// import { ChallengeActionsPage } from '../../pages/challenge-actions/challenge-actions';

/**
 * Generated class for the ChallengeBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'challenge-box',
  templateUrl: 'challenge-box.html'
})
export class ChallengeBoxComponent {

  @Input('row') row: any;
  challenges;

  constructor(
    public popoverCtrl: PopoverController,
    public auth: AuthService,
    public cs: ChallengeService
  ) {
    this.challenges = CHALLENGES;
  }

  async presentPopover(myEvent, challenge) {
    // let popover = await this.popoverCtrl.create(
    //   {
    //     component: ChallengeActionsPage,
    //     event: myEvent,
    //   });
    //   return await popover.present();
  }

  public action(challenge, userId, type) {
    this.cs.action(challenge, userId, type).then(
      rs => {
        console.log(rs);
      }
    ).catch(
      err => {
        console.log(err);
      }
    )
  }

}

