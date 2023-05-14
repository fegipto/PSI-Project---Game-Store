import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  images: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    public loginService: LoginService,
    private router: Router,
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

  decodeImages(): void {
    if (this.user !== undefined) {
        const blob = new Blob([this.user.imagens.data], { type: this.user.imagens.contentType });
        const reader = new FileReader();
        reader.onload = () => {
          this.images.push(reader.result);
        };
        reader.readAsDataURL(blob);
    }
  }

  edit() {
    this.router.navigateByUrl("edit");
  }

}


