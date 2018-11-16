import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import * as moment from 'moment-timezone';
import { Events } from '@ionic/angular';

import {
  AngularFirestore,
  // AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { FirebaseAuthApiProvider } from './firebase-auth-api';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
// import * as firebase from 'firebase/app';

import { Message } from '../../models/message.interface';
import { Channel } from '../../models/channel.interface';

// import { Avatar } from '@ionic/angular/components/avatar/avatar';
// import { DateTime } from '@ionic/angular/components/datetime/datetime';


@Injectable()
export class FirebaseMessageApiProvider {

  private channelsCollection: AngularFirestoreCollection<any>;
  channels: Observable<any[]>;

  //Fire Store Ref
  messages: Observable<any[]>;
  msgList: Message[] = [];

  // Query Limit
  limit: number;
  page: number;

  // Send message status
  status: string; // In Progress, Completed, Failed
  statusList = {
    pending: 'Sending ...',
    success: 'success',
    failed: 'Failed to send message. Please resend.',
  }

  constructor(
    private afAuthApi: FirebaseAuthApiProvider,
    private afd: AngularFireDatabase,
    private afs: AngularFirestore,
    public events: Events
  ) {
    this.limit = 10;
    this.page = 1;
    this.channelsCollection = afs.collection<any>('channels');
  }

  getMessages(channelId: string) {

    return this.messages = this.afs.collection('channels').doc(channelId).collection('messages', ref => ref.orderBy('createdAt', 'desc')).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Message;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });

    // this.messages.subscribe((msgList) => {
    //   this.msgList = msgList;
    //   this.events.publish('message:new', msgList, Date.now());
    // });


    // this.messages = this.channelRef.doc(this.afAuthApi.user.uid).collection('messages', ref => ref.orderBy('createdAt', 'desc')).valueChanges();
    // this.messages.subscribe
    //   ((messages) => {
    //     this.events.publish('message:new', messages, Date.now());
    //   });

  }

  validateMessage(body: string) {
    let result = false;
    if (body && body.trim().length) {
      result = true;
    }
    return result;
  }

  sendMessage(body: string, channelId: string) {

    this.status = this.statusList.pending;

    let now = new Date().getTime();
    let readBy = {};
    readBy[this.afAuthApi.user.uid] = true;
    body = body.replace(/(^[ \t]*\n)/gm, "");

    // const id = this.afs.createId();
    if (this.validateMessage(body)) {
      var message: Message = {
        uid: this.afAuthApi.user.uid,
        body: body,
        readBy: readBy,
        createdAt: now,
      };

      // this.pendingMessage.push(message);
      // console.log(this.pendingMessage);

      var channelData: Channel = {
        name: channelId,
        lastMessage: body,
        updatedAt: now,
        status: "open",
      };


      return this.channelsCollection.doc(channelId).update(channelData).then(
        data => {
          this.insertMessage(message, channelId);
        },
        e => {
          this.channelsCollection.doc(channelId).set(channelData).then(data => {
            this.insertMessage(message, channelId);
          });
        }).catch(
          e => {
            this.status = this.statusList.failed;
            console.log(e);
          });
    } else {
      let myFirstPromise = new Promise((resolve, reject) => {
        resolve("Success!"); // Yay! Always failed
      });

      return myFirstPromise.then(
        rs => {
          this.status = this.statusList.failed;
        }
      );
    }
    
  }

  /**
   * Mark All unread messages as read
   */
  markAsRead(channelId: string, userId: string, messageList) {
    let readBy = {};
    readBy[userId] = true;
    messageList.forEach((msg) => {
      // console.log(msg);
      if (!msg.readBy || !msg.readBy[userId]) {
        this.channelsCollection.doc(channelId).collection('messages').doc(msg.id).update({ readBy: readBy });
      }
    });

  }

  private insertMessage(message: Message, channelId: string) {
    this.channelsCollection.doc(channelId).collection('messages').add(message).then(
      successData => {
        this.status = this.statusList.success;
        // console.log(successData);
      }
    );
  }


  /**
   * Channel
   */
  createChannel(channelData: Channel) {
    return this.channelsCollection.add(channelData);
  }

  removeChannel(channelId: string) {
    return this.channelsCollection.doc(channelId).delete();
  }

  viewChannel(channelId: string) {
    return this.channelsCollection.doc(channelId).snapshotChanges().map(a => {
        const data = a.payload.data() as Channel;
        const id = a.payload.id;
        return { id, ...data };
    });
  }

  validateOneToOneChannle(userA, userB, type: string = 'one-to-one-coach') {
    return this.afs.collection(
      'channels',
      ref => ref.where('subscribers.' + userA + '.subscribe', '==', true)
        .where('subscribers.' + userB + '.subscribe', '==', true)
        .where('type', '==', type)
    ).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  getChannles(userId: string, type: string) {
    return this.afs.collection(
      'channels',
      ref => ref.where('subscribers.' + userId + '.subscribe', '==', true)
        .where('type', '==', type)
    ).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  getHelpLines(type: string) {
    return this.channels =  this.afs.collection<any>('channels', 
    ref => ref.where('type', '==', type)
  ).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Channel;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  getCoaches() {
    return this.afd.list('/users', ref => ref.orderByChild('groups/coach').equalTo(true)).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.val();
        const id = a.key;
        return { id, ...data };
      });
    });
  }

}
