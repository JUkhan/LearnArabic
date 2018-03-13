import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/models/app.state';
import * as settingActions from '../../app/store/actions/setting.actions';
import { SettingState } from '../../app/store/reducers/setting.reducer';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnDestroy {
  settingSubscription: any;
  language: string;
  speaker: string;
  languageVocab: any = {
    ba: 'বাংলা', en: 'English'
  }
  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private store: Store<AppState>,
    private translate: TranslateService,
    public navParams: NavParams) {
    this.settingSubscription = this.store.select(state => state.setting).subscribe((setting: SettingState) => {
      this.language = setting.language;
      this.speaker = setting.speaker;
    });
  }

  ngOnDestroy() {
    this.settingSubscription.unsubscribe();
  }
  changeLanguage(lan: string) {
    let prompt = this.alertCtrl.create({
      title: this.translate.instant('SETTINGS.LANGUAGE_CHANGE'),
      inputs: [
        {
          type: "radio",
          label: this.translate.instant('LANGUAGES.BANGLA'),
          value: 'ba',
          checked: lan === 'ba'
        },
        {
          type: "radio",
          label: this.translate.instant('LANGUAGES.ENGLISH'),
          value: 'en',
          checked: lan === 'en'
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {

          }
        },
        {
          text: "Save",
          handler: data => {
            this.store.dispatch(new settingActions.ChangeLanguage(data));
          }
        }
      ]
    });
    prompt.present();
  }
  getSpeaker(speaker: string) {
    switch (speaker) {
      case 'male': return this.translate.instant('SETTINGS.MALE');
      case 'female': return this.translate.instant('SETTINGS.FEMALE');
      case 'none': return this.translate.instant('SETTINGS.NONE');

    }
  }
  changeSpeaker(speaker: string) {
    let prompt = this.alertCtrl.create({
      title: this.translate.instant('SETTINGS.SPEAKER'),
      inputs: [
        {
          type: "radio",
          label: this.translate.instant('SETTINGS.MALE'),
          value: 'male',
          checked: speaker === 'male'
        },
        {
          type: "radio",
          label: this.translate.instant('SETTINGS.FEMALE'),
          value: 'female',
          checked: speaker === 'female'
        },
        {
          type: "radio",
          label: this.translate.instant('SETTINGS.NONE'),
          value: 'none',
          checked: speaker === 'none'
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {

          }
        },
        {
          text: "Save",
          handler: data => {
            this.store.dispatch(new settingActions.ChangeSpeaker(data));
          }
        }
      ]
    });
    prompt.present();
  }

}
