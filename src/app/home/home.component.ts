import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { UsersServicesService } from '../services/users.service';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  formOnScreen : boolean = false;
  aboutOnScreen : boolean = false;
  count : number = 1000;
  userData : any;
 
  


  constructor(private userService : UsersServicesService, private router : Router) {
   
  }

  ngOnInit() {
      this.userService.getUsers();
  }

 // These three functions display the Authentication, logIn form, or the about element by click on a button.
 
  displayAbout(){
    let elt = document.getElementById('aboutElt');

    if(!this.aboutOnScreen)
    {
      elt.classList.remove('slideOutDown')      
      elt.classList.add('slideInDown');
      elt.style.display = "block";

      this.aboutOnScreen = true;
    }

    else
    {
      elt.classList.remove('slideInDown');
      elt.classList.add('slideOutDown');
      this.aboutOnScreen = false;
    }

    

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


  resolveAbout(){
    
    let target = ((<HTMLSelectElement>document.getElementById("questions")).value);


    if(target === "Pourquoi brainCatch ?")
    {
      document.getElementById("response").textContent = " Reponse à la question pourquoi."
    }

  }


  // Max delay of 12 sec before aborting the post or login request.

  // These two functions belows (log and post ) use the same principles.

  postUser(){

    // Get the user credentials value
    
    let name = String((<HTMLInputElement>document.getElementById("name")).value);

    // remove whitespace from string.
    name = name.replace(/\s/g, "");

    let password = String((<HTMLInputElement>document.getElementById("password")).value);
    let password2 = String((<HTMLInputElement>document.getElementById("password2")).value);

    // Look if the user name is already used

    let nameUsed = false;

    let i = 0;

    for(i = 0; i < this.userService.usedName.length; i++)
      {
        if(this.userService.usedName[i].name === name)
         {
           nameUsed = true;
         }
      }

    // The user name provided is already used
    if(nameUsed)
    {
      document.getElementById('postReport').textContent = "";
      document.getElementById('postReport').innerHTML = "Erreur : Le pseudo  " + name + " est déjà pris ! ";
    }

    // Look if the password match properly.

    if(password2 !== password)
    {
      document.getElementById('postReport').textContent = "";
      document.getElementById('postReport').innerHTML = "Erreur :  Vos mots de passe ne sont pas identiques ! "
    }

    // Ensure credentials value is more than 5 characters
    if(name.length <= 5)
    {
      document.getElementById('postReport').textContent = "";
      document.getElementById('postReport').textContent = "Erreur : Votre nom d'utilisateur doit faire plus de 5 caractères.";
    }


    if(password.length <= 5)
    {
      document.getElementById('postReport').textContent = "";
      document.getElementById('postReport').textContent = "Erreur : Votre mot de passe doit faire plus de 5 caractères.";
    }

    // If all conditions are properly submit try to post in database new credentials
    if(password2 === password && password.length > 5   && name.length > 5 && !nameUsed && !this.userService.isRegistered)
    {
      
      document.getElementById('postBtn').style.display = " none ";
      document.getElementById('postSpinner').style.display = "block";

      this.userService.postUser({"name": name, "password": password}); 

      let report = "";
      
      //Display spinner and wait for the request return
      
      setTimeout(() => { 
  
        if(!this.userService.isRegistered)
        {
         
          // Wait for a return from the request 

          if(this.count < 6000 && !this.userService.isRegistered )
          {
            this.postUser();
            this.count = this.count + 500;
            report = " En attente ..."
            document.getElementById('postSpinner').style.opacity = "1";
            document.getElementById('postReport').textContent = report;
          }
          
          // if we wait so much, return a network error.
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

        // If the request is successfully completed we redirect.
        if(this.userService.isRegistered)
        {
          this.router.navigate(['/Menu']);
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

        else
        {
          if(this.userService.userData[0].name.length > 5)
          {
            this.router.navigate(['/Menu']);
          }
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
        
        
      }

     }, this.count)
    
    }

  }

}
