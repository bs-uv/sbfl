import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { UtilsService } from "../utils/utils.service";

@Injectable()
export class FirebaseAuthApiProvider {

  authStateSubscriber: any;
  userSubscriber: any;

  userId: string;
  user: firebase.User;
  authState: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afd: AngularFireDatabase,
    private afs: AngularFirestore,
    private utils: UtilsService
  ) {

    this.authState = afAuth.authState;

    this.authStateSubscriber = this.authState.subscribe((user: firebase.User) => {
      this.user = user;
      if (user) {
        this.userId = user.uid
        this.updateOnConnect();
        this.updateOnDisconnect();

        this.userSubscriber = this.afd.object('/users/' + this.userId + '/access_token').snapshotChanges().subscribe(
          action => {
            
            let token = (action.payload.val());

            // Update expiration time based on new access_token
            // let parsedtoken = this.utils.parseToken(token);
            // if (parsedtoken && localStorage.getItem('profile')) {
            //   let exp = parsedtoken.exp * 1000;
            //   localStorage.setItem("expires_at", JSON.stringify(exp));
            // }

          }
        );

      }
    });

  }

  /// Helper to perform the update in Firebase
  private updateStatus(status: string) {
    if (!this.userId) return;
    this.afd.object(`users/` + this.userId).update({ status: status })
  }
  /// Updates status when connection to Firebase starts
  private updateOnConnect() {
    return this.afd.object('.info/connected').valueChanges().subscribe(connected => {
      let status = connected ? 'online' : 'offline'
      this.updateStatus(status)
    });
  }

  /// Updates status when connection to Firebase ends
  private updateOnDisconnect() {
    firebase.database().ref().child(`users/${this.userId}`)
      .onDisconnect()
      .update({ status: 'offline' })
  }

  signUp(email, password, name) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        this.afd.list('/userProfile').update(newUser.user.uid, { email: email, name: name });
      });
  }

  loginUser(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  loginUserWithToken(token: string, profile) {

    return this.afAuth.auth.signInWithCustomToken(token).then(

      loggedinUser => {
        console.log('Firebase auth:', loggedinUser);
        console.log("Profile", profile);
        let userdata = {
          name: profile.name,
          photoURL: profile.picture,
          reload: false,
          access_token: profile.fitbit.access_token || '',
          regDate: profile.createdAt,
          offsetFromUTCMillis: profile.offsetFromUTCMillis  || -25200000,
          timezone: profile.timezone  || 'America/Los_Angeles',
          locale: profile.locale  || '',
        };
        console.log(userdata);
        this.afd.list('/users').update(profile.sub, userdata).then(
          rs => {
            console.log(rs);
          },
          er => {
            console.log(er);
          }
        );

      },
      error => {
        console.log("Firebase custom login error:", error);
      }
    );
  }

  logoutUser() {
    // this.updateStatus('offline');
    try{
      this.userSubscriber.unsubscribe();
      this.authStateSubscriber.unsubscribe();
    }catch(e){
      console.log(e);
    }finally{
      return this.afAuth.auth.signOut();
    }
    
    
  }

  resetPassword(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }


  getUserData() {
    return this.afd.object('/users/' + this.userId);
  }

  getReloadStatus() {
    console.log(this.userId);
    return this.afd.object('/users/' + this.userId + '/reload').valueChanges();
  }

  updateReloadStatus(status) {
    console.log("Update status called");
    let userdata = {
      reload: false
    };
    if (this.userId) {
      this.afd.list('/users').update(this.userId, userdata).then(
        l => {
          console.log(l);
        }
      ).catch(w => {
        console.log(w);
      });
    }
  }
}
