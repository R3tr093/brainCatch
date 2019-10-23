import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { UsersServicesService } from '../services/users.service';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  userName : string = "Anonyme";

  constructor(private userService : UsersServicesService, private router : Router) { }

  ngOnInit() {
    console.log(this.userService.userData)
    this.userName = this.userService.userData[0].name;
  }

}
