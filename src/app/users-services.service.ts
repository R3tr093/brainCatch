import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersServicesService {

  constructor(private http: HttpClient) { }
  
  getUser(){
    return this.http.get('https://braincatch.herokuapp.com/api/users').subscribe(
        value => {
          console.log(value)
        },
        error => {
          console.log(error)
        },
        () => {
        }
      );
  }

  postUser(name, mail){
    return this.http.post('https://braincatch.herokuapp.com/api/users', val).subscribe(
        value => {
          console.log(value)
        },
        error => {
          console.log(error)
        },
        () => {
        }
      );
  }
}

