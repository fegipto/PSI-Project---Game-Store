import { EventEmitter, Injectable, HostListener, OnInit } from '@angular/core';
import { Observable, of,switchMap, forkJoin } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../service/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { ListItems } from '../lists';
import { Item } from '../item';
import { Cart } from '../cart';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './login.service';
import { ItemService } from './item.service';
import mongoose, { Types } from 'mongoose';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  uri = "http://localhost:3031";
  cartUpdated =  new EventEmitter<{"cart":Map<Item, number>, "n":number}>();
  cartMap = new Map<Item, number>();

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private itemService: ItemService,
    private loginService: LoginService,
  ) {
    const currentUserId: number = this.loginService.getLoginID(); 
    this.getCartFromAPI().subscribe((cartMap: Map<Item, number>) => {
      this.cartMap = cartMap;
      const cartEntries = Array.from(cartMap.entries());
      this.getCookieService().set('cart', JSON.stringify(cartEntries));
      this.getCookieService().set('nItems', this.updateNItems().toString());
      console.log("Constructor", cartMap)      
    });
  }
  
  getCartFromAPI(): Observable<Map<Item,number>> {
    const userId = this.loginService.getLoginID();
    const url = `${this.uri}/users/${userId}/cart`;
  
    return this.http.get<any>(url).pipe(
      switchMap((response) => {
        console.log('Response:', response);
        const itemObservables: Observable<Item>[] = [];
        response.forEach((cartItem: any) => {
          itemObservables.push(this.itemService._getItem(cartItem.item));
        });
        return forkJoin(itemObservables).pipe(
          map((items: Item[]) => {
            const _cartMap: Map<Item,number> = new Map();
            items.forEach((item, i) => {
              _cartMap.set(item, response[i].quantity);
            });
            return _cartMap;
          })
        );
      }),
      catchError(this.handleError<Map<Item,number>>('getCartFromAPI', new Map()))
    );
  }
  
  
  
  

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

logout() {
  this.loginService.logout();
} 

getCookieService() {
  return this.loginService.getCookieService();
} 


addItemCartCookie(item: Item): Map<Item, number> {
  var cart = this.getMapItems();
  var foundItem = null;
  for (const [cartItem, count] of cart.entries()) {
    if (cartItem.id === item.id) {
      foundItem = cartItem;
      break;
    }
  }
  if (foundItem) {
    const count = cart.get(foundItem);
    if (count !== undefined) {
      cart.set(foundItem, count + 1);
    }
  } else {
    cart.set(item, 1);
  }
  this.updateNItems();
  
  this.loginService.getCookieService().set('cart', JSON.stringify(Array.from(cart.entries())));
  this.cartUpdated.emit({"cart": this.cartMap , "n": this.updateNItems()});
  return cart;
}



removeFromCart(item: Item): Map<Item, number> {
  const cart = this.getMapItems();
  let updatedCart = new Map<Item, number>();
  for (const [cartItem, count] of cart.entries()) {
    if (cartItem.id === item.id) {
      if (count > 1) {
        updatedCart.set(cartItem, count - 1);
      }
    } else {
      updatedCart.set(cartItem, count);
    }
  }
  this.loginService.getCookieService().set('cart', JSON.stringify(Array.from(updatedCart.entries())));
  this.cartUpdated.emit({"cart": this.cartMap , "n": this.updateNItems()});
  return updatedCart;
}



clearCart(): Map<Item, number> {
  var cart = this.getMapItems();
  cart.clear();
  this.updateNItems();
  this.loginService.getCookieService().delete('cart');
  this.cartUpdated.emit({"cart": this.cartMap , "n": this.updateNItems()});
  return cart;
}

updateNItems(): number {
  var cart = this.getMapItems();
  let nItems = 0;
  for (const quantity of cart.values()) {
    nItems += quantity;
  }
  this.loginService.getCookieService().set('nItems', nItems.toString());
  return nItems;
}

getMapItems(): Map<Item, number> {
  const cart = new Map<Item, number>();
  const cartCookie = this.loginService.getCookieService().get('cart');
  if (cartCookie) {
    const entries = JSON.parse(cartCookie);
    if (Array.isArray(entries)) {
      for (const [item, quantity] of entries) {
        cart.set(item, quantity);
      }
    }
  }
  return cart;
}

/** 
@HostListener('window:beforeunload', ['$event'])
onBeforeUnload(event: Event) {
  return this.http.post<any>(`${this.uri}/cart`, { cart: this.getMapItems(), id: this.cookieService.get("userID")}).pipe(
    tap(_ => this.log(`added cart`)),
    catchError(this.handleError<any>('add cart'))
  );
}*/

saveCart() {

  const userID = this.loginService.getCookieService().get("userID");

  const cart: Cart = {};
  
  const cartData = {
    cart: Array.from(this.getMapItems().entries()).reduce((cart:Cart = {}, [item, quantity]) => {
      cart[item.id] = quantity;
      return cart;
    }, {}),
    id: userID,
  };
  return this.http.post<any>(`${this.uri}/cart`, cartData).pipe(
    tap(res => {
      const message = res.message;
      alert(message);
      this.log(`added cart`);
    }),
    catchError(this.handleError<any>('add cart'))
  );
}





 



getItem(id: Number): Observable<Item>{
  return this.http.get<Item>(`${this.uri}/itemsdetail/${id}`)
      .pipe(
        catchError(this.handleError<Item>('getId', ))
      );
} 

_getItem(id: Number): Observable<Item>{
  return this.http.get<Item>(`${this.uri}/_itemsdetail/${id}`)
      .pipe(
        catchError(this.handleError<Item>('_getId', ))
      );
} 






  /** Log a UserService message with the MessageService */
private log(message: string) {
  this.messageService.add(`itemService: ${message}`);
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


}



  