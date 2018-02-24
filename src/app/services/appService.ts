import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";
import { SettingState } from '../store/reducers/setting.reducer';

@Injectable()
export class AppService{
    setting:SettingState;
    constructor(public storage: Storage, public http:HttpClient){
        
    }
    setData(key:string, value:any){
        this.storage.set(key, value);
    }
    getData(key:string){
        return this.storage.get(key);
    }
    getBook(path:string){ 
        //let url='./assets/books/'+ this.setting.language+'/'+path+'.json';
        let url='./assets/books/en/'+path+'.json';
        return this.http.get(url);
    }
    getLesson(){
        return this.setting.language==='en'?'Lesson ':'পাঠ '
    }
    getNumber(index:any){        
        return this.setting.language==='en'?index.toString(): index.toString().split('').map((d, i)=>String.fromCharCode(d.charCodeAt(0)+2486)).join('');
    }
    getTitle(){
        if(this.setting.language==='en'){
            return `${this.setting.bookName} ▸ ${this.setting.activeLesson} ▸ ${this.setting.activePage}`;
        }
        return `${this.setting.bookName} ▸ ${this.setting.activeLesson} ▸ ${this.setting.activePage}`.replace(/(\d)+/g, this.getNumber.bind(this))
        .replace(/([a-z])+/g, w=>{
            switch (w) {
                case 'book': return 'বই-';
                case 'lesson': return 'পাঠ-';
                case 'page': return 'পৃষ্ঠা-';              
                default: break;
            }
        });
        
    }
    private getTitleInBangla(){

    }
}