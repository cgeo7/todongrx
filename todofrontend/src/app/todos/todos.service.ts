import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private readonly baseUrl = 'api/todos';

  constructor(private http: HttpClient) {
  }


  createTodo(todo: Todo): Observable<any> {
    return this.http.post(this.baseUrl, todo);
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  editTodo(id: string, todo: Todo) {
    let editUrl = `${this.baseUrl}/${id}`;
    return this.http.put(editUrl, todo);
  }

  deleteTodo(id: string): Observable<any> {
    let deleteUrl = `${this.baseUrl}/${id}`;
    return this.http.delete(deleteUrl);
  }
}
