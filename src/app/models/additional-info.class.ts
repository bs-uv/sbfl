
import { AdditionalInfo } from "./additional-info.interface";

export class AdditionalInfoClass {
    fitbitReminderTime: number;
    totalGroup: number;
    challenge: boolean;
    totalChallenge: number;
    speritualGroup: boolean;
    totalSperitualGroup: number;
    finincialCounseling: boolean;
    emotionalCounseling: boolean;

    constructor(obj?: AdditionalInfo) {
        this.fitbitReminderTime = (obj.fitbitReminderTime) ? obj.fitbitReminderTime * 1 : 0 ;
        this.totalGroup = (obj.totalGroup) ? obj.totalGroup * 1 : 0 ;
        this.challenge = (obj.challenge) ? obj.challenge : false ;
        this.totalChallenge = (obj.totalChallenge) ? obj.totalChallenge  * 1 : 0 ;
        this.speritualGroup = (obj.speritualGroup) ? obj.speritualGroup : false ;
        this.totalSperitualGroup = (obj.totalSperitualGroup) ? obj.totalSperitualGroup  * 1 : 0 ;
        this.finincialCounseling = (obj.finincialCounseling) ? obj.finincialCounseling : false ;
        this.emotionalCounseling = (obj.emotionalCounseling) ? obj.emotionalCounseling : false ;
   }
}
