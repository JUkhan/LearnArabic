import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SettingState } from '../store/reducers/setting.reducer';

@Injectable()
export class AppService{
    setting:SettingState;
    inLesson:boolean=false;
    constructor(public http:HttpClient){
        
    }    
    getBook(path:string){ 
        //let url='./assets/books/'+ this.setting.language+'/'+path+'.json';
        let url='./assets/books/en/'+path+'.json';
        return this.http.get(url);
    }
    capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    getLesson(){
        return this.setting.language==='en'?'Lesson ':'পাঠ '
    }
    getNumber(index:any, isArabic:boolean=false){
        if(isArabic)
          return index.toString().split('').map((d, i)=>String.fromCharCode(d.charCodeAt(0)+1584)).join('');    
        return this.setting.language==='en'?index.toString(): index.toString().split('').map((d, i)=>String.fromCharCode(d.charCodeAt(0)+2486)).join('');
    }
    getTitle(data?:SettingState){
        if(!data)data=this.setting;
        if(this.setting.language==='en'){
            return `${this.capitalize(data.bookName)} ▸ ${data.activeLesson} ▸ ${data.activePage}`;
        }        
        return `${data.bookName} ▸ ${data.activeLesson} ▸ ${data.activePage}`.replace(/(\d)+/g, n=>this.getNumber(n))
        .replace(/([a-zA-Z])+/g, w=>{
            switch (w.toLowerCase()) {                
                case 'grammar': return 'ব্যাকরণ-'
                case 'book': return 'বই-';
                case 'lesson': return 'পাঠ-';
                case 'page': return 'পৃষ্ঠা-';              
                default: return '';
            }
        });
        
    }    
    getTheme(themeName){
        switch (themeName) {
            case 'xwhite': return{background:'#ddd', color:'rgb(0, 0, 0)', fontSize:this.setting.fontSize};                
            case 'white': return{background:'#fafafa', color:'rgb(0, 0, 0)', fontSize:this.setting.fontSize};                
            case 'tan': return{background:'rgb(249, 241, 228)', color:'rgb(0, 0, 0)', fontSize:this.setting.fontSize}
            case 'grey': return{background:'rgb(76, 75, 80)', color:'rgb(255, 255, 255)', fontSize:this.setting.fontSize}  
            case 'purple': return{background:'#b662ea', color:'rgb(0, 0, 0)', fontSize:this.setting.fontSize}  
            case 'black': return{background:'rgb(0, 0, 0)', color:'rgb(255, 255, 255)', fontSize:this.setting.fontSize}  
            default:
             return{background:'rgb(255, 255, 255)', color:'rgb(0, 0, 0)', fontSize:this.setting.fontSize}
        }
    }
}