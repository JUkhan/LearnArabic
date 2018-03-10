import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/models/app.state';

import { SettingState } from '../../app/store/reducers/setting.reducer';
import * as settingActions from '../../app/store/actions/setting.actions';
import { AppService } from '../../app/services/appService';
import { LessonPage } from '../lesson/lesson';


@Component({
  selector: 'page-book-popover',
  templateUrl: 'book-popover.html',
})
export class BookPopoverPage {

  constructor(public navCtrl: NavController,
    private store: Store<AppState>,
    private appService:AppService,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
    this.settingSubscription = this.store.select(s => s.setting).subscribe((setting: SettingState) => {
      this.background = setting.theme;
      this.fontSize = setting.fontSize;
      this.lessons=new Array(setting.lessons)
        .fill(0)
        .map((_, index)=>({name:this.getLesson(index+1), id:'lesson'+(index+1)}));
        console.log(setting, this.lessons)
    });
  }
  getLesson(index:number){   
    return this.appService.getLesson()+this.appService.getNumber(index);
  }
  ngOnDestroy() {
    this.settingSubscription.unsubscribe();
  }
  settingSubscription: any;
  background: string = '';
  fontSize: string = '';
  lessons:Array<any>=[];
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
  lessonSelected(lesson){
    const bookInfo:SettingState={activeLesson:lesson.id, activePage:'', pages:0};
    this.store.dispatch(new settingActions.UpdateBookInfo(bookInfo));
    this.viewCtrl.dismiss();
    //this.navCtrl.setRoot(LessonPage);
  }
}
