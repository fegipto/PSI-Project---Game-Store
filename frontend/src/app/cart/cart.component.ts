import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { CartService } from '../service/cart.service';
import { LoginService } from '../service/login.service';
import { Observable, timeInterval, timeout } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Item } from '../item';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  /* 
  nItems = 0;
  cart: Map<Item, number> = new Map<Item, number>();
  
  constructor(private router: Router, 
    public cartService: CartService, 
    private location: Location) {}

    ngOnInit(): void {
      this.cart = this.cartService.getMapItems();
      this.nItems = this.cartService.updateNItems();
      this.cartService.cartUpdated.subscribe(cart => {
        this.cart = cart.cart;
        this.nItems = cart.n;
        this.cartService.getCookieService().set('cart', JSON.stringify(Array.from(cart.cart.entries())));
        this.cartService.getCookieService().set('nItems', cart.n.toString());
      });
    }

addToCart(item: Item): void {
  this.updateNItems();
  this.cart = this.cartService.addItemCartCookie(item);
}


removeFromCart(item: Item): void {
  this.updateNItems();
  this.cart = this.cartService.removeFromCart(item);

}


clearCart(): void {
  this.updateNItems();
  this.cart = this.cartService.clearCart();

}

updateNItems(): void {
  this.nItems = this.cartService.updateNItems();
}

goToRouterLink(path: string): void {
  this.router.navigateByUrl(path);
}

calculateTotalPrice(): number {
  let totalPrice = 0;
  for (const [item, quantity] of this.cart) {
    totalPrice += item.preco * quantity;
  }
  return parseFloat(totalPrice.toFixed(2));
}

decreaseQuantity(item: Item) {
  this.cartService.removeFromCart(item);
}

increaseQuantity(item: Item) {
  this.cartService.addItemCartCookie(item);
}

saveCart(): void {
  this.cartService.saveCart().subscribe();
}
 */
}
