import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/models/app.state';
import { Bookmark } from '../../app/store/reducers/bookmark.reducer';

/**
 * Generated class for the BookmarksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-bookmarks',
  templateUrl: 'bookmarks.html',
})
export class BookmarksPage implements OnDestroy {
  bookmarkSubscription: any;
  bookmarks:any[]=[];
  constructor(public navCtrl: NavController,
    private store: Store<AppState>,
    public navParams: NavParams) {
    this.bookmarkSubscription = this.store.select(s => s.bookmark).subscribe((bookmarkList: Bookmark[]) => {
      //this.bookmarkList=bookmarkList; 
      let temp={};
      bookmarkList.forEach(bm=>{        
        if(temp[bm.book+bm.lesson+bm.page]){
          temp[bm.book+bm.lesson+bm.page].items.push('Line '+bm.lesson)
        }else{
          temp[bm.book+bm.lesson+bm.page]={group:bm.book+' ▸ Lesson'+bm.lesson+' ▸ Page '+bm.page, items:['Line '+(bm.line+1)]}
        }
      })
      this.bookmarks=Object.keys(temp).map(_=>temp[_]);
      console.log(bookmarkList)
    });
  }

  ngOnDestroy() {
    this.bookmarkSubscription.unsubscribe();
  }
}
