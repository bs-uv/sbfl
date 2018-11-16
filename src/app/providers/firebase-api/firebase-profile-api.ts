import { Injectable } from '@angular/core';

import { User } from '../../models/user.interface';
import { AdditionalInfo } from '../../models/additional-info.interface';

import { UtilsService } from '../utils/utils.service';
import { take } from 'rxjs/operators';

import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
// import { FirebaseAuthService } from '../firebase-auth/firebase-auth.service';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { Observable } from 'rxjs/Observable';
// import * as firebase from 'firebase/app';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the FirebaseProfileApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProfileApiProvider {

  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  private userDoc: AngularFirestoreDocument<User>;
  user: Observable<any>;

  constructor(private db: AngularFireDatabase,
    private afs: AngularFirestore,
    private utils: UtilsService) {
  }

  getLeaders() {
    return this.afs.collection<User>('users', ref => ref.orderBy("score", "desc").orderBy("name", "asc").limit(3)).valueChanges();
  }

  // get user for challenge
  getAvailableUsersForChallenge(userId = null) {
    return Observable.zip(
      this.afs.collection('users').snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }).filter(userObj => userObj.id !== userId);
      }),
      this.afs.collection('users-settings').snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }).filter(userObj => userObj.id !== userId);
      }),

      (...results) => {
        let returndata = [];
        if (results[0] && results[0].length > 0) {
          returndata = results[0];
        }

        if (results[1] && results[1].length > 0) {
          for (let j = 0; j < results[1].length; j++) {
            let id = (results[1][j] && results[1][j]['challenge'] && results[1][j]['challenge'][status]) ? results[1][j]['id'] : '';
            if (id.length > 0) {
              for (var i = 0; i < returndata.length; i++) {
                if (returndata[i].id == id) {
                  returndata.splice(i, 1);
                  break;
                }
              }
            }
          }
        }


        // returndata['memberOfGroups'] = (results[1] && results[1]['groups']) ? results[1]['groups'] : {};

        //        console.log(results);

        return returndata;
      }
    );


    // return this.afs.collection('users-settings', ref => ref.where('challenge.status', '==', true)).snapshotChanges().map(actions => {
    //   return actions.map(a => {
    //     const data = a.payload.doc.data();
    //     const id = a.payload.doc.id;
    //     return { id, ...data };
    //   }).filter(userObj => userObj.id !== userId);
    // });
  }

  getProfile(userId) {
    this.user = this.afs.collection<User>('users').doc(userId).valueChanges();
    return this.user;
  }

  getFullProfile(userId) {
    let usersOb = this.afs.collection('users').doc(userId).snapshotChanges().map(a => {
      if (!a.payload.exists) {
        return false;
      }
      const data = a.payload.data();
      const id = a.payload.id;
      return { id, ...data };

    });

    let userGroupOb = this.afs.collection('users-group').doc(userId).snapshotChanges().map(a => {
      if (!a.payload.exists) {
        return false;
      }
      const data = a.payload.data();
      return { ...data };
    });

    let userSettingsOb = this.afs.collection('users-settings').doc(userId).snapshotChanges().map(a => {
      if (!a.payload.exists) {
        return false;
      }
      const data = a.payload.data();
      return { ...data };
    });

    return Observable.zip(
      usersOb,
      userGroupOb,
      userSettingsOb,

      (...results) => {
        let returndata = results[0];
        returndata['memberOfGroups'] = (results[1] && results[1]['groups']) ? results[1]['groups'] : {};
        returndata['settings'] = results[2];
        return returndata;
      }
    );
  }

  getUserFromDB(userId: string) {
    return this.db.list('users/' + userId).snapshotChanges().map(data => {
      let profile = {};
      data.forEach(action => {
        profile[action.key] = action.payload.val();
      });
      return profile;
    });
  }

  // updateProfile(userId, data) {
  //   console.log(data);
  //   return this.afs.collection<User>('users').doc(userId).update(data);
  // }

  // Users Settings
  getProfileSettings(userId) {
    this.user = this.afs.collection('users-settings').doc(userId).valueChanges();
    return this.user;
  }

  updateProfileSettings(userId, data) {

    let addData = {
      group: {
        goal: data['group.goal'],
      },
      challenge: {
        status: data['challenge.status'],
        goal: data['challenge.goal'],
      },
      speritual: {
        status: data['speritual.status'],
        goal: data['speritual.goal'],
      },
      finincial: {
        status: data['finincial.status']
      },
      emotional: {
        status: data['emotional.status']
      },
      fitbit: {
        reminderMin: data['fitbit.reminderMin']
      }
    };


    return this.afs.collection('users-settings').doc(userId).update(data).then(
      success => {
        // do nothing
      },
      error => {
        console.log("1. ", error);

        return this.afs.collection('users-settings').doc(userId).set(addData).then(
          s => {
            // Do nothing
          },
          e => {
            console.log("3. ", e);
          }
        ).catch(err => {
          console.log("4. ", err);
        })
      }
    );
  }

  // getUsesGroup(userId: string) {
  //   return this.afs.collection('users-group', ref => ref.where('members', '==', userId)).snapshotChanges().map(actions => {
  //     return actions.map(a => {
  //       const data = a.payload.doc.data();
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     });
  //   });
  // }


  getUsesGroup(userId: string) {
    return this.afs.collection('users-group').doc(userId).snapshotChanges().map(a => {
      if(!a.payload.exists){
        return false;
      }
      const data = a.payload.data();
      const id = a.payload.id;
      return { id, ...data };
    });
  }

}
