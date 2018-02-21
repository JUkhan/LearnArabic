
import * as helloActions from '../actions/hello.actions';

export interface HelloState {
    msg: string;
}

export const initialState: HelloState = {
    msg: 'Learn Arabic'
};

export function helloReducer(
    state = initialState,
    action: helloActions.Actions
): HelloState {
    switch (action.type) {
        case helloActions.HELLO_ARABIC: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}
