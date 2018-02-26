
import * as fevorateActions from '../actions/favorite.actions';

export interface Favorite {
    book:string;
    lesson:number;
    page:number;
    line?:number;
    data?:string
}

// export interface FavoriteState {
//     fevorateList:Favorite[];
// }

// export const initialState: FavoriteState = {
//     fevorateList:[]
// };

export const initialState: Favorite[] = [];
   
export function favoriteReducer(
    state = initialState,
    action: fevorateActions.Actions
): Favorite[] {
    switch (action.type) {
        case fevorateActions.FAVORATE_ADD: {
            return [...state, action.payload ];
        }
        case fevorateActions.FAVORATE_REMOVE:
        return state.filter(a=>!(a.book===action.payload.book &&
                a.lesson===action.payload.lesson &&
                a.page===action.payload.page && a.line===action.payload.line
            ));
               
        default: {
            return state;
        }
    }
}
