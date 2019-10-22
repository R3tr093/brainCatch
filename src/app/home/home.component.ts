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
  count : number = 1000;
  userData : any;
  usedName : any;
 
  


  constructor(private userService : UsersServicesService) {
   
  }

  ngOnInit() {
      this.userService.getUsers();
      this.usedName = this.userService.usedName;
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
    let report = "";

    let nameUsed = false;

    let i = 0;

    for(i = 0; i < this.usedName.length; i++)
    {
      if(this.usedName[i].name === name)
      {
        nameUsed = true;
      }
    }


    if(nameUsed)
    {
      document.getElementById('postReport').textContent = "";
      document.getElementById('postReport').innerHTML = "Erreur : Le pseudo  " + name + " est déjà pris ! ";
    }

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

    if(password2 === password && name.length > 5 && !nameUsed)
    {
      
      document.getElementById('postBtn').style.display = " none ";
      document.getElementById('postSpinner').style.display = "block";

      this.userService.postUser({"name": name, "password": password}); 

      let report = "";
      
      setTimeout(() => { 
  
        if(!this.userService.isRegistered)
        {
          
          if(this.count < 6000 && !this.userService.isRegistered )
          {
            this.postUser();
            this.count = this.count + 500;
            report = " En attente ..."
            document.getElementById('postSpinner').style.opacity = "1";
            document.getElementById('postReport').textContent = report;
          }
          
          if(this.count > 6000)
          {
            document.getElementById('postReport').textContent = "";
            report = "Pertubations réseaux, veuillez réessayez plus tard.";
            document.getElementById('postReport').textContent = report;
            document.getElementById('postBtn').style.display = " block ";
            document.getElementById('postSpinner').style.opacity = "0";
            document.getElementById('postSpinner').style.display = "none !important";
          }
        }

        if(this.userService.isRegistered)
        {
           report = "Votre compte à été créer ! ";
           document.getElementById('postReport').textContent = "";
           document.getElementById('postReport').textContent = report;
           document.getElementById('postBtn').style.display = " block ";
           document.getElementById('postSpinner').style.opacity = "0";
           document.getElementById('postSpinner').style.display = "none !important";
        }
      
        console.log(this.count)

      }, this.count);

     
    }
  }

  logUser(){
     let name = String((<HTMLInputElement>document.getElementById("authName")).value);
     let password = String((<HTMLInputElement>document.getElementById("authPassword")).value);

     
    
    if(name.length > 5)
    {
     this.userService.logInUser({"name": name, "password": password});
    
    }

    else
    {
      document.getElementById('authReport').textContent = "";
      document.getElementById('authReport').textContent = "Information de connexion invalide ! ";
    }

     
     
  }

}
