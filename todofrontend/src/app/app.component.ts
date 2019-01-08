import {Component, OnInit} from '@angular/core';
import {TodosClient} from './todos/todos-client.service';
import {Todo} from './models/todo.model';
import {Store} from '@ngrx/store';
import {selectAllTodos} from './todos/state/todos.selector';
import {AppState} from './state/app.reducer';
import {TodoService} from './todos/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private todosClient: TodosClient,
    private todoService: TodoService,
    private store: Store<AppState>
  ) {
  }

  public newTodo: Todo = new Todo();

  todosList$ = this.store.select(selectAllTodos);
  editTodos: Todo[] = [];

  ngOnInit(): void {
    this.todoService.requestTodos();
  }


  create() {
    this.todoService.createTodo(this.newTodo);
  }

  editTodo(todo: Todo, id: string = todo._id) {
    // if (!this.todosList.includes(todo)) {
    //   return;
    // }

    if (!this.editTodos.includes(todo)) {
      this.editTodos.push(todo);
    } else {
      this.editTodos.splice(this.editTodos.indexOf(todo), 1);
      this.todoService.updateTodo(todo);

    }
  }


  doneTodo(todo: Todo) {
    this.todoService.doneTodo(todo);
  }

  submitTodo(event, todo: Todo) {
    if (event.keyCode == 13) {
      this.editTodo(todo);
    }
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo)
  }


}
