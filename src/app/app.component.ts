import { Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';

import { TranslateService } from "@ngx-translate/core";
import { Store } from '@ngrx/store';
import { AppState } from './models/app.state';
import { SettingState } from './store/reducers/setting.reducer';
import * as settingActions from './store/actions/setting.actions';
import { AppService } from './services/appService';
import { BookPage } from '../pages/book/book';
import { LessonPage } from '../pages/lesson/lesson';
import { BookmarksPage } from '../pages/bookmarks/bookmarks';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnDestroy, AfterViewInit {
  @ViewChild(Nav) nav: Nav;
  settingSubscription: any;
  rootPage: any = HomePage;
  fullScreen: boolean;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    private translate: TranslateService,
    private store: Store<AppState>,
    private appService: AppService,
    public splashScreen: SplashScreen) {
    this.initializeApp();
    this.settingSubscription = this.store.select(s => s.setting).subscribe((setting: SettingState) => {
      this.appService.setting = setting;
      this.fullScreen = setting.fullScreen;
      this.translate.use(setting.language);
      !this.appService.inLesson && this.checkActivePage();
    });
  }
  checkActivePage() {
    if (this.appService.setting.bookName && this.appService.setting.activeLesson && this.appService.setting.activePage) {
      this.nav.setRoot(LessonPage);
    }
  }

  ngOnDestroy() {
    this.settingSubscription.unsubscribe();
  }
  ngAfterViewInit() {
    this.checkActivePage();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    switch (page) {
      case 'home':
        this.nav.setRoot(HomePage);
        break;
      case 'setting':
        this.nav.setRoot(SettingsPage);
        break;
      case 'book1': case 'book2':
        const bookInfo: SettingState = { bookName: page, activeLesson: '', activePage: '', pages: 0, lessons: 0 };
        this.store.dispatch(new settingActions.UpdateBookInfo(bookInfo));
        this.nav.setRoot(BookPage);
        break;
      case 'bookmarks':
        this.nav.setRoot(BookmarksPage);
        break;
      case 'fullScreen':
        this.fullScreen = !this.fullScreen;
        this.store.dispatch(new settingActions.UpdateFullScreen(this.fullScreen));
        break;
      default:

    }

  }

  getBookName(no) {
    return `${this.translate.instant('PAGES.BOOK')} ${this.appService.getNumber(no)}`;
  }
}
