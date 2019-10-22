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

  userData : any;


  constructor(private http: HttpClient) { }

  
  
  getUser(param, password){
    return this.http.get('https://braincatch.herokuapp.com/api/users/' + param + '/' + password).subscribe(
        value => {
          console.log(value)
          this.userData = value;

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

