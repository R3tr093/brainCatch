import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class UsersServicesService {

  


  constructor(private http: HttpClient) { }

  
  
  getUser(param){
    return this.http.get('https://braincatch.herokuapp.com/api/users/' + param).subscribe(
        value => {
          console.log(value)
          let test = value;
          console.log(test[0].hash)
        },
        error => {
          console.log(error)
        },
        () => {
        }
      );
  }

  postUser(name){
    return this.http.post('https://braincatch.herokuapp.com/api/users', name, httpOptions).subscribe(
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

