import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../service/user.service';
import { User } from '../user';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

 

  constructor(private userService: UserService, 
              private location: Location, public loginService: LoginService) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  getIdLogin(){
    return this.userService.getLoginID();
  }


}