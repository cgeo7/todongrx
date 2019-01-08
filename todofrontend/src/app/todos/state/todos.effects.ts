import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import {CreateTodo, DeleteTodo, DoneTodo, EditTodo, RequestedTodos, RequestedTodosSuccess, TodoActions} from './todos.actions';
import {TodosClient} from '../todos-client.service';
import {undo} from 'ngrx-undo';
import {selectTodoById} from './todos.selector';
import {AppState} from '../../state/app.reducer';

@Injectable()
export class TodoEffects {

  @Effect()
  requestedTodos$: Observable<Action> = this.actions$.pipe(
    ofType<RequestedTodos>(TodoActions.REQUESTED_TODOS),
    switchMap(() => this.todosClient.getTodos().pipe(
      map(todos => new RequestedTodosSuccess({todos}))
      )
    )
  );

  @Effect({dispatch: false})
  createTodo$: Observable<Action> = this.actions$.pipe(
    ofType<CreateTodo>(TodoActions.CREATE_TODO),
    switchMap(action => this.todosClient.createTodo(action.payload.todo)
      .pipe(
        catchError(() => of(undo(action)))
        // map(todo => new CreateTodoSuccess({todo}))
      )
    )
  );

  @Effect({dispatch: false})
  editTodo$: Observable<Action> = this.actions$.pipe(
    ofType<EditTodo>(TodoActions.EDIT_TODO),
    switchMap(action => this.todosClient.editTodo(action.payload.todo)
      .pipe(
        catchError(() => of(undo(action)))
        // map(todo => new EditTodoSuccess({todo}))
      )
    )
  );


  @Effect({dispatch: false})
  doneTodo$: Observable<any> = this.actions$.pipe(
    ofType<DoneTodo>(TodoActions.DONE_TODO),
    switchMap(action =>
      this.store.select(selectTodoById(action.payload.todoId)).pipe(
        switchMap(todo => this.todosClient.editTodo(todo)),
        catchError(() => of(undo(action)))
      )
    )
  );


  @Effect({dispatch: false})
  deleteTodos$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteTodo>(TodoActions.DELETE_TODO),
    switchMap((action) => this.todosClient.deleteTodo(action.payload.todoId)
      .pipe(
        catchError(() => of(undo(action)))
        //   map(todo => new DeleteTodoSuccess({todo}))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private todosClient: TodosClient
  ) {
  }


}
