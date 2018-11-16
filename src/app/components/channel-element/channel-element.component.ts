import { Component, Input, OnInit } from '@angular/core';
import { FirebaseMessageApiProvider } from '../../providers/firebase-api/firebase-api';
import { Channel } from '../../models';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'channel-element',
  templateUrl: './channel-element.component.html'
})
export class ChannelElementComponent implements OnInit {

  private firesubscription: ISubscription;

  @Input() userId: string;
  @Input() channelId: string;
  @Input() template?: string = "header"; // header, list
  @Input() attribute?: string = "photoURL"; // name, photoURL

  users: any[] = [];

  channel: Channel;

  constructor(
    private fireMsgService: FirebaseMessageApiProvider
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.channelId) {
      this.firesubscription = this.fireMsgService.viewChannel(this.channelId).subscribe(data => {
        this.users = [];
        for (let d in data.subscribers) {
          if (d != this.userId) {
            this.users.push(d);
          }
        }
      });
    }
  }

  ngOnDestroy() {
    this.firesubscription.unsubscribe();
  }

}
