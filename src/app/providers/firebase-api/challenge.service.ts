import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Challenge } from '../../models/challenge.interface';
import { ChallengeMember } from '../../models/challenge-member.interface';

@Injectable()
export class ChallengeService {

  private challengeRef: AngularFirestoreCollection<Challenge>;
  private memberRef: AngularFirestoreCollection<ChallengeMember>;

  constructor(private afs: AngularFirestore) {
    this.challengeRef = afs.collection<any>('challenge');
    this.memberRef = afs.collection<any>('challenge-member');
  }

  getChallenges(userId = null) {
    if (userId) {
      return this.afs.collection('challenge', ref => ref.where('members.' + userId + '.id', '==', userId)).snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Challenge;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
    }
    return this.challengeRef.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Challenge;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  save(challenge: Challenge, members = []) {
    let data = Object.assign({}, challenge);
    let memberData = {};
    console.log(members);
    members.forEach((member, index) => {
      memberData[member.id] = member;
    });

    data['members'] = memberData;
    // console.log(data);
    return this.challengeRef.add(data).then(
      res => {
        return res;
        // let id = res.id;
        // return this.memberRef.doc(id).update(memberData).then(
        //   result => {
        //     return result;
        //   },
        //   error => {
        //     return this.memberRef.doc(id).set(memberData);
        //   }
        // );


      }
    );
  }

  action(challenge, userId, type) {

    let challengeId = challenge.id;

    if (type == 'ACCEPT') {
      let data = {};
      data['startAt'] = new Date().getTime();
      data['status'] = 'active';
      let key = 'members.' + userId + '.isAccepted';
      data[key] = true;
      return this.challengeRef.doc(challengeId).update(data);
    } else {
      let totalMembers = (Object.values(challenge.members).length);
      if (totalMembers < 3) {
        return this.challengeRef.doc(challengeId).delete();
      } else {
        let data = {};
        delete challenge.members[userId];
        data["members"] = challenge.members;
        return this.challengeRef.doc(challengeId).update(data);
      }

    }

  }

}
