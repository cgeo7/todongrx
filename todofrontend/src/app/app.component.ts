import {Component, OnInit} from '@angular/core';
import {TodosService} from './todos/todos.service';
import {Todo} from './models/todo.model'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {

  constructor(
    private todoService: TodosService
  ) {
  }

  public newTodo: Todo = new Todo();

  todosList: Todo[];
  editTodos: Todo[] = [];

  ngOnInit(): void {
    this.todoService.getTodos()
      .subscribe(todos => {
        this.todosList = todos;
      });
  }


  create() {
    this.todoService.createTodo(this.newTodo)
      .subscribe((res) => {
        this.todosList.push(res);
        this.newTodo = new Todo();
      }, err => alert("Failed to create Todo!"));
  }

  editTodo(todo: Todo, id: string = todo._id) {
    if (!this.todosList.includes(todo)) {
      return;
    }
    
    if (!this.editTodos.includes(todo)) {
      this.editTodos.push(todo)
    } else {
      this.editTodos.splice(this.editTodos.indexOf(todo), 1);
      this.todoService.editTodo(id, todo).subscribe(res => {
        console.log('Update Successful');
      }, err => {
        this.editTodo(todo);
        alert('Update Failed');
      });

    }
  }


  doneTodo(todo: Todo) {
    todo.status = 'Done';
    this.todoService.editTodo(todo._id, todo)
  }

  submitTodo(event, todo: Todo) {
    if (event.keyCode == 13) {
      this.editTodo(todo);
    }
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo._id).subscribe(res => {
      this.todosList.splice(this.todosList.indexOf(todo), 1);
    });
  }


}
