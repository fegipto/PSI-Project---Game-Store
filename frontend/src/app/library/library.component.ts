import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Location } from '@angular/common';
import { Item } from '../item';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {

  constructor(private userService: UserService,
    private location:  Location,
    public loginService: LoginService) { }

  items: Item[] = [];

  getIdLogin(){
    return this.userService.getLoginID();
  }

  ngOnInit(): void {
    this.getLibrary();
  }

  getLibrary(): void {
    this.userService.getLibrary()
      .subscribe(items => this.items= items);
  }

  orderByName(): void {
    this.items.sort(function (a,b) {
      if (a.name < b.name) {
        return -1;
      }
      else if (a.name == b.name) {
        return 0;
      } 
      else {
        return 1;
      }
    })
  }

  orderByDate(): void {
    this.items.sort(function (a,b) {
      if (a.date < b.date) {
        return -1;
      }
      else if (a.date == b.date) {
        return 0;
      } 
      else {
        return 1;
      }
    })
  }

  goBack(): void {
    this.location.back();
  }
}
