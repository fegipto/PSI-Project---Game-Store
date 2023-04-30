import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ItemService } from '../service/item.service';
import { Item } from '../item';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item: Item | undefined;
  selectedOption: String = "";
  images: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getItem();
  }

  getItem(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.itemService.getItem(id).subscribe(item => {
      this.item = item;
      this.decodeImages();
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
}
