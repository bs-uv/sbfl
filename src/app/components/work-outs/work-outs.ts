import { Component } from '@angular/core';
import { workouts } from '../../mocks/resources/workouts';
/**
 * Generated class for the WorkOutsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'work-outs',
  templateUrl: 'work-outs.html'
})
export class WorkOutsComponent {

  workouts: any;

  constructor() {
    this.workouts = workouts;
  }

}
