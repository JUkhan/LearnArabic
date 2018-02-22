import { ActionReducer, MetaReducer } from "@ngrx/store";
import { storageSync } from "ngrx-store-ionic-storage";

export function onSyncError(err) {
  console.log(err);
}

export const storageSyncReducer = storageSync({
  keys: [
    "hello", "setting",  
  ], // Only sync the `collection` state
  ignoreActions: [
    // Don't sync when these actions occur
  ],
  hydratedStateKey: "hydrated", // Add this key to the state
  onSyncError: onSyncError // If a sync fails
});

export function storageMetaReducer(
  reducer: ActionReducer<any>
): ActionReducer<any, any> {
  return storageSyncReducer(reducer);
}

export const metaReducers: MetaReducer<any, any>[] = [storageMetaReducer];
