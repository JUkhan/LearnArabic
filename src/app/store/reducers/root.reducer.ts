
import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "../../models/app.state";

import { settingReducer } from "./setting.reducer";
import { favoriteReducer } from "./favorite.reducer";

export const reducers: ActionReducerMap<AppState> = {  
  setting:settingReducer,
  favorite: favoriteReducer
};