import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the BeautifyMessagePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'beautifyMessage',
})
export class BeautifyMessagePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value = value.replace(/(?:\r\n|\r|\n)/g, '<br />');
  }
}
