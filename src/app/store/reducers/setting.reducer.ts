
import * as settingActions from '../actions/setting.actions';

export interface SettingState {
    language: 'ba' | 'en';
}

export const initialState: SettingState = {
    language: 'ba'
};

export function settingReducer(
    state = initialState,
    action: settingActions.Actions
): SettingState {
    switch (action.type) {
        case settingActions.CHANGE_LANGUAGE: {
            return { ...state, language: action.payload };
        }
        case settingActions.LOAD_SETTING:
            return action.payload || initialState
        default: {
            return state;
        }
    }
}
