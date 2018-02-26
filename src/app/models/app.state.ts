
import { Favorite } from "../store/reducers/favorite.reducer";
import { SettingState } from "../store/reducers/setting.reducer";

export interface AppState {
  readonly favorite: Favorite[]; 
  readonly setting: SettingState
  readonly hydrated?: boolean; // Making it optional allows us to use AppState in the root.reducer
}