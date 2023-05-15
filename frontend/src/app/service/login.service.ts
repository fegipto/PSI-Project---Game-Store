import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../service/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { ListItems } from '../lists';
import { Item } from '../item';
import { LoginComponent } from "../login/login.component";
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root',
})
export class LoginService  {
  uri = 'http://localhost:3031';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private cookieService: CookieService
  ) {
  }



  isLoggedIn(): boolean {
    const loggedIn = this.cookieService.get("loggedIn");
    const userID = Number(this.cookieService.get("userID"));

    //if (loggedIn === "true" && (userID >= 0 && !isNaN(userID))) {
    if (loggedIn === "true"){
      return true;
    }

    return false;

  }

  getCookieService(){
    return this.cookieService;
  }

  logout() {
    this.getCookieService().set("loggedIn", "false");
    this.getCookieService().set("oldID",this.getCookieService().get("userID"));
    this.getCookieService().set("userID", "-1");
    this.getCookieService().set('nItems', "0");
    this.getCookieService().set("cart", "");
  } 

  getLoginID() : number {
    if (this.isLoggedIn()) {
      return Number(this.cookieService.get("userID"));
    }
    return -1;
  }

  tryLogin(name: string, password: string): Observable<User> {
    return this.http
      .get<User>(`${this.uri}/login/${name}/${password}`)
      .pipe(catchError(this.handleError<User>('tryLogin', )));
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

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
}
