import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/models/app.state';
import { Bookmark } from '../../app/store/reducers/bookmark.reducer';
import { SettingState } from '../../app/store/reducers/setting.reducer';
import * as settingActions from '../../app/store/actions/setting.actions';
import { AppService } from '../../app/services/appService';


@Component({
  selector: 'page-bookmarks',
  templateUrl: 'bookmarks.html',
})
export class BookmarksPage implements OnDestroy {

  bookmarkSubscription: any;
  bookmarks:any[]=[];

  constructor(public navCtrl: NavController,
    private store: Store<AppState>,
    private appService: AppService,
    public navParams: NavParams) {
    this.bookmarkSubscription = this.store.select(s => s.bookmark).subscribe((bookmarkList: Bookmark[]) => {      
      
      let temp={};
      bookmarkList.forEach(bm=>{        
        if(temp[bm.book+bm.lesson+bm.page]){
          temp[bm.book+bm.lesson+bm.page].items.push('Line '+(bm.line+1))
        }else{
          temp[bm.book+bm.lesson+bm.page]={group:this.appService.getTitle({bookName:bm.book, activeLesson:'Lesson'+bm.lesson, activePage:'Page'+bm.page}), items:['Line '+(bm.line+1)], ...bm};
        }
      })
      this.bookmarks=Object.keys(temp).map(_=>temp[_]);
      
    });
  }

  ngOnDestroy() {
    this.bookmarkSubscription.unsubscribe();
  }

  goToLesson(g:Bookmark){
    this.appService.getBook(`${this.appService.setting.bookName}/${this.appService.setting.activeLesson}/info`).subscribe((res: any) => {      
      const bookInfo: SettingState = { bookName: g.book, activeLesson:'lesson'+g.lesson, activePage: 'page'+g.page, pages:res.pages };
      this.store.dispatch(new settingActions.UpdateBookInfo(bookInfo));
    });
   
  }
}
