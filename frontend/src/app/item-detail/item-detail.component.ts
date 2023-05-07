import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ItemService } from '../service/item.service';
import { CartService } from '../service/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { Item } from '../item';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item: Item | undefined;
  itemToCart: Item = {
    id: 0,
    name: '',
    preco: 0,
    descricao: '',
    tipo: '',
    plataforma: '',
    idiomas: '',
    classificacao: '',
    avaliacoes: 0,
    imagens: [],
    video: ''
  };
  selectedOption: String = "";
  images: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private location: Location,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.getItem();
  }

  setItemToCart(){
    if (this.item !== undefined) {
        this.itemToCart.id = this.item.id,
        this.itemToCart.name = this.item.name;
        this.itemToCart.preco = this.item.preco;
      };   
  }

  getItem(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.itemService.getItem(id).subscribe(item => {
      this.item = item;
      this.decodeImages();
      this.setItemToCart();
    });

  }

  decodeImages(): void {
    if (this.item !== undefined) {
      for (let i = 0; i < this.item.imagens.length; i++) {
        const blob = new Blob([this.item.imagens[i].data], { type: this.item.imagens[i].contentType });
        const reader = new FileReader();
        reader.onload = () => {
          this.images.push(reader.result);
        };
        reader.readAsDataURL(blob);
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
  

  addItemCart(item: Item) {
    if (item) {
      this.cartService.addItemCartCookie(item);
    }
  }
}
