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
  usedName : any;
  isRegistered : boolean = false;



  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get('https://braincatch.herokuapp.com/api/users/').subscribe(
        value => {
          console.log(value)
          this.usedName = value;

        },
        error => {
          console.log(error)
        },
        () => {
        }
      );
  }
  
  getUser(param){
    return this.http.get('https://braincatch.herokuapp.com/api/users/' + param).subscribe(
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
          this.isRegistered = true;
          this.userData = value;
        },
        error => {
          console.log(error)
          this.isRegistered = false;
        },
        () => {
        }
      );
  }

  logInUser(data){
    return this.http.post('https://braincatch.herokuapp.com/api/users/logIn', data, httpOptions).subscribe(
        value => {
          this.isRegistered = true;
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
}

