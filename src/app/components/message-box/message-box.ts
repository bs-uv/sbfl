import { Component, Input } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Observable } from 'rxjs/Observable';
import { ChangeDetectorRef } from '@angular/core';

import { FirebaseMessageApiProvider } from '../../providers/firebase-api/firebase-api';

/**
 * Generated class for the SendMessageBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'message-box',
  templateUrl: 'message-box.html'
})
export class MessageBoxComponent {
  @Input() channelId: string;
  text: string;
  // matches: String[];
  // isRecording = false;
  // isIos = false;


  constructor(
    public fireAPI: FirebaseMessageApiProvider,
    private platform: Platform,
    // private speechRecognition: SpeechRecognition, 
    // private cd: ChangeDetectorRef,
  ) {
    // this.isIos = this.platform.is('ios');
  }

  sendMessage(input) {

    let msg = this.text;
    this.text = "";
    this.focusInput(input);

    if (this.fireAPI.validateMessage(msg)) {
      this.fireAPI.sendMessage(msg, this.channelId).then(
        rs => {
          msg = "";
          this.focusInput(input);
        }
      ).catch(e => {
        console.log(e);
      });
    }
  }

  onFocus() {
    // this.showEmojiPicker = false;
    // this.content.resize();
    // this.scrollToBottom();
  }

  focusInput(input) {
    input.setFocus();
  }

  /* Recording related functions */

  // stopListening() {
  //   this.speechRecognition.stopListening().then(() => {
  //     this.isRecording = false;
  //   });
  // }

  // getPermission() {
  //   this.speechRecognition.hasPermission()
  //     .then((hasPermission: boolean) => {
  //       if (!hasPermission) {
  //         this.speechRecognition.requestPermission()
  //         .then(data => {
  //           console.log(data);
  //           this.startListening();
  //         });
  //       }else{
  //         this.startListening();
  //       }
  //     });
  // }

  // startListening() {
  //   let options = {
  //     language: 'en-US'
  //   }
  //   this.speechRecognition.startListening().subscribe(matches => {
  //     this.matches = matches;
  //     var initialText = this.text;
  //     this.matches.forEach(element => {
  //       this.text = initialText + " " + element;
  //       this.cd.detectChanges();
  //     });
  //     this.text = initialText + " " + this.matches[0];
  //     this.cd.detectChanges();
  //   });
  //   this.isRecording = true;
  // }

}
