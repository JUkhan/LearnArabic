
import {Action} from '@ngrx/store';

export const HELLO_ARABIC = "[crp] ResetState"; 

export class HelloAction implements Action{
    readonly type=HELLO_ARABIC;
}

export type Actions = HelloAction ;