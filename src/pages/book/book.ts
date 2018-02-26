import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../app/services/appService';
import { LessonPage } from '../lesson/lesson';
import { AppState } from '../../app/models/app.state';
import { Store } from '@ngrx/store';
import { SettingState } from '../../app/store/reducers/setting.reducer';
import * as settingActions from '../../app/store/actions/setting.actions';

/**
 * Generated class for the BookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {
  lessons:Array<any>=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<AppState>,
    public appService: AppService) {      
      this.appService.getBook(this.appService.setting.bookName +'/info').subscribe((res:any)=>{
        console.log(res);
        const bookInfo:SettingState={activeLesson:'', activePage:'', pages:0, lessons:res.lessons };
        this.store.dispatch(new settingActions.UpdateBookInfo(bookInfo));
        this.lessons=new Array(res.lessons)
        .fill(0)
        .map((_, index)=>({name:this.getLesson(index+1), id:'lesson'+(index+1)}));
      });
      console.log(this.appService.setting.bookName);
  }
  getLesson(index:number){
   
    return this.appService.getLesson()+this.appService.getNumber(index);
  }
  
  lessonSelected(lesson){
    const bookInfo:SettingState={activeLesson:lesson.id, activePage:'', pages:0};
    this.store.dispatch(new settingActions.UpdateBookInfo(bookInfo));
    this.navCtrl.setRoot(LessonPage);
  }

}
