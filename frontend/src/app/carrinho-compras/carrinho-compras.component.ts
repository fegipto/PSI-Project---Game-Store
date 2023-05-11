import { Component } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-carrinho-compras',
  templateUrl: './carrinho-compras.component.html',
  styleUrls: ['./carrinho-compras.component.css'],
})
export class CarrinhoComprasComponent {
getTotalPrice() {
  let sum = 0;
  this.items.forEach((item) => {
    sum += item.preco * this.quantity;
  });
  return sum.toFixed(2);
}

  /**
   *
   */
  constructor(private itemService: ItemService) {
    
  }

  
  items: Item[] = [];

  quantity = 1;

  ngOnInit() { 
    this.itemService.searchItems("ite").subscribe( items => {  
      this.items = items;
    });
  }

  removeItem(itemID: Number) {
    if (this.items) {
      this.items.splice(this.items.findIndex( (item) => {
        if (item.id === itemID) {
          return true;
        }
        return false;
      } ), 1);
    }
  }


  increaseAmount(itemID: Number) {
    this.quantity++;
  }

  decreaseAmount(itemID: Number) {
    if (this.quantity > 1) {
      this.quantity--;
    } else {
      // this.removeItem();
    }
  }
}
