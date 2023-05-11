import { Component } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../service/item.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-carrinho-compras',
  templateUrl: './carrinho-compras.component.html',
  styleUrls: ['./carrinho-compras.component.css'],
})
export class CarrinhoComprasComponent {
  /**
   *
   */
  constructor(private itemService: ItemService) {}

  items: Item[] = [];

  quantities: Map<number, number> = new Map<number, number>();

  async ngOnInit() {

    await this.getItems();

    this.items.forEach((item) => {
      if (!this.quantities.has(item.id)) {
        this.quantities.set(item.id, 1);
      }
    });

  }

  async getItems() {
    // TODO: temporary item loading
    this.items = await firstValueFrom(this.itemService.searchItems('ite'));
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
    }
  }

  increaseAmount(itemID: number) {
    const curr = this.quantities.get(itemID);
    if (curr) {
      this.quantities.set(itemID, curr + 1);
    }
  }

  decreaseAmount(itemID: number) {
    const curr = this.quantities.get(itemID);
    if (curr && curr > 1) {
      this.quantities.set(itemID, curr - 1);
    } else {
      this.removeItem(itemID);
    }
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
}
