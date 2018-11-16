import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { GroupCategory } from '../../models/group-category';

@Injectable()
export class GroupCategoryService {

  private categoryCollection: AngularFirestoreCollection<GroupCategory>;

  constructor(private afs: AngularFirestore) {
    this.categoryCollection = afs.collection<any>('group-category');
  }

  getGroupCategory() {
    return this.afs.collection('group-category', ref => ref.orderBy('ordering', 'asc')).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as GroupCategory;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  saveGroupCategory(category: GroupCategory) {
    let data = Object.assign({}, category);
    console.log(data)
    this.categoryCollection.add(data).then(
      successData => {
        console.log(successData);
      }
    );
  }

}
