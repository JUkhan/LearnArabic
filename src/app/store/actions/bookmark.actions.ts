import {Action} from '@ngrx/store';
import { Bookmark } from '../reducers/bookmark.reducer';

export const BOOKMARK_ADD = "[favorite] add"; 
export const BOOKMARK_REMOVE = "[favorite] ls";


export class BookmarkAdd implements Action{
    readonly type=BOOKMARK_ADD;    
    constructor(public payload:Bookmark){
       
    }
}

export class BookmarkRemove implements Action{
    readonly type=BOOKMARK_REMOVE;   
    constructor(public payload:Bookmark){       
    }
}

export type Actions = BookmarkAdd|BookmarkRemove ;