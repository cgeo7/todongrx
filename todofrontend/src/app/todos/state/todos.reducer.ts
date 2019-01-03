import {Todo} from '../../models/todo.model';
import {TodoActions, TodoActionsUnion} from './todos.actions';

export interface TodoState {
  todos: { [key: string]: Todo }
}

const initialState: TodoState = {
  todos: undefined
};

export const todosReducer = (state: TodoState = initialState, action: TodoActionsUnion) => {

  switch (action.type) {
    case TodoActions.EDIT_TODO:
    case TodoActions.CREATE_TODO: {
      const todo = action.payload.todo;
      return {
        ...state,
        todos: {
          ...state.todos,
          [todo._id]: todo
        }
      };
    }

    case TodoActions.DELETE_TODO: {
      const todoId = action.payload.todoId;
      const todos = Object.keys(state.todos)
        .filter(k => k === todoId)
        .reduce((acc, key) => {
            acc[key] = state.todos[key];
            return acc;
          }, {}
        );
      return {
        ...state,
        todos
      };
    }

    case TodoActions.DONE_TODO: {
      const todoId = action.payload.todoId;
      const todo = state.todos[todoId];
      return {
        ...state,
        todos: {
          ...state.todos,
          [todoId]: {...todo, status: 'Done'}
        }
      };
    }


    case TodoActions.REQUESTED_TODOS_SUCCESS:
      const ids: string[] = [];

      const todos = action.payload.todos.reduce((acc, todo) => {
        ids.push(todo._id);
        return ({
          ...acc,
          [todo._id]: todo
        });
      }, {});
      return {
        ...state,
        ids,
        todos
      };


    default:
      return state;
  }

};
