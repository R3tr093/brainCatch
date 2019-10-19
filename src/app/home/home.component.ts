import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { UsersServicesService } from '../users-services.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  constructor(private userService : UsersServicesService) { }

  ngOnInit() {
    this.userService.getUser();
  }

}
