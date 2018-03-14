
import * as settingActions from '../actions/setting.actions';

export interface SettingState {
    language?: 'ba' | 'en';
    speaker?:'male'|'female'|'none';
    bookName?:string;
    activeLesson?:string;
    activePage?:string;
    pages?:number;
    lessons?:number;
    theme?:string;
    fontSize?:number;
    video?:{id?:string, time?:number}
}

export const initialState: SettingState = {
    speaker:'male',
    language: 'ba',
    theme:'white',
    fontSize:22,
    video:{}
};

export function settingReducer(
    state = initialState,
    action: settingActions.Actions
): SettingState {
    switch (action.type) {
        case settingActions.CHANGE_LANGUAGE: {
            return { ...state, language: action.payload };
        }
        case settingActions.CHANGE_SPEAKER: {
            return { ...state, speaker: action.payload };
        }
        case settingActions.UPDATE_BOOK_INFO: {
            return { ...state,  ...action.payload };
        }
        case settingActions.LOAD_SETTING:
            return action.payload || initialState
        default: {
            return state;
        }
    }
}
