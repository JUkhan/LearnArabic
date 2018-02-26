import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";
import { SettingState } from '../store/reducers/setting.reducer';

@Injectable()
export class AppService{
    setting:SettingState;
    inLesson:boolean=false;
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
                case 'grammar': return 'ব্যাকরণ-'
                case 'book': return 'বই-';
                case 'lesson': return 'পাঠ-';
                case 'page': return 'পৃষ্ঠা-';              
                default: break;
            }
        });
        
    }    
    getTheme(themeName){
        switch (themeName) {
            case 'white': return{background:'rgb(255, 255, 255)', color:'rgb(0, 0, 0)', fontSize:this.setting.fontSize};                
            case 'tan': return{background:'rgb(249, 241, 228)', color:'rgb(0, 0, 0)', fontSize:this.setting.fontSize}
            case 'grey': return{background:'rgb(76, 75, 80)', color:'rgb(255, 255, 255)', fontSize:this.setting.fontSize}  
            case 'purple': return{background:'#b662ea', color:'rgb(0, 0, 0)', fontSize:this.setting.fontSize}  
            case 'black': return{background:'rgb(0, 0, 0)', color:'rgb(255, 255, 255)', fontSize:this.setting.fontSize}  
            default:
             return{background:'rgb(255, 255, 255)', color:'rgb(0, 0, 0)', fontSize:this.setting.fontSize}
        }
    }
}