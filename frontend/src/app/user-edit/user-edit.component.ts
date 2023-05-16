import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserloginService } from '../service/userlogin.service';
import { UserService } from '../service/user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User | undefined;
  imagem_profile_url: string = '';

  constructor(
    private location: Location,
    private userLoginService: UserloginService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  name: String = '';
  usernames: String[] = [];
  profileImage: String = '';

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getUsernames();
    this.getuser();
  }

  getUsernames(): void {
    this.userLoginService.getUsersNames()
      .subscribe(usersNames => this.usernames = usersNames);
  }

  getuser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(+this.userService.getLoginID())
      .subscribe(user => this.user = user);
  }

  onSubmit(form: NgForm): void {
    if (!this.profileImage) {
      alert('Please select a profile image.');
      return;
    }

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
    if (this.usernames.includes(this.name)) {
      alert('Username already being used. Please try a different one!');
      return;
    }

    this.userService.editUser(this.name, this.profileImage).subscribe();
    this.usernames.push(this.name);
    alert('Profile successfully updated.');
    window.location.assign('dashboard');
  }
}
