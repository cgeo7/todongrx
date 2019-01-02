import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  readonly baseUrl = "api/todos";

  constructor(private http: HttpClient) { }


  createTodo(todo: Todo): Observable<any>{
    return this.http.post(this.baseUrl, todo);
  }

  getTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.baseUrl)
  }

  editTodo(id: string, todo:Todo){
    let editUrl = `${this.baseUrl}/${id}`;
    return this.http.put(editUrl, todo);
  }

  deleteTodo(id:string):any{
    let deleteUrl = `${this.baseUrl}/${id}`;
    return this.http.delete(deleteUrl);
  }
}
