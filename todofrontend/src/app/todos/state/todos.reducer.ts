import {Todo} from '../../models/todo.model';
import {TodoActions, TodoActionsUnion} from './todos.actions';

export interface TodoState {
  todosEntities: { [key: string]: Todo }
}

const initialState: TodoState = {
  todosEntities: {}
};

export const todosReducer = (state: TodoState = initialState, action: TodoActionsUnion) => {

  switch (action.type) {
    case TodoActions.EDIT_TODO:
    case TodoActions.CREATE_TODO: {
      const todo = action.payload.todo;
      return {
        ...state,
        todosEntities: {
          ...state.todosEntities,
          [todo._id]: todo
        }
      };
    }

    case TodoActions.DELETE_TODO: {
      const todoId = action.payload.todoId;
      const todos = Object.keys(state.todosEntities)
        .filter(k => k !== todoId)
        .reduce((acc, key) => {
            acc[key] = state.todosEntities[key];
            return acc;
          }, {}
        );
      return {
        ...state,
        todosEntities: todos
      };
    }

    case TodoActions.DONE_TODO: {
      const todoId = action.payload.todoId;
      const todo = state.todosEntities[todoId];
      return {
        ...state,
        todosEntities: {
          ...state.todosEntities,
          [todoId]: {...todo, status: 'Done'}
        }
      };
    }


    case TodoActions.REQUESTED_TODOS_SUCCESS:

      const todos = action.payload.todos.reduce((result, todo) => {
        return ({
          ...result,
          [todo._id]: todo
        });
      }, {});
      return {
        ...state,
        todosEntities: todos
      };


    default:
      return state;
  }

};
