import { Component } from '@angular/core';

/**
 * Generated class for the FirebaseProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'firebase-profile',
  templateUrl: 'firebase-profile.html'
})
export class FirebaseProfileComponent {

  text: string;

  constructor() {
    console.log('Hello FirebaseProfileComponent Component');
    this.text = 'Hello World';
  }

}
