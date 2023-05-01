import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../service/user.service';
import { User } from '../user';
import { ListItems } from '../lists';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User | undefined;
  selectedOption:String = "";
  listItems: ListItems[] = [];
  followers: User[] = [];
  following: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    public loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.getuser(); 
    this.getLists();
    this.getFollowing();
    this.getFollowers();

  }

  getFollowing(): void {
    this.userService.getFollowing()
      .subscribe(users => this.following= users);
  }

  getFollowers(): void {
    this.userService.getFollowers()
      .subscribe(users => this.followers= users);
  }

  getLists(): void {
    this.userService.getLists()
      .subscribe(users => this.listItems = users);
  }
  
  getuser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }

}


