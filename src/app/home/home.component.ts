import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { UsersServicesService } from '../services/users.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  constructor(private userService : UsersServicesService) { }

  ngOnInit() {

      //this.userService.getUser();

     this.userService.postUser({"name":"mLab Support", "email": "support@mlab.com", "password": "password"});
  }

}
