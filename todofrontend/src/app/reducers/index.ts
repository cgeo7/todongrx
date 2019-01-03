import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {todosReducer, TodoState} from '../todos/state/todos.reducer';
import {storeFreeze} from 'ngrx-store-freeze';

export interface State {
  todos: TodoState,
}

export const reducers: ActionReducerMap<State> = {
  todos: todosReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];
