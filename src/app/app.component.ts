import { Component, ViewChild, OnDestroy } from '@angular/core';
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

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnDestroy {
  @ViewChild(Nav) nav: Nav;
  settingSubscription: any;
  rootPage: any = HomePage;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    private translate: TranslateService,
    private store: Store<AppState>,
    private appService: AppService,
    public splashScreen: SplashScreen) {
    this.initializeApp();
    this.appService.getData('setting').then((val) => {
      console.log('Your setting is', val);
      this.store.dispatch(new settingActions.LoadSetting(val));
    });
    this.settingSubscription = this.store.select(s => s.setting).subscribe((setting: SettingState) => {
      console.log(setting);
      this.translate.use(setting.language);
    });
  }

  ionViewDidLoad() {

  }
  ngOnDestroy() {
    console.log('destroy setting');
    this.settingSubscription.unsubscribe();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    let component;
    switch (page) {
      case 'home':
        component = HomePage;
        break;
      case 'setting':
        component = SettingsPage;
        break;
      default:
        component = HomePage;
    }
    this.nav.setRoot(component);
  }
}
