
import { HelloState } from "../store/reducers/hello.reducer";
import { SettingState } from "../store/reducers/setting.reducer";

export interface AppState {
  readonly hello: HelloState; 
  readonly setting: SettingState
  readonly hydrated?: boolean; // Making it optional allows us to use AppState in the root.reducer
}