import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { BookPage } from '../pages/book/book';
import { LessonPage } from '../pages/lesson/lesson';
import { BookPopoverPage } from '../pages/book-popover/book-popover';
import { BookmarksPage } from '../pages/bookmarks/bookmarks';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers/root.reducer";
import { metaReducers } from "./store/reducers/storage-sync.reducer";
import { StorageSyncEffects } from "ngrx-store-ionic-storage/dist";
import { EffectsModule } from "@ngrx/effects";
import { IonicStorageModule } from '@ionic/storage';
import {AppService} from './services/appService';
import { TextToSpeech } from '@ionic-native/text-to-speech';

import {
  HttpClientModule,
  HttpClient
} from "@angular/common/http";

import {
  TranslateModule,
  TranslateLoader,
  TranslateService
} from "@ngx-translate/core";
import { SettingEffects } from './store/effects/setting.effects';

const components = [
  MyApp,
  HomePage,  
  SettingsPage,
  BookPage,
  LessonPage,
  BookPopoverPage,
  BookmarksPage
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      StorageSyncEffects,
      SettingEffects,

    ]),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ...components
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TranslateService,TextToSpeech,
    AppService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }

// AoT requires an exported function for factories
// By default this will look for your translation json files in i18n/, but for Ionic you must change this to look in the src/assets directory. We can do this by creating a function that returns a new TranslateLoader:
export function createTranslateLoader(http: HttpClient) { 
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}