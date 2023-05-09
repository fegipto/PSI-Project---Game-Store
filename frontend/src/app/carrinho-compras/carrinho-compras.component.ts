import { Component } from '@angular/core';

declare const Array: any;

@Component({
  selector: 'app-carrinho-compras',
  templateUrl: './carrinho-compras.component.html',
  styleUrls: ['./carrinho-compras.component.css']
})
export class CarrinhoComprasComponent {
Array(arg0: number): any {
  var res = new Array();
  for (let index = 0; index < arg0; index++) {
    res.push(index);
  }
  return res;
}

  /**
   *
   */
  constructor() {
    
  }

}
