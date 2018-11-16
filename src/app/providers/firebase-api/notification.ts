
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {

  private notificationCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.notificationCollection = afs.collection<any>('notification');
  }

  getNotification(userId: string) {
    return this.afs.collection('notification').doc(userId).collection('message', ref => ref.orderBy('lastUpdate', 'desc')).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  removeNotification(userId: string, notificationId: string) {
    console.log(userId, notificationId);
    return this.afs.collection('notification').doc(userId).collection('message').doc(notificationId).delete();
  }

}
