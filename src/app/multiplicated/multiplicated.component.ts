import { Component, OnInit } from '@angular/core';

import {UsersServicesService} from '../services/users.service';

@Component({
  selector: 'app-multiplicated',
  templateUrl: './multiplicated.component.html',
  styleUrls: ['./multiplicated.component.scss']
})

export class MultiplicatedComponent implements OnInit {

  operator : number;

  sum : number = 1;
  
  operation : string;

  countDown : number;

  isStarted : boolean = false;

  isCountActive : boolean = false;

  isResolved : boolean = false;

  interval : any;




  // Set a default value like one is useless but if we want to provide more mistake to the user that should be fine
  userLife : number = 1;


  currentScore : number = 0;

  postScore : string;

  chain : number = 1;

  

  constructor(private userService : UsersServicesService) {
    
    
    if(!this.userService.isRegistered && !this.userService.isLogged)
    {
      //window.location.href = "/";
    }
    
  }

  ngOnInit() {


    this.operator =  Math.floor(Math.random() * 7);
    this.operator = this.operator + 2;
    
    
  }


  getOperation()
  {    
    
    this.isResolved = false;
    this.operation = String(this.sum + " x " + this.operator + " = ? ");
    document.getElementById('start').style.display = "none";
    document.getElementById('resetBtn').style.display = " block";
    document.getElementById('countDown').style.display = " block";


    if(this.chain >= 3)
    {
      this.getCountdown(8);
    }

    if(this.chain >= 7)
    {
      this.getCountdown(15);
    }
    

  }



  getCountdown(countValue:number)
  {
    
    
    
    this.countDown = countValue;

    if(!this.isCountActive)
    {
        this.interval = setInterval(()=>{

     

        if(this.countDown > 0)
        {
          this.countDown = this.countDown - 1;
          document.getElementById('countDown').textContent = String(this.countDown);
          
        }

    
      },1000)

      this.isCountActive = true;
    }

    if(this.countDown < 0)
    {
      clearInterval(this.interval)
      this.countDown = countValue;
      this.isCountActive = false;
      

    }


  }

 



  onKeydown(event) {
    if (event.key === "Enter") {
      
      this.isStarted =true;

      if(this.isStarted && this.userLife > 0)
      {


        let value = Number((<HTMLInputElement>document.getElementById("response")).value);
      
        let report = document.getElementById('report');
  
        if(this.sum * this.operator === value)
        {
  
           this.isResolved = true;
           report.textContent = "";
           report.textContent = " Correct ! ";
           report.style.color = " springgreen";
  
  
           // This condition ensure user get score point only if he resolve more than 3 operation and less than 7
           if(this.chain >= 3 && this.chain < 7)
           {
            
  
  
            if(this.countDown > 0)
            {
              this.currentScore = this.currentScore + 100;
  
              let currentTxt = document.getElementById('report').textContent;
               
              document.getElementById('report').textContent = currentTxt + " With bonus score for timer !"
              
            }
            
            this.currentScore = this.currentScore + 50;
           }
  
           // If user has big chain of operation resolved so the score point we give should be more important
           if(this.chain >= 7)
           {
            
            if(this.countDown > 0)
            {
              this.currentScore = this.currentScore + 100;
  
              let currentTxt = document.getElementById('report').textContent;
               
              document.getElementById('report').textContent = currentTxt + " With bonus score for timer !"
            }
            
            this.currentScore = this.currentScore + 100;
           }
           
           
           this.chain = this.chain + 1;
  
           this.sum = Number(value);
  
  
           let erase = (<HTMLInputElement>document.getElementById("response")).value = "";
  
  
  
  
           // Restart a new operation
           this.getOperation();
           
           
           
        }
  
  
        
        else
        {
          report.textContent = "";
          report.textContent = " Nope ! ";
          report.style.color = "red";
          this.userLife = this.userLife - 1;
          
  
          if(this.userLife === 0 )
          {
            this.countDown = 0;
            clearInterval(this.interval);
           
  
            if(this.currentScore < 100)
            {
              this.operation = " Really ?! you scored " + String(this.currentScore);
            }
  
            if(this.currentScore >= 100 && this.currentScore < 300)
            {
              this.operation = " Well, you try... you scored " + String(this.currentScore);
            }
  
            if(this.currentScore >= 300 && this.currentScore < 400)
            {
              this.operation = " Not bad, you scored " + String(this.currentScore);
            }
  
            if(this.currentScore >= 400)
            {
              this.operation = "Okay, I'm impress. you scored " + String(this.currentScore);
            }
            

            if(this.currentScore > 0)
            {

            this.postScore = String(this.currentScore);

            let mathCast = Number(this.userService.userData[0].mathScore + this.postScore);

            let mathSend = String(mathCast); 

            console.log("Make request for :: " + this.postScore );
            console.log("Make request for :: " + mathSend );

            this.userService.updateFields({"score": this.postScore, "name" : this.userService.userData[0].name, "mathScore" : mathSend }); 

            }


            document.getElementById('countDown').textContent = "Terminé";
          }
  
        }
  


      }

     
    }
  }


  // Reset the game -- DONE

  getReset(){

    let erase = (<HTMLInputElement>document.getElementById("response")).value = "";
    document.getElementById('report').textContent = "";
    document.getElementById('countDown').textContent = " ";
    
    this.operator =  Math.floor(Math.random() * 7);
    this.operator = this.operator + 2;
    this.sum = 1;
    this.chain = 1;

    this.currentScore = 0;
    this.userLife = 1;

    this.isCountActive = false;
    
    this.getOperation();



  }




}
