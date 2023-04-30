import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { timeInterval, timeout } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  
  username: String = "";
  password: String = "";
  loggedIn: boolean = false;
  userId: number = -1;

  constructor(private loginService: LoginService, private location: Location, private cookieService: CookieService) {}

  onSubmit(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;

    if (username.length === 0 || username.length > 99) {
      return;
    }

    if (password.length === 0 || password.length > 99) {
      return;
    }

    console.log('username: ' + username + '\npassword: ' + password);

    this.loginService.tryLogin(username, password).subscribe((user) => {
      if (user == null) {
        console.log("Failed Login")
        setTimeout(() => {
          window.location.reload()
        }, 200);
        return;
      }
      console.log("Successful Login")
      this.loggedIn = true;
      this.userId = user.id;

      this.cookieService.set("loggedIn", "true");
      this.cookieService.set("userID",  String(user.id));

      window.location.assign(window.location.origin);
    });
  }

}
