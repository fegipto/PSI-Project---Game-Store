import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Location } from '@angular/common';
import { Item } from '../item';
import { ListItems } from '../lists';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {

  constructor(private userService: UserService,
    private location:  Location, public loginService: LoginService) { }

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

  goBack(): void {
    this.location.back();
  }

}
