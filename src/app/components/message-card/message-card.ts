import { Component, Input } from '@angular/core';
import { Message } from '../../models/message.interface';
import * as moment from 'moment';
// import { UtcPipe } from 'angular2-moment';

/**
 * Generated class for the MessageCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'message-card',
  templateUrl: 'message-card.html'
})
export class MessageCardComponent {

  @Input('message') message: Message;
  @Input('ownerId') ownerId: any;
  @Input('prevMessage') prevMessage: Message;

  sameblock: boolean = false;
  readStatus: boolean = false;

  constructor() {
  }

  ngAfterContentInit() {
    // console.log(this.prevMessage);
    if (this.message.readBy && this.message.readBy[this.ownerId]) {
      this.readStatus = true;
    }
    if (this.prevMessage) {
      if (this.formateDate(this.prevMessage.createdAt) == this.formateDate(this.message.createdAt) && this.prevMessage.uid == this.message.uid) {
        this.sameblock = true;
      }
    }
  }

  formateDate(timestamp) {
    var t = new Date(timestamp);
    var formated = moment(t).format("dd.mm.YYYY hh:MM");
    // console.log(formated);
    return formated;
  }
}
