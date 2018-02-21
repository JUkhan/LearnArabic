
import { HelloState } from "../store/reducers/hello.reducer";


export interface AppState {
  readonly hello: HelloState;  
  readonly hydrated?: boolean; // Making it optional allows us to use AppState in the root.reducer
}