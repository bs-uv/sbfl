import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderModule } from 'ngx-order-pipe';
import { DirectivesModule } from '../directives/directives.module';
import { MomentModule } from 'angular2-moment';
import { TimeAgoPipe } from 'time-ago-pipe';
// import { BeautifyMessagePipe } from '../pipes/beautify-message/beautify-message';
import { LinkyModule } from 'angular-linky';

// Import ng-circle-progress
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ChartModule } from 'angular-highcharts';

import { FirebaseProfileComponent } from './firebase-profile/firebase-profile';
import { MessageBoxComponent } from './message-box/message-box';
import { MessageListComponent } from './message-list/message-list';
import { MessageCardComponent } from './message-card/message-card';
// import { DashboardQuarterComponent } from './dashboard/dashboard-quarter/dashboard-quarter';
// import { DashboardWeightGoalComponent } from './dashboard/dashboard-weight-goal/dashboard-weight-goal';
// import { DashboardFatGoalComponent } from './dashboard/dashboard-fat-goal/dashboard-fat-goal';
// import { DashboardStepTotalComponent } from './dashboard/dashboard-step-total/dashboard-step-total';
// import { DashboardSleepGoalComponent } from './dashboard/dashboard-sleep-goal/dashboard-sleep-goal';
// import { DashboardDietaryGoalComponent } from './dashboard/dashboard-dietary-goal/dashboard-dietary-goal';
// import { DashboardFloorGoalComponent } from './dashboard/dashboard-floor-goal/dashboard-floor-goal';
// import { DashboardSleepTotalComponent } from './dashboard/dashboard-sleep-total/dashboard-sleep-total';
// import { DashboardStepGoalComponent } from './dashboard/dashboard-step-goal/dashboard-step-goal';
// import { DashboardDistanceGoalComponent } from './dashboard/dashboard-distance-goal/dashboard-distance-goal';
import { MotivationBoardComponent } from './motivation-board/motivation-board';
import { WorkOutsComponent } from './work-outs/work-outs';
import { DashboardComponent } from './dashboard/dashboard';
import { LeaderBoardComponent } from './leader-board/leader-board';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { ProfileElementComponent } from './profile-element/profile-element.component';
import { ChannleListComponent } from './channle-list/channle-list';
import { ChannleFormComponent } from './channle-form/channle-form';
import { ChannelElementComponent } from './channel-element/channel-element.component';
import { AppOpenerComponent } from './app-opener/app-opener';
import { GroupCardComponent } from './group-card/group-card';
import { MemberProfileComponent } from './member-profile/member-profile';
import { NotificationComponent } from './notification/notification';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { PipesModule } from '../pipes/pipes.module';
import { ChallengeBoxComponent } from './challenge-box/challenge-box';
import { UserGroupComponent } from './user-group/user-group';
import { NgAisModule } from 'angular-instantsearch';
import { NotificationListComponent } from './notification-list/notification-list';
import { VersionCheckComponent } from './version-check/version-check';
import { AdditionalInfoFormComponent } from './additional-info-form/additional-info-form';
// import { DashboardSocialGoalComponent } from './dashboard/dashboard-social-goal/dashboard-social-goal';


@NgModule({
    declarations: [
        TimeAgoPipe,
        // BeautifyMessagePipe,
        FirebaseProfileComponent,
        MessageBoxComponent,
        MessageListComponent,
        MessageCardComponent,
        // DashboardQuarterComponent,
        // DashboardWeightGoalComponent,
        // DashboardFatGoalComponent,
        // DashboardFatGoalComponent,
        // DashboardStepTotalComponent,
        // DashboardSleepGoalComponent,
        // DashboardDietaryGoalComponent,
        // DashboardFloorGoalComponent,
        // DashboardSleepTotalComponent,
        // DashboardStepGoalComponent,
        // DashboardDistanceGoalComponent,
        MotivationBoardComponent,
        WorkOutsComponent,
        DashboardComponent,
        LeaderBoardComponent,
        ProfileImageComponent,
        ProfileElementComponent,
        ChannleListComponent,
        ChannleFormComponent,
        ChannelElementComponent,
        AppOpenerComponent,
        GroupCardComponent,
        MemberProfileComponent,
        NotificationComponent,
        ProgressBarComponent,
        ChallengeBoxComponent,
        UserGroupComponent,
        NotificationListComponent,
        VersionCheckComponent,
        AdditionalInfoFormComponent,
        // DashboardSocialGoalComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        OrderModule,
        LinkyModule,
        DirectivesModule,
        MomentModule,
        ChartModule,
        PipesModule,
        NgAisModule,
        NgCircleProgressModule.forRoot({
            animation: true,
            showInnerStroke: false,
            showSubtitle: true,
            backgroundColor: "#323A45",
            outerStrokeWidth: 7,
            backgroundPadding: -7,
            unitsColor: "#FFFFFF",
            unitsFontSize: "20",
            outerStrokeColor: "#26BAD6",
            outerStrokeLinecap: "square",
            titleColor: "#FFFFFF",
            titleFontSize: "24",
            radius: 60,
            renderOnClick: false
        }),
    ],
    exports: [
        FirebaseProfileComponent,
        MessageBoxComponent,
        MessageListComponent,
        MessageCardComponent,
        // DashboardQuarterComponent,
        // DashboardWeightGoalComponent,
        // DashboardFatGoalComponent,
        // DashboardFatGoalComponent,
        // DashboardStepTotalComponent,
        // DashboardSleepGoalComponent,
        // DashboardDietaryGoalComponent,
        // DashboardFloorGoalComponent,
        // DashboardSleepTotalComponent,
        // DashboardStepGoalComponent,
        // DashboardDistanceGoalComponent,
        MotivationBoardComponent,
        WorkOutsComponent,
        DashboardComponent,
        LeaderBoardComponent,
        ProfileImageComponent,
        ProfileElementComponent,
        ChannleListComponent,
        ChannleFormComponent,
        ChannelElementComponent,
        AppOpenerComponent,
        GroupCardComponent,
        MemberProfileComponent,
        NotificationComponent,
        ProgressBarComponent,
        ChallengeBoxComponent,
        UserGroupComponent,
        NotificationListComponent,
        VersionCheckComponent,
        AdditionalInfoFormComponent,
        // DashboardSocialGoalComponent,
    ]
})
export class ComponentsModule { }
