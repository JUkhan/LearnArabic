import {Action} from '@ngrx/store';
import { Favorite } from '../reducers/favorite.reducer';

export const FAVORATE_ADD = "[favorite] add"; 
export const FAVORATE_REMOVE = "[favorite] ls";


export class FavoritevorateAdd implements Action{
    readonly type=FAVORATE_ADD;    
    constructor(public payload:Favorite){
       
    }
}

export class FavoritevorateRemove implements Action{
    readonly type=FAVORATE_REMOVE;   
    constructor(public payload:Favorite){       
    }
}



export type Actions = FavoritevorateAdd|FavoritevorateRemove ;