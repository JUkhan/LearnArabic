
import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "../../models/app.state";

import { settingReducer } from "./setting.reducer";
import { helloReducer } from "./hello.reducer";

export const reducers: ActionReducerMap<AppState> = {
  hello: helloReducer,
  setting:settingReducer
};