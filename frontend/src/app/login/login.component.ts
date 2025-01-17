import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { MessageService } from '../service/message.service';
import { CartService } from '../service/cart.service';
import { Item } from '../item';
import { timeInterval, timeout } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  username: String = "";
  password: String = "";
  loggedIn: boolean = false;
  userId: number = -1;

  constructor(private router: Router, 
    public loginService: LoginService, 
    private location: Location, 
    private cartService: CartService) {}

  ngOnInit(): void {
    this.loginService.getCookieService().set("loggedIn", "false");
    this.loginService.getCookieService().set("userID", "-1");
  }

  onSubmit(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;

    if (username.length === 0 || username.length > 99) {
      return;
    }

    if (password.length === 0 || password.length > 99) {
      return;
    }

    //console.log('username: ' + username + '\npassword: ' + password);

    this.loginService.tryLogin(username, password).subscribe((user) => {
      if (user == null) {
        alert("Failed Login")
        setTimeout(() => {
          window.location.reload()
        }, 200);
        return;
      }
      alert("Successful Login")
      this.loggedIn = true;
      this.userId = user.id;

      this.loginService.getCookieService().set("loggedIn", "true");
      this.loginService.getCookieService().set("userID",  String(user.id));

      window.location.assign('/dashboard');
    });
  }

  goToRouterLink(path: string): void {
    this.router.navigateByUrl(path);
  }

  

}
