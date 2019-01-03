import {State} from '../../reducers';
import {createSelector} from '@ngrx/store';

// export const selectTodoState = createFeatureSelector<TodoState>('todos');
export const selectTodoState = (state: State) => state.todos;
export const selectAllTodos = createSelector(
  selectTodoState,
  todos => Object.values(todos.todosEntities)
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

