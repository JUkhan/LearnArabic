import { Actions, Effect } from "@ngrx/effects"; // Effect, Actions, toPayload
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { empty } from "rxjs/observable/empty";
import { mergeMap } from "rxjs/operators/mergeMap";
import { withLatestFrom } from "rxjs/operators/withLatestFrom";
import { Action, Store } from "@ngrx/store";


// Import of action tyypes

import * as settingActions from "../actions/setting.actions";

import { AppState } from "../../models/app.state";
import {AppService} from '../../services/appService'


@Injectable()
export class SettingEffects {
  constructor(
    private action$: Actions,
    private store$: Store<AppState>,
    private appService: AppService
  ) {}

  @Effect()
  changeLanguage$: Observable<Action> = this.action$
    .ofType<settingActions.LoadSetting>(settingActions.CHANGE_LANGUAGE, settingActions.UPDATE_BOOK_INFO)
    .pipe(
      withLatestFrom(this.store$),
      mergeMap(([action, state]) => {
        console.log(action, state);
        this.appService.setData('setting', state.setting);
        return empty();
      })
    );

}
