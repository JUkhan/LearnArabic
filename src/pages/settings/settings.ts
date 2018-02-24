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
  settingSubscription:any;
  language: string;
  languageVocab: any = {
    ba: 'বাংলা', en: 'English'
  }
  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private store: Store<AppState>,
    private translate:TranslateService,    
    public navParams: NavParams) {
      this.settingSubscription=this.store.select(state=>state.setting).subscribe((setting:SettingState)=>{
        this.language=setting.language;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  ngOnDestroy(){
    console.log('destroy setting');
    this.settingSubscription.unsubscribe();
  }
  changeLanguage(lan:string) {
    let prompt = this.alertCtrl.create({
      title: this.translate.instant('SETTINGS.LANGUAGE_CHANGE') ,
      inputs: [
        {
          type: "radio",
          label:  this.translate.instant('LANGUAGES.BANGLA'),
          value: 'ba',
          checked: this.language==='ba'
        },
        {
          type: "radio",
          label:  this.translate.instant('LANGUAGES.ENGLISH'),
          value: 'en',
          checked: this.language==='en'
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Save",
          handler: data => {
           console.log(data)
           this.store.dispatch(new settingActions.ChangeLanguage(data));
          }
        }
      ]
    });
    prompt.present();
  }

}
