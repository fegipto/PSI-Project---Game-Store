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

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    public loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.getuser();
    this.getLists();
    
  }
  save(): void {
    if (this.user) {
      this.userService.updateUser(this.user)
        .subscribe(() => this.goBack());
    }
  }
  
  getuser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

  getLists(): void {
    this.userService.getLists()
      .subscribe(users => this.listItems = users);
  }

  goBack(): void {
    this.location.back();
  }

}


