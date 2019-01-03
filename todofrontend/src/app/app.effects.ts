import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {RequestedTodos, RequestedTodosSuccess, TodoActions} from './todos/state/todos.actions';
import {Todo} from './models/todo.model';
import {Observable} from 'rxjs';
import {TodosService} from './todos/todos.service';
import {map, switchMap} from 'rxjs/operators';
import {Action} from '@ngrx/store';

@Injectable()
export class AppEffects {

  @Effect()
  requestedTodos$: Observable<Action> = this.actions$.pipe(
    ofType<RequestedTodos>(TodoActions.REQUESTED_TODOS),
    switchMap(() => this.todoService.getTodos().pipe(
      map(todos => new RequestedTodosSuccess({todos}))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private todoService: TodosService
  ) {}


}
