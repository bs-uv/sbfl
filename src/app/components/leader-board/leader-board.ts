import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseProfileApiProvider } from '../../providers/firebase-api/firebase-profile-api';
import { ISubscription } from 'rxjs/Subscription';
/**
 * Generated class for the LeaderBoardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'leader-board',
  templateUrl: 'leader-board.html',
})
export class LeaderBoardComponent {

  fireSubscription: ISubscription;
  users: any;
  constructor(
    public auth: AuthService,
    private fireProfileAPI: FirebaseProfileApiProvider

  ) {

  }

  ngAfterViewInit() {
    this.fireSubscription = this.fireProfileAPI.getLeaders().subscribe(
      data => {
        console.log(data);
        this.users = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnDestroy(){
    this.fireSubscription.unsubscribe();
  }

}
