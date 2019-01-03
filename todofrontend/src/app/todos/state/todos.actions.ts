import {Action} from '@ngrx/store';
import {Todo} from '../../models/todo.model';

export enum TodoActions {
  REQUESTED_TODOS = '[TODOS] Requested Todos',
  REQUESTED_TODOS_SUCCESS = '[API] Requested Todos Success',
  CREATE_TODO = '[TODOS] Create Todo',
  EDIT_TODO = '[TODOS] Edit Todo',
  DELETE_TODO = '[TODO] Delete Todo',
  DONE_TODO = '[TODO] Done Todo'
}


export class RequestedTodos implements Action {
  readonly type = TodoActions.REQUESTED_TODOS;
}

export class RequestedTodosSuccess implements Action {
  readonly type = TodoActions.REQUESTED_TODOS_SUCCESS;
  constructor(public readonly payload: {todos: Todo[]}) {}
}

export class CreateTodo implements Action {
  readonly type = TodoActions.CREATE_TODO;
  constructor(public readonly payload: {todo: Todo}) {}
}

export class EditTodo implements Action {
  readonly type = TodoActions.EDIT_TODO;
  constructor(public readonly payload: {todo: Todo}) {}
}

export class DeleteTodo implements Action {
  readonly type = TodoActions.DELETE_TODO;
  constructor(public readonly payload: {todoId: string}) {}
}

export class DoneTodo implements Action {
  readonly type = TodoActions.DONE_TODO;
  constructor(public readonly payload: {todoId: string}) {}
}


export type TodoActionsUnion =
  RequestedTodos |
  RequestedTodosSuccess |
  CreateTodo |
  EditTodo|
  DeleteTodo |
  DoneTodo
