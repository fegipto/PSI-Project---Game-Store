import { Component } from '@angular/core';

import { userlogin } from '../userlogin';
import { UserloginService } from '../service/userlogin.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  constructor(private userLoginService: UserloginService) {}

  add(name: string, password: string): void {

    name = name.trim();
    password = password.trim();

    if(!password.match("^.(([a-z]+.[A-Z]+.[0-9]+)|([A-Z]+.[a-z]+.[0-9]+)|([A-Z]+.[0-9]+.[a-z]+)|([a-z]+.[0-9]+.[A-Z]+)|([0-9]+.[a-z]+.[A-Z]+)|([0-9]+.[A-Z]+.[a-z]+)).$")) {
      alert("The password should contain at least 1 Uppercased letter, 1 lowercased letter and 1 number.");
    }
    if(password.length < 8) {
      alert("The password should contain at least 8 characters.");
    }
    if(!name.match("^[a-zA-Z0-9]$")) {
      alert("Name can only use alphanumeric characters");
    }
    if(name.length < 3) {
      alert("Name must have at least 3 characters");
    }
    if (!password.match('[0-9]')) {
        alert("Password does not contain numbers");
    }
    if (!name) { return; }
    if (!password) { return; }
    this.userLoginService.addUserLogin({ name, password } as userlogin)
      .subscribe();
    window.location.assign("login");
  }
}
