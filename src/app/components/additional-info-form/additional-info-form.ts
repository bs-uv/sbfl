import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdditionalInfoClass } from '../../models/additional-info.class';
import { AdditionalInfo } from '../../models/additional-info.interface';
import { FirebaseProfileApiProvider } from '../../providers/firebase-api/firebase-api';
import { AuthService } from '../../services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';

/**
 * Generated class for the AdditionalInfoFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'additional-info-form',
  templateUrl: 'additional-info-form.html'
})
export class AdditionalInfoFormComponent {

  @Output() result = new EventEmitter<boolean>();
  displayForm: boolean = false;
  loader: any;

  profileSubscription: any;

  model?: AdditionalInfo;
  additionalInfoForm: FormGroup;
  submitted = false;
  settings = {
    challenge: false
  }
  formdata = {
    fitbitReminderTime: 10,
    totalGroup: 0,
    challenge: false,
    totalChallenge: 0,
    speritualGroup: false,
    totalSperitualGroup: 0,
    finincialCounseling: false,
    emotionalCounseling: false,
  };

  constructor(
    public auth: AuthService,
    public fp: FirebaseProfileApiProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {

  }

  ngOnInit() {
    this.model = new AdditionalInfoClass(this.formdata);

    this.profileSubscription = this.fp.getProfileSettings(this.auth.user.sub).subscribe(
      profile => {
        if (profile) {
          console.log(profile);
          this.model = Object.assign(this.model, profile);

          this.model.totalGroup = (profile.group && profile.group.goal) ? profile.group.goal : 0;
          this.model.challenge = (profile.challenge && profile.challenge.status) ? profile.challenge.status : false;
          this.model.totalChallenge = (profile.challenge && profile.challenge.goal) ? profile.challenge.goal : 0;
          this.model.speritualGroup = (profile.speritual && profile.speritual.status) ? profile.speritual.status : false;
          this.model.totalSperitualGroup = (profile.speritual && profile.speritual.goal) ? profile.speritual.goal : 0;
          this.model.finincialCounseling = (profile.finincial && profile.finincial.status) ? profile.finincial.status : false;
          this.model.emotionalCounseling = (profile.emotional && profile.emotional.status) ? profile.emotional.status : false;
          this.model.fitbitReminderTime = (profile.fitbit && profile.fitbit.reminderMin) ? profile.fitbit.reminderMin : 10;
          
         }
        this.convertToNumber();
        this.displayForm = true;

      }
    );
  }

  ngOnDestroy() {
    this.profileSubscription.unsubscribe();
  }

  onSubmit() {

    this.presentLoading();
    this.convertToNumber();

    this.submitted = true;
    let data = Object.assign({}, this.model);

    let savedata = {
      "group.goal": this.model.totalGroup,
      "challenge.status": this.model.challenge,
      "challenge.goal": this.model.totalChallenge,
      "speritual.status": this.model.speritualGroup,
      "speritual.goal": this.model.totalSperitualGroup,      
      "finincial.status": this.model.finincialCounseling,
      "emotional.status": this.model.emotionalCounseling,
      "fitbit.reminderMin": this.model.fitbitReminderTime,
    };

    this.fp.updateProfileSettings(this.auth.user.sub, savedata).then(
      successData => {
        this.hideLoading();
        this.result.emit(true);
      },
      error => {
        this.hideLoading();
      }
    );
  }

  convertToNumber() {
    if (typeof (this.model.totalGroup) == 'string') {
      this.model.totalGroup = parseInt(this.model.totalGroup, 10);
    }
    if (typeof (this.model.totalChallenge) == 'string') {
      this.model.totalChallenge = parseInt(this.model.totalChallenge, 10);
    }
    if (typeof (this.model.totalSperitualGroup) == 'string') {
      this.model.totalSperitualGroup = parseInt(this.model.totalSperitualGroup, 10);
    }

    // If total group less than total speritual group, then calculate total group
    if (this.model.totalGroup < this.model.totalSperitualGroup) {
      this.model.totalGroup = this.model.totalSperitualGroup;
    }
  }

  async presentLoading() {
    this.loader = this.loadingCtrl.create({
      message: "Please wait...",
    });
    return await this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss();
  }

}
