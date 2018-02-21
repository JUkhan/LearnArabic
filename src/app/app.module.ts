import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers/root.reducer";
import { metaReducers } from "./store/reducers/storage-sync.reducer";

import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from "@angular/common/http";

import {
  TranslateModule,
  TranslateLoader,
  TranslateService
} from "@ngx-translate/core";

const components=[
  MyApp,
  HomePage,
  ListPage
];

@NgModule({
  declarations: [
   ...components
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
     StoreModule.forRoot(reducers, { metaReducers }),
    // EffectsModule.forRoot([
    //   helloEffects,
     
    // ]),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
   ...components
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TranslateService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}