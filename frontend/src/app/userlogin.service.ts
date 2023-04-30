import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { userlogin } from './userlogin';
import { MessageService } from './service/message.service';

@Injectable({
  providedIn: 'root'
})
export class UserloginService {

  private userLoginurl = 'api/login';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  getUsersLogin(): Observable<userlogin[]> {
    return this.http.get<userlogin[]>(this.userLoginurl)
      .pipe(
        tap(_ => this.log('fetched userslogin')),
        catchError(this.handleError<userlogin[]>('getusersLogin', []))
      );
  }

  /** POST: add a new userlogin to the server */
  addUserLogin(userlogin: userlogin): Observable<userlogin> {
    return this.http.post<userlogin>(this.userLoginurl, userlogin, this.httpOptions).pipe(
      tap((newUserLogin: userlogin) => this.log(`added userlogin w/ id=${newUserLogin._id}`)),
      catchError(this.handleError<userlogin>('addUserLogin'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a UserLoginService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`UserLoginService: ${message}`);
  }
}
