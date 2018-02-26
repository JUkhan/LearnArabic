
import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "../../models/app.state";

import { settingReducer } from "./setting.reducer";
import { bookmarkReducer } from "./bookmark.reducer";

export const reducers: ActionReducerMap<AppState> = {  
  setting:settingReducer,
  bookmark: bookmarkReducer
};