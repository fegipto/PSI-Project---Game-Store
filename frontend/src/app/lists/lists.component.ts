import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../user';
import { ListItems } from '../lists';
import { Item } from '../item';
import { Location } from '@angular/common';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent {

  listItems: ListItems[] = [];


  constructor(private userService: UserService,
    private location:  Location, public loginService: LoginService) { }

  ngOnInit(): void {
    this.getLists();
  }

  getLists(): void {
    this.userService.getLists()
      .subscribe(users => this.listItems = users);
  }


  getIdLogin(){
    return this.userService.getLoginID();
  }

  goBack(): void {
    this.location.back();
  }


}
