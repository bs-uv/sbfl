import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FirebaseProfileApiProvider } from '../../providers/firebase-api/firebase-api';

@Component({
  selector: 'profile-element',
  templateUrl: './profile-element.component.html',
})
export class ProfileElementComponent implements OnInit, OnChanges {

  @Input('uid') id: string;
  @Input('attribute') attribute: string;
  @Input('class') class?: string;
  
  profile: any = {};
  image: string;
  

  constructor(private fireProfileService: FirebaseProfileApiProvider) {
    this.image = "https://greenhost.net/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png";
  }

  ngOnChanges() {
    this.fireProfileService.getUserFromDB(this.id).subscribe(data => {
      this.profile = data;
    });
  }

  ngOnInit() {
  }

}
