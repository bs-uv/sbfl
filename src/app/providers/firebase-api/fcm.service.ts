
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from '@ionic/angular';
import { FirebaseAuthApiProvider } from './firebase-auth-api';
import { AngularFirestore } from '@angular/fire/firestore';

/*
  Generated class for the FirebaseCloudMessagingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FcmProvider {

  constructor(
    private afAuthApi: FirebaseAuthApiProvider,
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    private platform: Platform
  ) {
    console.log('Hello FirebaseCloudMessagingProvider Provider');
  }

  // Get permission from the user
  async getToken() {
    let token;

    if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken()
    }

    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }

    return this.saveTokenToFirestore(token)
  }

  // Save the token to firestore
  private saveTokenToFirestore(token) {
    if (!token) return;

    const devicesRef = this.afs.collection('devices')

    const docData = {
      token,
      userId: this.afAuthApi.user.uid,
    }

    return devicesRef.doc(token).set(docData)
  }

  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen()
   }
}
