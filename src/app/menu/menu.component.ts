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
  userData : any;

  constructor(private userService : UsersServicesService, private router : Router) { }

  ngOnInit() {
 
   
    if(!this.userService.isRegistered && !this.userService.isLogged)
    {
      window.location.href = "/";
    }

    else
    {
      this.userName = this.userService.userData[0].name;

      this.userData = this.userService.userData;
     
    }

    
  }

}
