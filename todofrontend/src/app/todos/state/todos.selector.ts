import {State} from '../../reducers';
import {createSelector} from '@ngrx/store';

export const selectTodoState = (state: State) => state.todos;

// export const selectTodoIds = createSelector(
//   selectTodoState,
//   (state) => state.ids
// );
//
// export const selectTodoMap = createSelector(
//   selectTodoState,
//   state => state.todos
// );

export const selectTodoList = createSelector(
  selectTodoState,
  state => {
    const ids = state.ids.sort()
  }
)
