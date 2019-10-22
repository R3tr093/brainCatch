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
 
  


  constructor(private userService : UsersServicesService) {
   
  }

  ngOnInit() {
      this.userService.getUsers();
  }


  // These two function display the Authentication form or the logIn form by click on button.

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



  // Max delay of 12 sec before abort the request.
  postUser(){

    let name = String((<HTMLInputElement>document.getElementById("name")).value);
    let password = String((<HTMLInputElement>document.getElementById("password")).value);
    let password2 = String((<HTMLInputElement>document.getElementById("password2")).value);


    let nameUsed = false;

    let i = 0;

    for(i = 0; i < this.userService.usedName.length; i++)
      {
        if(this.userService.usedName[i].name === name)
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

    if(password2 === password && name.length > 5 && !nameUsed && !this.userService.isRegistered)
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
            
            setTimeout(()=>{
              this.count = 1000;
            },3000)
          }
        }

        if(this.userService.isRegistered)
        {
           report = "Votre compte à été créer ! ";
           document.getElementById('postReport').textContent = "";
           document.getElementById('postReport').textContent = report;
           document.getElementById('postBtn').style.display = " none ";
           document.getElementById('postSpinner').style.opacity = "0";
           document.getElementById('postSpinner').style.display = "none !important";
           this.count = 1000;
           
        }
      }, this.count);
    }
  }

  logUser(){

     let name = String((<HTMLInputElement>document.getElementById("authName")).value);
     let password = String((<HTMLInputElement>document.getElementById("authPassword")).value);
    
     document.getElementById('authReport').textContent = "";



     let nameUsed = false;

     let i = 0;

     for(i = 0; i < this.userService.usedName.length; i++)
      {
        if(this.userService.usedName[i].name === name)
        {
          nameUsed = true;
        }
      }


      if(!nameUsed)
      {
        document.getElementById('authReport').textContent = "";
        document.getElementById('authReport').textContent = "Nom d'utilisateur incorrect.";  
      }

    if(name.length > 5 && password.length > 3 && nameUsed)
    {
     this.userService.logInUser({"name": name, "password": password});

     document.getElementById('logBtn').style.display = " none ";
     document.getElementById('logSpinner').style.display = "block";
     document.getElementById('logSpinner').style.opacity = "1";

     setTimeout(()=>{


      if(this.userService.isLogged)
      {
        document.getElementById('logSpinner').style.opacity = "0";
        document.getElementById('logSpinner').style.display = "none !important"
        document.getElementById('logBtn').style.display = "block";

        if(this.userService.userData.report === "Password not match.")
        {
          document.getElementById('authReport').textContent = "";
          document.getElementById('authReport').textContent = "Mot de passe incorrect.";  
        }


        if(this.userService.userData.name.length > 5)
        {
          console.log('Redirect to the app'); 
        }
      }


      if(this.count >= 6000 && !this.userService.isLogged && nameUsed)
      {
        document.getElementById('authReport').textContent = "";
        document.getElementById('authReport').textContent = " Désolé erreur réseau, veuillez réessayez plus tard.";

        document.getElementById('logSpinner').style.opacity = "0";
        document.getElementById('logSpinner').style.display = "none !important";
        document.getElementById('logBtn').style.display = "block";

        setTimeout(()=>{
          this.count = 1000;
        },2000)

      }

      if(this.count < 6000 && !this.userService.isLogged && nameUsed)
      {
        this.count = this.count + 500; 
        this.logUser();
        document.getElementById('authReport').textContent = "";
        document.getElementById('authReport').textContent = " Vérification en cours... ";
        
        console.log(this.count)
      }

     }, this.count)
    
    }

  }

}
