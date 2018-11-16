// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

// import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen';
// import { StatusBar } from '@ionic-native/status-bar';
// import { CacheModule } from 'ionic-cache';
import { HttpModule } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppVersion } from '@ionic-native/app-version';
// import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { environment } from '../environments/environment';

// import { MyApp } from './app.component';

import { AuthService } from './services/auth.service';
import { FitbitApiProvider } from './providers/fitbit-api/fitbit-api';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { FIREBASE_CONFIG } from './config/firebase.credentials';
import { 
  FirebaseAuthApiProvider, 
  FirebaseMessageApiProvider, 
  FirebaseProfileApiProvider, 
  GroupCategoryService, 
  ChallengeService, 
  GroupService, 
  FcmProvider,
  PaginationProvider,
  NotificationProvider
} from './providers/firebase-api/firebase-api';
import { NewsApiProvider } from './providers/news-api/news-api';
import { UtilsService } from './providers/utils/utils.service';
import { Firebase } from '@ionic-native/firebase';
import { Geolocation } from '@ionic-native/geolocation';
import { GeolocationProvider } from './providers/geolocation/geolocation';
import { ComponentsModule } from './components/components.module';

// import { NgReduxModule, NgRedux } from '@angular-redux/store';
// import { iAppState } from './store/iAppState.interface';
// import { rootReducer, INITIAL_STATE } from './store/store';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    ComponentsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // InAppBrowser,
    // AppVersion,
    // AuthService,
    // FitbitApiProvider,
    // AngularFireDatabase,
    // FirebaseAuthApiProvider,
    // FirebaseMessageApiProvider,
    // FirebaseProfileApiProvider,
    // PaginationProvider,
    // NewsApiProvider,
    // UtilsService,
    // Firebase,
    // FcmProvider,
    // GroupCategoryService,
    // ChallengeService,
    // GroupService,
    // Geolocation,
    // GeolocationProvider,
    // NotificationProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
