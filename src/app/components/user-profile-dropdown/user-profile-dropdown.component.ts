import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile-dropdown',
  templateUrl: './user-profile-dropdown.component.html',
  styleUrls: ['./user-profile-dropdown.component.scss']
})
export class UserProfileDropdownComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  btnProfileClick() {
    console.log('clicked on user profile');
  }

}
