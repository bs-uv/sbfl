import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ObjtoarrayPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'objtoarray',
})
export class ObjtoarrayPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(obj: object) {
    return Object.keys(obj).map(function(key) {
      return obj[key];
    });
  }
}
