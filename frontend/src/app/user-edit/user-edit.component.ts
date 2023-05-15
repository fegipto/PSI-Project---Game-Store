import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(private location:  Location) { }

  name = '';
  usernames: String[] = [];

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getUsernames();
  }

  getUsernames(): void {

  }

  onSubmit(form: NgForm): void {
    this.name = form.value.name.trim();

    if(this.usernames.includes(this.name)) {
      alert('Username already being used. Please try a different one!');
      return;
    }

    //this.userLoginService.addUser({ name: this.username, password: this.password } as User).subscribe();
    alert('Profile successfully updated.')
    window.location.assign('dashboard');
  }
}
