import { EventEmitter, Injectable, HostListener, OnInit } from '@angular/core';
import { Observable, of, switchMap, forkJoin, firstValueFrom } from 'rxjs';
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
  providedIn: 'root',
})
export class CartService {

  constructor(
    private itemService: ItemService,
    private cookieService: CookieService,
  ) {}

  items: Item[] = [];

  quantities: Map<number, number> = new Map<number, number>();

  async ngOnInit() {
    /* await this.getItems();

    this.items.forEach((item) => {
      if (!this.quantities.has(item.id)) {
        this.quantities.set(item.id, 1);
      }
    }); */
    this.loadCart();
  }

  /* ngOnDestroy() {
    this.saveCart();
  } */

  getItems() {
    // TODO: temporary item loading
    return this.items;
  }

  getNumberOfItems() {
    var sum = 0;

    Array.from(this.quantities.values()).forEach((quantity: number) => sum += quantity);

    return sum;
  }
  
  getQuantities(): Map<number, number> {
    return this.quantities;
  }

  async addItem(itemID: number) {
    const item: Item = await firstValueFrom(this.itemService.getItem(itemID));

    if (item) {
      if (this.quantities.has(item.id)) {
        this.increaseAmount(item.id);
        return true;
      }
      this.items.push(item);
      this.quantities.set(item.id, 1);
    }
    this.saveCart();
    return true;
  }

  removeItem(itemID: number) {
    if (this.items) {
      this.items.splice(
        this.items.findIndex((item) => {
          if (item.id === itemID) {
            return true;
          }
          return false;
        }),
        1
      );
      this.quantities.delete(itemID);
    }
    this.saveCart();
  }

  clearCart() {
    this.items = [];
    this.quantities = new Map<number, number>();

    this.saveCart();
  }

  increaseAmount(itemID: number) {
    const curr = this.quantities.get(itemID);
    if (curr) {
      this.quantities.set(itemID, curr + 1);
    }
    this.saveCart();
  }

  decreaseAmount(itemID: number) {
    const curr = this.quantities.get(itemID);
    if (curr && curr > 1) {
      this.quantities.set(itemID, curr - 1);
    } else {
      this.removeItem(itemID);
    }
    this.saveCart();
  }

  getTotalPrice() {
    let sum = 0;
    this.items.forEach((item) => {
      const itemQuantity = this.quantities.get(item.id);
      if (itemQuantity) {
        sum += item.preco * itemQuantity;
      }
    });
    return sum.toFixed(2);
  }

  getItemPrice(itemID: number) {
    const item = this.items.find((item) => {
      if (item.id === itemID) {
        return true;
      }
      return false;
    });
    const itemQuantity = this.quantities.get(itemID);

    if (itemQuantity && item) {
      return (item.preco * itemQuantity).toFixed(2);
    }
    return undefined;
  }

  saveCart() {
    const quantitiesObject = Array.from(this.quantities);
    this.cookieService.set(
      'shoppingCartQuantities',
      JSON.stringify(quantitiesObject)
    );
    this.items.forEach((item) => {
      item.imagens = [];
      item.classificacao = '';
      item.descricao = '';
      item.idiomas = '';
      item.plataforma = '';
      item.video = '';
    });
    this.cookieService.set('shoppingCartItems', JSON.stringify(this.items));
  }

  loadCart() {
    try {
      const quantitiesArray = JSON.parse(
        this.cookieService.get('shoppingCartQuantities')
      );
      this.quantities = new Map(quantitiesArray);
      this.items = JSON.parse(this.cookieService.get('shoppingCartItems'));
    } catch (error) {
      this.quantities = new Map();
      this.items = [];
      return;
    }
  }

}
