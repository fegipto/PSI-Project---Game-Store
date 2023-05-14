import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {

  constructor(private location:  Location) { }

  goBack(): void {
    this.location.back();
  }


}
