import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/models/app.state';

import { SettingState } from '../../app/store/reducers/setting.reducer';
import * as settingActions from '../../app/store/actions/setting.actions';


@Component({
  selector: 'page-book-popover',
  templateUrl: 'book-popover.html',
})
export class BookPopoverPage {

  constructor(public navCtrl: NavController,
    private store: Store<AppState>,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
    this.settingSubscription = this.store.select(s => s.setting).subscribe((setting: SettingState) => {
      this.background = setting.theme;
      this.fontSize = setting.fontSize;
    });
  }
  ngOnDestroy() {
    this.settingSubscription.unsubscribe();
  }
  settingSubscription: any;
  background: string = '';
  fontSize: string = ''
  changeBackground(color) {
    this.background = color;
    this.save({ theme: color });
  }
  changeFontSize(font) {
    this.fontSize = font;
    this.save({ fontSize: font });
  }

  save(data) {
    this.store.dispatch(new settingActions.UpdateBookInfo(data));
  }
  close() {
    this.viewCtrl.dismiss();
  }
}
