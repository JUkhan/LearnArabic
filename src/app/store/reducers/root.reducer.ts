
import { helloReducer } from "./hello.reducer";
import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "../../models/app.state";

export const reducers: ActionReducerMap<AppState> = {
  hello: helloReducer,
 
};