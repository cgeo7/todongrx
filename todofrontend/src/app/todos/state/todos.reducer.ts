import {Todo} from '../../models/todo.model';
import {Action} from '@ngrx/store';

export interface TodoState {
  todosList: Todo[]
}

const initialState : TodoState = {
  todosList: []
}

export const todosReducer = (state: TodoState, action: any) => {

  switch (action.type) {

    case 'TODOS_REQUESTED':
      return state;

    case 'TODOS_RETRIEVED':
      return {
        ...state,
        todosList: action.payload
      };

    case 'TODO_DELETED':
      return {
        ...state,
        todosList: state.todosList.filter(t => t._id !== action.payload)
      };

    default:
      return state;
  }

}
