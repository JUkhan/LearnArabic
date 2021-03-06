
import { Bookmark } from "../store/reducers/bookmark.reducer";
import { SettingState } from "../store/reducers/setting.reducer";

export interface AppState {
  readonly bookmark: Bookmark[]; 
  readonly setting: SettingState
  readonly hydrated?: boolean; // Making it optional allows us to use AppState in the root.reducer
}