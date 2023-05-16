import { Component, Injectable } from '@angular/core';
import { Item } from '../item';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import { CheckoutService } from '../service/checkout.service'

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(
    private cookieService: CookieService,
    private location: Location,
    private checkoutService: CheckoutService
  ) { }

  selectedPaymentMethod = "";
  items: Item[] = [];
  isMbwayChecked = false;
  isCcChecked = false;

  quantities: Map<number, number> = new Map<number, number>();

  async ngOnInit() {
    this.loadCart();
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

  onCheckboxChange(paymentMethod: string): void {
    if (paymentMethod === 'cc') {
      this.selectedPaymentMethod = 'cc';
      this.isMbwayChecked = false;
    } else if (paymentMethod === 'mbway') {
      this.selectedPaymentMethod = 'mbway';
      this.isCcChecked = false;
    }
  }

  async submit(): Promise<void> {
    await this.checkoutService.getCheckout().subscribe((res) => {
      console.log(res);
      alert(JSON.stringify(res));
    });

  }

  goBack(): void {
    this.location.back();
  }

}