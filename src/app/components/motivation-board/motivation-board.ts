import { Component, Input } from '@angular/core';
import { QUOTES } from '../../mocks/resources/quotes';
/**
 * Generated class for the MotivationBoardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'motivation-board',
  templateUrl: 'motivation-board.html'
})
export class MotivationBoardComponent {

  @Input() componentName?: string;
  @Input() title?: string;

  quotes: any;

  constructor() {
  }

  ngOnInit() {
    if(QUOTES[this.componentName]){
      this.quotes = this.shuffle(QUOTES[this.componentName]);
    }else{
      this.quotes = [];
    }
    
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

}
