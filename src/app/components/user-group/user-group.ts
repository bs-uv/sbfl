import { Component, Input, ViewChild } from '@angular/core';
import { FirebaseProfileApiProvider } from '../../providers/firebase-api/firebase-profile-api';
import { environment } from '../../../environments/environment';
import { GroupCategoryService } from '../../providers/firebase-api/firebase-api';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { NavController, NavParams } from '@ionic/angular';
import { NgAisInstantSearch } from 'angular-instantsearch';
import { Group } from '../../models/group.interface';
import { GroupCategory } from '../../models/group-category';
import { GroupClass } from '../../models/group.class';
import { SearchParameters } from 'angular-instantsearch/instantsearch/instantsearch';
import { ISubscription } from 'rxjs/Subscription';

/**
 * Generated class for the UserGroupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user-group',
  templateUrl: 'user-group.html'
})
export class UserGroupComponent {

  @ViewChild('search') public searchElement: NgAisInstantSearch;
  @Input('userId') userId: string;

  userSubscription: ISubscription;
  categorySubscription: ISubscription;

  categories = [];

  options = {
    apiKey: environment.algolia.apiKey,
    appId: environment.algolia.appId,
    indexName: environment.algolia.indexName,
    routing: true
  };

  searchParameters: void | SearchParameters;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fpService: FirebaseProfileApiProvider,
    private gcService: GroupCategoryService,
    private geo: GeolocationProvider,
  ) {

  }

  ngOnInit() {
    // ##VIEW_CONTROLLER##

    // this.viewCtrl.didEnter.subscribe(() => {
    //   if (this.searchElement) {
    //     this.searchElement.refresh();
    //   }
    // });

    this.categorySubscription = this.gcService.getGroupCategory().subscribe(
      gc => {
        gc.map(c => {
          this.categories[c.slug] = c;
        });

        this.userSubscription =  this.fpService.getUsesGroup(this.userId).subscribe(
          data => {

            console.log(data);
            let ids = 'objectID:0';
            
            if (data['groups']) {
              let memberGroups = [];
              Object.keys(data['groups']).map(function (key) {
                if (data['groups'][key]) {
                  memberGroups.push(key);
                }
                return null;
              });
              if (memberGroups.length > 0) {
                ids = memberGroups.map((row) => "objectID:" + row).join(" OR ");
              }
            }

            console.log(ids);

            this.searchParameters = {
              aroundLatLng: this.geo.aroundLatLng(),
              getRankingInfo: true,
              hitsPerPage: 5,
              filters: ids
            };
          }
        );
      }
    );
  }

  openDetails(details: string, group?: Group, category?: GroupCategory) {
    // ##CHANGE_ROUTE##

    // this.navCtrl.push(details, { group: group, category: category });
  }

  ngOnDestroy(){
    this.categorySubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  // getIdes(){
  //   return this.gpService.getGroupByMember(this.userId).subscribe(
  //     data => {
  //       return data.map(row => "objectID:" + row.id).join(" OR ");

  //     }
  //   );
  // }
}
