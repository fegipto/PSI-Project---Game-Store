import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { UserloginService } from '../service/userlogin.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(private location:  Location,
      private userLoginService: UserloginService,
      private userService: UserService) { }

  name = '';
  usernames: String[] = [];
  profileImage: File | undefined;

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getUsernames();
  }

  getUsernames(): void {
    this.userLoginService.getUsersNames()
    .subscribe(usersNames => this.usernames = usersNames);
  }

  onSubmit(form: NgForm): void {
    this.name = form.value.name.trim();
    this.profileImage = form.value.profileImage.trim();

    if (!this.name.match(/^([a-zA-Z0-9]*)$/)) {
      alert('The username must only have alphanumeric characters.');
      return;
    }
    if (this.name.length < 3) {
      alert('Name must have at least 3 characters.');
      return;
    }
    if(this.usernames.includes(this.name)) {
      alert('Username already being used. Please try a different one!');
      return;
    }

    if(this.profileImage) {
      this.userService.editUser( this.name, this.profileImage ).subscribe();
      this.usernames.push(this.name);
      alert('Profile successfully updated.')
      window.location.assign('dashboard');
    }
  }
}
