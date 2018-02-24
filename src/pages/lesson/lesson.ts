import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/models/app.state';
import { SettingState } from '../../app/store/reducers/setting.reducer';
import * as settingActions from '../../app/store/actions/setting.actions';
import { AppService } from '../../app/services/appService';

/**
 * Generated class for the LessonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-lesson',
  templateUrl: 'lesson.html',
})
export class LessonPage {
  pageData:any;
  totalPage:number;
  activePage:number;

  constructor(
    public navCtrl: NavController,
    private store: Store<AppState>,
    private appService: AppService,
    public navParams: NavParams) {
     
    if (!this.appService.setting.pages) {
      this.appService.getBook(`${this.appService.setting.bookName}/${this.appService.setting.activeLesson}/info`).subscribe((res: any) => {
        console.log(res);
        this.totalPage=res.pages;
        this.activePage=1;
        const bookInfo: SettingState = { activePage: 'page1', pages: res.pages};
        this.store.dispatch(new settingActions.UpdateBookInfo(bookInfo));

      });
    }else{
      this.totalPage=this.appService.setting.pages;
      this.activePage=+this.appService.setting.activePage.replace('page','');
      this.loadPageData(this.activePage);
    }
  }

  ionViewDidLoad() {
   
  }
  loadPageData(pageNo){
    this.appService.getBook(`${this.appService.setting.bookName}/${this.appService.setting.activeLesson}/${this.appService.setting.activePage}`).subscribe((res: any) => {
      this.pageData=res;
      console.log(res)
    });
  }
  
}
