import { Directive, ElementRef } from '@angular/core';

/**
 * Generated class for the MessageDateDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[message-date]' // Attribute selector
})
export class MessageDateDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }

}
