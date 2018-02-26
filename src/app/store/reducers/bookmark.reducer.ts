
import * as bookmarkActions from '../actions/bookmark.actions';

export interface Bookmark {
    book:string;
    lesson:number;
    page:number;
    line?:number;
    data?:string
}

export const initialState: Bookmark[] = [];
   
export function bookmarkReducer(
    state = initialState,
    action: bookmarkActions.Actions
): Bookmark[] {
    switch (action.type) {
        case bookmarkActions.BOOKMARK_ADD: {
            return [...state, action.payload ];
        }
        case bookmarkActions.BOOKMARK_REMOVE:
        return state.filter(a=>!(a.book===action.payload.book &&
                a.lesson===action.payload.lesson &&
                a.page===action.payload.page && a.line===action.payload.line
            ));
               
        default: {
            return state;
        }
    }
}
