import { Component, Input } from '@angular/core';
import { FirebaseMessageApiProvider, FirebaseAuthApiProvider, PaginationProvider } from '../../providers/firebase-api/firebase-api';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from '@angular/fire/auth';


/**
 * Generated class for the MessageListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'message-list',
  templateUrl: 'message-list.html'
})
export class MessageListComponent {

  messageSubscription: any;

  @Input() channelId: string;
  display: boolean = true;
  previous: any;

  messages: any[];
  messageIds: any[];

  constructor(
    public fireMessageAPI: FirebaseMessageApiProvider,
    public fireAuthAPI: FirebaseAuthApiProvider,
    public afAuth: AngularFireAuth,
    public page: PaginationProvider
  ) {

  }

  setPrevious(data){
    this.previous = data;
  }

  log(val) {
    console.log(val);
  }
  
  ngOnChanges() {
    console.log(this.channelId);
    // this.page.init(this.channelId, 'createdAt', { reverse: true, prepend: true });
    this.messageSubscription = this.fireMessageAPI.getMessages(this.channelId).subscribe(data => {
      if (!this.messages) {
        this.messages = data;
        this.messageIds = data.map(message => { return message.id });
      } else {
        data.map(message => {
          if(!this.messageIds.includes(message.id)){
            this.messageIds.push(message.id);
            this.messages.push(message);
          }
        })
      }
    });

  }

  scrollHandler(e) {
    console.log(e)
    // should log top or bottom
    if (e === 'top') {
      this.page.more()
    }
  }

  ngOnDestroy(){
    this.messageSubscription.unsubscribe();
  }


}
