import { Component, Input } from '@angular/core';
import { GroupCategory } from '../../models/group-category';

/**
 * Generated class for the GroupCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'group-card',
  templateUrl: 'group-card.html'
})
export class GroupCardComponent {

  @Input('hit') hit: any;
  @Input('category') category: GroupCategory;
  @Input('display') display?: string = 'short';

  constructor() {
   
  }

  ngAfterContentInit() {
    
  }
}
