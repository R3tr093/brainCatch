import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { UsersServicesService } from '../services/users.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  formOnScreen : boolean = false;

  constructor(private userService : UsersServicesService) { }

  ngOnInit() {


    


      //this.userService.getUser("mLab Support");

     //this.userService.postUser({"name":"mLab Support", "password": "password"});
  }

  displayAuth()
  {

    if(!this.formOnScreen)
    {
      document.getElementById('authForm').classList.remove("slideOutDown");
      document.getElementById("authForm").classList.add('slideInDown');
      document.getElementById("authForm").style.display ="block";
      this.formOnScreen = true;
    }

    else
    {
      document.getElementById("authForm").classList.remove('slideInDown');
      document.getElementById("authForm").classList.add('slideOutDown');
      document.getElementById("authForm").style.display ="block";
      this.formOnScreen = false;
    }

   
  }

  displayLogIn()
  {

    if(!this.formOnScreen)
    {
      document.getElementById('logInForm').classList.remove("slideOutDown");
      document.getElementById("logInForm").classList.add('slideInDown');
      document.getElementById("logInForm").style.display ="block";
      this.formOnScreen = true;
    }

    else
    {
      document.getElementById("logInForm").classList.remove('slideInDown');
      document.getElementById("logInForm").classList.add('slideOutDown');
      document.getElementById("logInForm").style.display ="block";
      this.formOnScreen = false;
    }

   
  }

  postUser(){

    let name = String((<HTMLInputElement>document.getElementById("name")).value);
    let password = String((<HTMLInputElement>document.getElementById("password")).value);
    let password2 = String((<HTMLInputElement>document.getElementById("password2")).value);

    if(password2 !== password)
    {
      document.getElementById('postReport').textContent = "";
      document.getElementById('postReport').innerHTML = "Erreur :  Vos mots de passe ne sont pas identiques ! "
    }

    if(name.length <= 5)
    {
      document.getElementById('postReport').textContent = "";
      document.getElementById('postReport').textContent = "Erreur : Votre nom d'utilisateur doit faire plus de 5 caractères.";
    }

    if(password2 === password && name.length > 5)
    {
      this.userService.postUser({"name": name, "password": password});
    }


  }

  logUser(){
     let name = String((<HTMLInputElement>document.getElementById("authName")).value);
     let password = String((<HTMLInputElement>document.getElementById("authPassword")).value);

     this.userService.getUser(name);
     
  }

}
