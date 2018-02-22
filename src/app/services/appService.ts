import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';

@Injectable()
export class AppService{
    constructor(public storage: Storage){
        
    }
    setData(key:string, value:any){
        this.storage.set(key, value);
    }
    getData(key:string){
        return this.storage.get(key);
    }
}