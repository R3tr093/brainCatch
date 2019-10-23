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
 
    this.showModal("Bonjour " + this.userName + " merci d'utiliser brainCatch.",5000);

    if(!this.userService.isRegistered && !this.userService.isLogged)
    {
      //window.location.href = "/";
    }

   

    else
    {
      this.userName = this.userService.userData[0].name;

      this.userData = this.userService.userData;
     
    }

    
  }

  showModal(text:string,timer:number) {
    
    var elem = document.getElementById("modal");

    var elemTxt = document.getElementById('modalTxt');

    elemTxt.textContent = "";

    elemTxt.textContent = text;

    var pos = 115;

    var id = setInterval(frame, 35);

    function frame() {
      if (pos == 83) {
        clearInterval(id);

        setTimeout(()=> {

          var elem = document.getElementById("modal");
          
          var pos = 83;

          var id = setInterval(frame, 35);
          
          function frame() {
            if (pos == 115) {
              clearInterval(id);
            } 
            else {
              pos++;
              elem.style.top = pos + '%';
              
            }
          }

        },timer)

      } else {
        pos--;
        elem.style.top = pos + '%';
        
      }
    }
  }


}
