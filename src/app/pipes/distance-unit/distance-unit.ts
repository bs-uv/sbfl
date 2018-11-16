import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DistanceUnitPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'distanceUnit',
})
export class DistanceUnitPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number, ...args) {
    return (value * 0.000621371).toFixed(2) + ' mile';
  }
}
