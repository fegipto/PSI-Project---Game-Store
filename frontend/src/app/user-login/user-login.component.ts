import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { UserloginService } from '../userlogin.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  userId: number = Math.random();
  username: String = "";
  password: String = "";

  constructor(private userLoginService: UserloginService) {}

  onSubmit(form: NgForm) {
    this.username = form.value.username;
    this.password = form.value.password;

    if(!this.password.match("^.*(([a-z]+.*[A-Z]+.*[0-9]+)|([A-Z]+.*[a-z]+.*[0-9]+)|([A-Z]+.*[0-9]+.*[a-z]+)|([a-z]+.*[0-9]+.*[A-Z]+)|([0-9]+.*[a-z]+.*[A-Z]+)|([0-9]+.*[A-Z]+.*[a-z]+)).*$")) {
      alert("The password should contain at least 1 Uppercased letter, 1 lowercased letter and 1 number.");
    }
    if(this.password.length < 8) {
      alert("The password should contain at least 8 characters.");
    }
    if(!this.username.match("^[a-zA-Z0-9]$")) {
      alert("Name can only use alphanumeric characters");
    }
    if(this.username.length < 3) {
      alert("Name must have at least 3 characters");
    }

    if (!this.username) { return; }
    if (!this.password) { return; }
    this.userLoginService.addUser({ id: this.userId, name: this.username, password: this.password } as User)
      .subscribe();
  }
}
