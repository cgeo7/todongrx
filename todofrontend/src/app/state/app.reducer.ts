import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {todosReducer, TodoState} from '../todos/state/todos.reducer';
import {storeFreeze} from 'ngrx-store-freeze';
import {handleUndo} from 'ngrx-undo';

export interface AppState {
  todos: TodoState,
}

export const reducers: ActionReducerMap<AppState> = {
  todos: todosReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ?
  [storeFreeze, handleUndo] :
  [handleUndo];
