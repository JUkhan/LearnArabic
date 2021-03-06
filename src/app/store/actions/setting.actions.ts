import {Action} from '@ngrx/store';

export const CHANGE_LANGUAGE = "[setting] cl"; 
export const LOAD_SETTING = "[setting] ls";
export const UPDATE_BOOK_INFO = "[setting] ls";
export const CHANGE_SPEAKER = "[setting] speaker"; 
export const UPDATE_FULL_SCREEN = "[setting] fullScreen"; 

export class ChangeLanguage implements Action{
    readonly type=CHANGE_LANGUAGE;    
    constructor(public payload:'ba'|'en'){
       
    }
}

export class ChangeSpeaker implements Action{
    readonly type=CHANGE_SPEAKER;    
    constructor(public payload:'male'|'female'|'none'){
       
    }
}

export class LoadSetting implements Action{
    readonly type=LOAD_SETTING;   
    constructor(public payload:any){       
    }
}

export class UpdateBookInfo implements Action{
    readonly type=UPDATE_BOOK_INFO;   
    constructor(public payload:any){       
    }
}

export class UpdateFullScreen implements Action{
    readonly type=UPDATE_FULL_SCREEN;   
    constructor(public payload:any){       
    }
}

export type Actions = ChangeLanguage|LoadSetting|UpdateBookInfo|ChangeSpeaker|UpdateFullScreen ;