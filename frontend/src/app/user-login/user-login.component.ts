import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { UserloginService } from '../service/userlogin.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  userId = Math.random();
  username = '';
  password = '';

  constructor(private location: Location, private userLoginService: UserloginService) {}

  onSubmit(form: NgForm): void {
    this.username = form.value.username.trim();
    this.password = form.value.password.trim();

    if (!this.password.match(/^.*(([a-z]+.*[A-Z]+.*[0-9]+)|([A-Z]+.*[a-z]+.*[0-9]+)|([A-Z]+.*[0-9]+.*[a-z]+)|([a-z]+.*[0-9]+.*[A-Z]+)|([0-9]+.*[a-z]+.*[A-Z]+)|([0-9]+.*[A-Z]+.*[a-z]+)).*$/)) {
      alert('The password should contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.');
      return;
    }
    if (this.password.length < 8) {
      alert('The password should contain at least 8 characters.');
      return;
    }
    if (this.username.length < 3) {
      alert('Name must have at least 3 characters.');
      return;
    }

    this.userLoginService.addUser({ name: this.username, password: this.password } as User).subscribe();
    window.location.assign('login');
  }

  goBack(): void {
    this.location.back();
  }
}
