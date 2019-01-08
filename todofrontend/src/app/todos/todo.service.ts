import { Injectable } from '@angular/core';
import {TodosClient} from './todos-client.service';
import {AppState} from '../state/app.reducer';
import {Store} from '@ngrx/store';
import {CreateTodo, DeleteTodo, DoneTodo, EditTodo, RequestedTodos} from './state/todos.actions';
import {Todo} from '../models/todo.model';

@Injectable({providedIn: 'root'})
export class TodoService {

  constructor(
    private store: Store<AppState>
  ) { }

  requestTodos() {
    this.store.dispatch(new RequestedTodos())
  }

  createTodo(todo: Todo) {
    this.store.dispatch(new CreateTodo({todo}))
  }

  doneTodo({_id}: Todo) {
    this.store.dispatch(new DoneTodo({todoId: _id}))
  }

  deleteTodo({_id}: Todo) {
    this.store.dispatch(new DeleteTodo({todoId: _id}))
  }

  updateTodo(todo: Todo) {
    this.store.dispatch(new EditTodo({todo}))
  }
}
