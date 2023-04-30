import { Component, OnInit } from '@angular/core';

import { userlogin } from '../userlogin';
import { UserloginService } from '../userlogin.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  userslogin: userlogin[] = [];

  constructor(private userLoginService: UserloginService) {}

  ngOnInit(): void {
    this.getUsersLogin();
  }

  getUsersLogin(): void {
    this.userLoginService.getUsersLogin()
    .subscribe((userslogin: userlogin[]) => this.userslogin = userslogin);
  }

  add(name: string, password: String): void {
    name = name.trim();
    password = password.trim();
    if (!name) { return; }
    if (!password) { return; }
    this.userLoginService.addUserLogin({ name, password } as userlogin)
      .subscribe((userlogin: userlogin) => {
        this.userslogin.push(userlogin);
      });
  }
}
