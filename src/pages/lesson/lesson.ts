import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/models/app.state';
import { SettingState } from '../../app/store/reducers/setting.reducer';
import * as settingActions from '../../app/store/actions/setting.actions';
import { AppService } from '../../app/services/appService';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { BookPopoverPage } from '../book-popover/book-popover';

/**
 * Generated class for the LessonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare const responsiveVoice:any;

@Component({
  selector: 'page-lesson',
  templateUrl: 'lesson.html',
})
export class LessonPage implements OnDestroy {
  pageData: any = { lines: [] };
  totalPage: number;
  activePage: number;
  selectedWord: any = {};
  theme:any={};
  settingSubscription: any;
  
  constructor(
    public navCtrl: NavController,
    private store: Store<AppState>,
    private tts: TextToSpeech,
    public popoverCtrl: PopoverController,
    private appService: AppService,
    public navParams: NavParams) {      
    this.theme= this.appService.getTheme(this.appService.setting.theme);
    if (!this.appService.setting.pages) {
      this.appService.getBook(`${this.appService.setting.bookName}/${this.appService.setting.activeLesson}/info`).subscribe((res: any) => {
        this.totalPage = res.pages;
        this.activePage = 1;
        const bookInfo: SettingState = { activePage: 'page1', pages: res.pages };
        this.store.dispatch(new settingActions.UpdateBookInfo(bookInfo));
        this.loadPageData(this.activePage);
      });
    } else {
      this.totalPage = this.appService.setting.pages;
      this.activePage = +this.appService.setting.activePage.replace('page', '');
      this.loadPageData(this.activePage);
    }
    this.settingSubscription = this.store.select(s => s.setting).subscribe((setting: SettingState) => {
      this.theme= this.appService.getTheme(setting.theme);     
    });
    this.appService.inLesson = true;
  }
  ngOnDestroy() {
    this.appService.inLesson = false;
    this.settingSubscription.unsubscribe();
  }
  
  prev() {
    if (this.activePage > 1) {
      this.activePage--;
      this.loadPageData(this.activePage);
      const bookInfo: SettingState = { activePage: 'page' + this.activePage };
      this.store.dispatch(new settingActions.UpdateBookInfo(bookInfo));
    }
  }
  next() {
    if (this.activePage < this.totalPage) {
      this.activePage++;
      this.loadPageData(this.activePage);
      const bookInfo: SettingState = { activePage: 'page' + this.activePage };
      this.store.dispatch(new settingActions.UpdateBookInfo(bookInfo));
    }
  }

  loadPageData(pageNo) {
    this.appService.getBook(`${this.appService.setting.bookName}/${this.appService.setting.activeLesson}/page${pageNo}`).subscribe((res: any) => {
      this.pageData = res;
      console.log(res)
    });
  }

  setMeaning(word) {
    this.selectedWord.s = false;
    word.s = true;
    this.selectedWord = word;

    const ttsOptions: any = {
      text: word.w
    }
    // if (word.d === 'rtl')
    //   ttsOptions.locale = 'ar_EG';
    // console.log(JSON.stringify(ttsOptions));  
    // this.tts.speak(word.w)
    //   .then(() => console.log('Success'))
    //   .catch((reason: any) => console.log(reason));
    if (word.d === 'rtl'){
      responsiveVoice.speak(word.w||word.a,"Arabic Female");
    }else{
      responsiveVoice.speak(word.w||word.a);
    }
    
  }

  calculateCssClass(word){    
    let css:any={selected:word.s && word.m};
    if(word.ws)      
        css[`ws${word.ws}`]=true;
    css.bt=word.bt;
    css.bbd=word.bbd;
    css.bbs=word.bbs;
    return css;
  }
  showPopover(event){
    const popover = this.popoverCtrl.create(BookPopoverPage);
    popover.present({
      ev: event
    });
   
  }

}
