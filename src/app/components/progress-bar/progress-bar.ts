import { Component, Input } from '@angular/core';

/**
 * Generated class for the ProgressBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {

  @Input('progress') progress: string;
  @Input('color') color: string;
  @Input('score') score: string;
  @Input('unit') unit: string;
  @Input('color-degraded') degraded: any;

  constructor() {
    console.log('Hello ProgressBarComponent Component');
    // Default color
    this.color = "#488aff";
  }



  /**
   * Returns a color for a certains percent
   * @param percent The current progress
   */
  whichColor(percent: string) {
    // Get all entries index as an array
    let k: Array<any> = Object.keys(this.degraded);
    // Convert string to number
    k.forEach((e, i) => k[i] = +e);
    // Sort them by value
    k = k.sort((a, b) => a - b);
    // Percent as number
    let p = +percent
    // Set last by default as the first occurence
    let last = k[0];
    // Foreach keys 
    for (let val of k) {
      // if current val is < than percent
      if (val < p) {
        last = val;
      }
      // if val >= percent then the val that we could show has been reached
      else if (val >= p - 1) {
        return this.degraded[last];
      }
    }
    // if its the last one retrun the last
    return this.degraded[last];
  }

  whichProgress(progress: number) {
    try {
      return Math.round(progress * 100) / 100;
    }
    catch{
      return progress;
    }
  }

}
