import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Group } from '../../models/group.interface';

@Injectable()
export class GroupService {

  private groupCollection: AngularFirestoreCollection<Group>;

  constructor(private afs: AngularFirestore) {
    this.groupCollection = afs.collection<any>('group');
  }

  getGroup() {
    return this.afs.collection('group', ref => ref.orderBy('name', 'asc')).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Group;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  saveGroup(group: Group) {
    // console.log(group);
    let data = Object.assign({}, group);
    data._geoloc = Object.assign({}, group._geoloc);
    console.log(data)
    return this.groupCollection.add(data);
  }


  getGroupMember(groupId: string) {

    return this.afs.collection('group').doc(groupId).collection('members').snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });

    // return this.afs.collection('group').doc(groupId).collection('members').snapshotChanges().map(a => {
    //   if (a.payload.exists === false) {
    //     return null;
    //   } else {
    //     return a.payload.data();
    //     // const data = a.payload.data();
    //     // const id = a.payload.id;
    //     // return { id, ...data };
    //   }
    // });
  }

  saveGroupMember(groupId: string, memebrId: string, status: boolean) {

    let data = {
      status: status
    }

    return this.groupCollection.doc(groupId).collection('members').doc(memebrId).update(data).then(
      data => {
        return data;
      },
      e => {
        this.groupCollection.doc(groupId).collection('members').doc(memebrId).set(data).then(data => {
          return data;
        });
      }
    ).catch(
      e => {
        console.log(e);
      }
    );
  }

}
