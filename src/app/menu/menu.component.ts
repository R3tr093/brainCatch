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

  userScore : string;
  userName : string = "Anonyme";
  userData : any;



  constructor(private userService : UsersServicesService, private router : Router) { }

  ngOnInit() {
 
    if(!this.userService.isRegistered && !this.userService.isLogged)
    {
     // window.location.href = "/";
     
      
    }

   

    else
    {
      this.userName = this.userService.userData[0].name;

     
      this.userService.userName = this.userName;
      
      this.userScore = String(this.userService.userData[0].score);

      this.userData = this.userService.userData;

      if(!this.userService.userWelcome)
      {
        this.showModal("Bonjour " + this.userName + " merci d'utiliser brainCatch.",5000);
        this.userService.userWelcome = true;
      }
     
    }
    this.refreshData();
    this.randomStyle();
    

    
  }


  // Show and hide the modal with as parameter the timer and the text

  showModal(text:string,timer:number) {
    
    var elem = document.getElementById("modal");

    var elemTxt = document.getElementById('modalTxt');

    elemTxt.innerHTML = "";

    elemTxt.innerHTML = text;

    var pos = 115;

    var id = setInterval(frame, 35);

    function frame() {
      if (pos == 83) {
        clearInterval(id);

        setTimeout(()=> {

          var elem = (<HTMLElement>document.getElementById("modal"));
          
          
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

  // Display userboard 

  displayTips(text:string){

    document.getElementById('board').style.display = "none";


    document.getElementById('tips').classList.remove('slideOutDown');
    document.getElementById('tips').classList.add('slideInRight');

    document.getElementById('tips').style.display = "block";
    document.getElementById('tips').textContent = text;

  }

  hideTips()
  {
    document.getElementById('tips').classList.remove('slideInRight');
    document.getElementById('tips').classList.add('slideOutDown');
    document.getElementById('tips').textContent = " ";

    document.getElementById('board').style.display = "block";
    
  
  }

  randomStyle(){

    let elements = document.getElementsByClassName('gamesLinks');
        
    let colors = ["cornflowerblue","goldenrod","hotpink","#d1ba79","#e33930"];

    let i = 0;

    for(i = 0; i < elements.length; i++)
    {
      let random = Math.floor(Math.random() * elements.length);
      
      let target = document.getElementById('g' + String(i + 1));

      target.style.backgroundColor = colors[random];
    }

  }


  refreshData(){

    this.userService.getUser(this.userService.userName);

    let tryRefresh = setInterval(()=>{

      if(this.userService.isDone)
      {
        this.userService.isDone = false;
        document.getElementById('globalScore').textContent = "Score global : " +  this.userService.userData[0].score;
        this.showScore();
        clearInterval(tryRefresh);
      }

    },3000)

  }

  showScore(){
   
    this.showModal('Votre score global : <b> ' + String(this.userService.userData[0].score) + ' </b> <br> Math :<b> ' + this.userService.userData[0].mathScore + ' </b> <br> Logique : <b> ' + this.userService.userData[0].logic + ' </b> <br> Mémoire : <b>' + this.userService.userData[0].memory + '</b> ',5000);
  }
}
