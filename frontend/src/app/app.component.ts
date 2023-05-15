import { Component } from '@angular/core';
import { LoginService } from './service/login.service';
import { CartService } from './service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Projeto PSI';

  constructor(public loginService: LoginService, public cartService: CartService, private router: Router,) {}

  getNItems() {
    return this.cartService.getNumberOfItems();
  }

  logout() {
    this.loginService.logout();
    this.router.navigateByUrl("login");
  }
}


