import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UtilsService } from '../../providers/utils/utils.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Platform, App, NavController, NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
/**
 * Generated class for the VersionCheckComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'version-check',
  templateUrl: 'version-check.html'
})
export class VersionCheckComponent {

  display = true;
  appInfo: any = {
    name: '',
    version: '',
    build: ''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private plft: Platform,
    private app: App,
    private appVersion: AppVersion,
    public alertCtrl: AlertController,
    public util: UtilsService,
  ) {

  }

  ngOnInit() {
    // ##CHANGE_ROUTE##
    // this.viewCtrl.didEnter.subscribe(() => {
    //   this.checkVersion();
    // });
  }

  checkVersion() {
 
    if (this.plft.is("desktop") || this.plft.is("pwa")) {

    } else {
      this.appVersion.getVersionCode().then(data => {
        this.appInfo.build = data;
      });
      this.appVersion.getVersionNumber().then(data => {
        this.appInfo.version = data;
      });

      // Get server version
      this.util.getAppVersion().subscribe(
        data => {
          if (data.build > this.appInfo.build) {
            // ##CHANGE_ROUTE##
            // this.navCtrl.setRoot("VersionUpdatePage");
          }
        }
      )
    }
  }

  // showAlert() {
  //   const alert = this.alertCtrl.create({
  //     title: 'New version available!',
  //     subTitle: 'Please, update app to new version to continue!',
  //     buttons: [{
  //       text: 'Update Now',
  //       handler: () => {
  //         this.open();
  //       }
  //     }]
  //   });
  //   alert.present();
  // }

}
