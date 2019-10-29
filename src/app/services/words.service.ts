import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  words : any;

  constructor() {
    this.words = ["Sel","Conflit","Moniteur","Japon","Piscine","Logs","Tranche","Agneau","Grotte","Mercenaire","Albinos","Commentaire","Apache","Herbe","Profession","Historien","Chercheur","Raser","Europe","Spectacle"]
  }

  

}
