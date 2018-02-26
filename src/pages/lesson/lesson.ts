import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams, PopoverController, Platform } from 'ionic-angular';
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
declare const responsiveVoice: any, YT: any;

@Component({
  selector: 'page-lesson',
  templateUrl: 'lesson.html',
})
export class LessonPage implements OnDestroy {
  pageData: any = { lines: [] };
  totalPage: number;
  activePage: number;
  selectedWord: any = {};
  theme: any = {};
  settingSubscription: any;

  constructor(
    public navCtrl: NavController,
    private store: Store<AppState>,
    private tts: TextToSpeech,
    public plt: Platform,
    public popoverCtrl: PopoverController,
    private appService: AppService,
    public navParams: NavParams) {
    this.theme = this.appService.getTheme(this.appService.setting.theme);
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
      this.theme = this.appService.getTheme(setting.theme);
      //console.log(setting);
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
      if (Array.isArray(res.videos)) {
        const video = res.videos.find(_ => _.id === this.appService.setting.video.id);
        if (video) {
          const tid = setTimeout(() => {
            video.time = this.appService.setting.video.time;
            video.play = true;
            this.clickPlay(video);
            clearTimeout(tid);
          }, 500);

        }
      }
      //console.log(res)
    });
  }

  setMeaning(line, word) {
    this.selectedWord.s = false;
    word.s = true;
    this.selectedWord = word;

    const ttsOptions: any = {
      text: word.w
    }
    if(this.plt.is("core")){
      if (word.d === 'rtl' || line.d === 'rtl') {
        responsiveVoice.speak(word.w || word.a, "Arabic Female");
      } else {
        responsiveVoice.speak(word.w || word.a);
      }
    }else{
      if (word.d === 'rtl' || line.d === 'rtl') {
        responsiveVoice.speak(word.w || word.a, "Arabic Female");
      } else {
        //responsiveVoice.speak(word.w || word.a);
        this.tts.speak({text:word.w|| word.a, rate:0.5})
       .then(() => {})
       .catch((reason: any) => console.log(reason));
      }
    }   
  }

  calculateCssClass(word) {
    let css: any = { selected: word.s && word.m };
    if (word.ws)
      css[`ws${word.ws}`] = true;
    css.bt = word.bt;
    css.bbd = word.bbd;
    css.bbs = word.bbs;
    return css;
  }
  showPopover(event) {
    const popover = this.popoverCtrl.create(BookPopoverPage);
    popover.present({
      ev: event
    });

  }
  selectedVideo: any = {};
  player: any;
  clickPlay(video) {
    this.selectedVideo.end=false;
    this.selectedVideo.playing = false;
    this.selectedVideo = video;
    this.initPlayer(video);
    this.selectedVideo.playing = true;
    this.store.dispatch(new settingActions.UpdateBookInfo({ video: { id: video.id, time: video.time || 5 } }));
  }
  initPlayer(video) {
    if (this.player) {
      this.player.loadVideoById(video.id, video.time || 5, "large");
      return;
    }
    this.player = new YT.Player('player', {
      height: 320,
      width: 330,
      videoId: video.id,
      // playerVars: { 'autoplay': 1, 'controls': 0 },
      events: {
        'onReady': this.onPlayerReady.bind(this),
        'onStateChange': this.onPlayerStateChange.bind(this)
      }
    });
  }
  onPlayerReady(event) {
    event.target.playVideo();
    if (this.selectedVideo.time)
      event.target.seekTo(this.selectedVideo.time);
    //console.log(event.target.getDuration());
  };
  onPlayerStateChange(event) {
    //end status 0
    if (event.data === 0) {
      const vindex = this.pageData.videos.indexOf(this.selectedVideo);
      if (vindex + 1 < this.pageData.videos.length) {
        this.clickPlay(this.pageData.videos[vindex + 1]);
      }
      else {
        event.target.seekTo(0, "large");
        this.selectedVideo.end = true;
        this.store.dispatch(new settingActions.UpdateBookInfo({ video: { id: '', time: 0 } }));
      }
    }
    else if (event.data === 1 || event.data === 2 || event.data === 3) {
      //console.log('time:', event.target.getCurrentTime(),event.data);
      if (!this.selectedVideo.end)
        this.store.dispatch(new settingActions.UpdateBookInfo({ video: { id: this.selectedVideo.id, time: event.target.getCurrentTime() } }));
    }
  }
}



