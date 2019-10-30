import { Component, OnInit } from '@angular/core';
import { UsersServicesService } from '../services/users.service';
import { WordsService } from '../services/words.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})
export class MemoryComponent implements OnInit {

  words:any;

  serie : any = [];
  serieCursor : number = 0;
  serieWorking : boolean = false;

  responseCursor : number = 0;

  word : string = "";
  

  response : string = "";
  
  chain : number = 1;
  score : number = 0;
  
  countdown : number;


  constructor(private userService : UsersServicesService, private wordService : WordsService ) {


    if(!this.userService.isRegistered && !this.userService.isRegistered)
    {
      //window.location.href = "/";
    }

    this.words = this.wordService.words;
    

  }

  ngOnInit() {

    this.initSerie();

  }

  // Initialize a new serie with 2 words by default
  initSerie(){

    let i = 0;

    this.serie = [];

    while(i < 2)
    {
      let random = Math.floor(Math.random() * this.words.length);
      random = this.words[random];
      this.serie.push(random)
  
      i++;
    }  

  }

  // Increment the words in the serie
  incSerie(){
    
    let random = Math.floor(Math.random() * this.words.length);
    this.serie.push(this.words[random]);
    
  }

  // Show the serie to the user
  displaySerie(){

    console.log(this.serie)

    document.getElementById('report').textContent = "";

    this.serieWorking = true;

    let target = document.getElementById("key");

    target.textContent = this.serie[this.serieCursor];

    this.serieCursor++;

    if(this.serieCursor <= this.serie.length)
    {
      setTimeout(()=>{
        this.displaySerie();
      },2000) 
    }

    if(this.serieCursor > this.serie.length)
    {
      this.serieWorking = false;
    }
  }


  // Carrying the user response.
  onKeydown(event) {

    console.log(this.serie)

    if (event.key === "Enter" && !this.serieWorking) {
      
      let userResponse = (<HTMLInputElement>document.getElementById('userResponse'));

      if(this.responseCursor < this.serie.length)
      {
        
        let a = userResponse.value.toLocaleUpperCase();
        let b = this.serie[this.responseCursor].toLocaleUpperCase();


          if(this.responseCursor < this.serie.length && a === b )
          {
            document.getElementById('report').innerHTML = "Correct";
            this.responseCursor++;
            
          }
  
          if(this.responseCursor === this.serie.length)
          {
            
            this.responseCursor = 0;
            this.serieCursor = 0;
            
            if(this.chain >= 3)
            {
              
              this.score = this.score + 50;
            
            }


            this.chain++;

            this.incSerie();
            this.displaySerie();
           
            
          }

          if( a !== b)
          {
            document.getElementById('report').innerHTML = "Perdu";

            if(this.score > 0  && this.score < 150)
            {
              document.getElementById('report').innerHTML = "Perdu <br> <em> <span id='result'> Vous avez gagnez  " + String(this.score) + " points c'est pas si mal. </span></em>" ;
            }

            if(this.score > 150  && this.score < 300)
            {
              document.getElementById('report').innerHTML = "Perdu <br> <em> <span id='result'> Vous avez gagnez  " + String(this.score) + " points, mais ont pourrait faire mieux. </span></em>" ;
            }

            if(this.score > 300 )
            {
              document.getElementById('report').innerHTML = "Perdu <br> <em> <span id='result'> Vous avez gagnez  " + String(this.score) + " points là on se comprend ! </span></em>" ;
            }

            document.getElementById('start').textContent = "Reset";

            this.serieCursor = 0;
            this.serieWorking = false;
          
            this.responseCursor = 0;
          
            this.word = "";

            this.chain = 1;
            this.score =  0;

            this.initSerie();
          
          }
          
          userResponse.value = "";
      
        }
  
       
      





    }
  }

}
