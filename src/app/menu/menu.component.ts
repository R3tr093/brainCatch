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
    console.log(this.userService.userData)
   
    if(!this.userService.isRegistered && !this.userService.isLogged)
    {
      window.location.href = "/";
    }

    if(this.userService.isRegistered)
    {
      this.userName = this.userService.userData.name;

      this.userService.getUser(this.userName)
      setTimeout(()=>{
        this.userData = this.userService.userData;
        console.log(this.userData)

      },5000)
    }

    if(!this.userService.isRegistered)
    {
      this.userName = this.userService.userData[0].name;

      this.userData = this.userService.userData;
     
    }

    
  }

}
