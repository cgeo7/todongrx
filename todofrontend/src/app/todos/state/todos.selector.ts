import {createSelector} from '@ngrx/store';
import {AppState} from '../../state/app.reducer';

// export const selectTodoState = createFeatureSelector<TodoState>('todos');
export const selectTodoState = (state: AppState) => state.todos;
export const selectAllTodos = createSelector(
  selectTodoState,
  todos => Object.values(todos.todosEntities)
);

export const selectTodoById = (id: string) => createSelector(
  selectTodoState,
  state => state.todosEntities[id]
);

// export const selectTodoIds = createSelector(
//   selectTodoState,
//   (state) => state.ids
// );
//
// export const selectTodoMap = createSelector(
//   selectTodoState,
//   state => state.todos
// );

