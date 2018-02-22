import {Action} from '@ngrx/store';

export const CHANGE_LANGUAGE = "[setting] cl"; 
export const LOAD_SETTING = "[setting] ls";

export class ChangeLanguage implements Action{
    readonly type=CHANGE_LANGUAGE;    
    constructor(public payload:'ba'|'en'){
       
    }
}

export class LoadSetting implements Action{
    readonly type=LOAD_SETTING;   
    constructor(public payload:any){       
    }
}

export type Actions = ChangeLanguage|LoadSetting ;